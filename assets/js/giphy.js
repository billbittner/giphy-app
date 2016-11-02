	// Initial array of giphy categories
	var topics = ["Arrested Development", "The Office", "Stranger Things", "The Simpsons"];

	// function to renders the giphys when a topic button is pressed 
	function displayGiphys(){
		//clear all the giphs already displayed
		$("#giphyView").empty();
		//decide how many results to display
		var numberOfResults = 10;
		//get the components of the queryURL
		var giphyTopic = $(this).attr("data-name");  
		var giphyTopicCondensed = giphyTopic.split(" ").join("+"); //combine multiple words into "example+example"
		var apiKey = "&api_key=dc6zaTOxFJmzC"
		//compile the query components into a queryRUL
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphyTopicCondensed + apiKey;
		
		// Creates AJAX call for the specific giphy being requested
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
			//store the results array
			var results = response.data;
			//display the results, up to the number of results defined above
			for (var i = 0; i < numberOfResults; i++){
				//create a div to hold giphy and rating
				var newDiv = $("<div>");
				newDiv.addClass("gif-wrapper");
				$("#giphyView").append(newDiv);
				//add the giphy to the new div
				var newGiphy = $("<img>");
				newGiphy.addClass("gif");
				newGiphy.attr("data-state", "still");
				newGiphy.attr("data-animateURL", results[i].images.fixed_height_small.url);
				newGiphy.attr("data-stillURL", results[i].images.fixed_height_small_still.url);
				newGiphy.attr("src", newGiphy.attr("data-stillURL"));
				newGiphy.attr("alt", giphyTopic);
				newDiv.append(newGiphy);
				//add the rating after the giphy
				var newRating = $("<p>");
				newRating.text("Rating: " + results[i].rating);
				newGiphy.after(newRating);
			};
		});
	}

	// function for displaying giphys data 
	function renderTopicButtons(){ 
		// clear out all the previous topic buttons before re-displaying the topic array
		$("#buttonsView").empty();
		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++){
			// generate a button for each topic in the array
		    var topicButton = $("<button>") 
			//add a class to the button
		    topicButton.addClass("topic-btn");
			// Added a data-attribute
		    topicButton.attr("data-name", topics[i]); 
			// add button text
		    topicButton.text(topics[i]); 
			// Added the button to the HTML
		    $("#buttonsView").append(topicButton); 
		};
	}

	//function to check if the topic already has a button
	function topicExists(topicToTest, topicsArray){
		//create a result boolean and set to false because we presume no duplicate will be found
		var result = false;
		//loop through the current topics array, and return true if a duplicate is found
		for (var i = 0; i < topicsArray.length; i++){
			if (topicToTest.toLowerCase() === topicsArray[i].toLowerCase()){  //do the comparison with both values being lowercase
				result = true;
				return result;
			};
		};
		//if no duplicate is found, return the result of false
		return result;
	}

	// add a new topic button when clicked 
	$("#topic-form-btn").on('click', function(){
		// grab the input from the textbox and trim it
		var newTopic = $('#topic-form-input').val().trim();
		//as long as there is something in the input box, and it's not already a button, create the button
		if ((newTopic !== "") && (topicExists(newTopic, topics) === false)){
			// add the new topic to the topic array
			topics.push(newTopic);
			// render the topic buttons based on the updated array
			renderTopicButtons();
		};
		// We have this line so that users can hit "enter" instead of clicking on the button, it won't move to the next page
		return false;
	})

	//display the giphys
	$(document).on('click', '.topic-btn', displayGiphys);

	$(document).on('click', '.gif', function(){
			//store the current state in a variable 'state'
            var state = $(this).attr("data-state");
			//switch the state and corresponding image
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animateURL"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-stillURL"));
                $(this).attr("data-state", "still");
            };
        });

	// render the topic buttons 
	renderTopicButtons();

