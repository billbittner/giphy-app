	// initial array of giphy categories
	var topics = ["Die Hard", "Judge Dredd", "Matrix", "Jaws", "Terminator", "Face Off"];

	// function to render the giphys when a topic button is pressed 
	function displayGiphys(){
		//clear all the giphs already displayed
		$("#giphyView").empty();
		//get the components of the queryURL
		var giphyTopic = $(this).attr("data-name");  
		var giphyTopicCondensed = giphyTopic.split(" ").join("+"); //combine multiple words into "example+example"
		var numberOfResults = "&limit=" + 10;
		var apiKey = "&api_key=dc6zaTOxFJmzC"
		//compile the query components into a queryRUL
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphyTopicCondensed + numberOfResults + apiKey;
		
		// Creates AJAX call for the specific giphy being requested
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
			//store the results array
			var results = response.data;
			//display all the results that are returned
			for (var i = 0; i < response.data.length; i++){
				//create a div to hold giphy and rating
				var newDiv = $("<div>");
				newDiv.addClass("gif-wrapper");
				$("#giphyView").append(newDiv);
				//add the giphy to the new div
				var newGiphy = $("<img>");
				newGiphy.addClass("gif");
				newGiphy.attr("data-state", "still");
				newGiphy.attr("data-animateURL", results[i].images.fixed_height.url);
				newGiphy.attr("data-stillURL", results[i].images.fixed_height_still.url);
				newGiphy.attr("src", newGiphy.attr("data-stillURL"));
				newGiphy.attr("alt", giphyTopic);
				newDiv.append(newGiphy);
				//add the rating below the giphy
				var newRating = $("<p>");
				newRating.text("Rating: " + results[i].rating);
				newGiphy.after(newRating);
			};
		});
	}

	// function to create buttons based on the array of topics   
	function renderTopicButtons(){ 
		// clear out all the previous topic buttons before re-displaying the topic array
		$("#buttonsView").empty();
		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++){
			// generate a button for each topic in the array
		    var topicButton = $("<button>") 
			// add a class to the button
		    topicButton.addClass("topic-btn");
			// add a data-attribute
		    topicButton.attr("data-name", topics[i]); 
			// add button text
		    topicButton.text(topics[i]); 
			// append the button 
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
	$("#topic-form-btn").on("click", function(){
		// grab the input from the textbox and trim it
		var newTopic = $("#topic-form-input").val().trim();
		// as long as there is something in the input box, and it"s not already a button, create the button
		if ((newTopic !== "") && (topicExists(newTopic, topics) === false)){
			// add the new topic to the topic array
			topics.push(newTopic);
			// render the topic buttons based on the updated array
			renderTopicButtons();
		};
		return false;
	})

	// display the giphys
	$(document).on("click", ".topic-btn", displayGiphys);

	// put the click function on all gifs to play/pause
	$(document).on("click", ".gif", function(){
			//store the current state in a variable
            var state = $(this).attr("data-state");
			//switch the state and corresponding image
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animateURL"));
                $(this).attr("data-state", "animate");
				//add a class for css purposes
				$(this).addClass("playing-gif");
            } else {
                $(this).attr("src", $(this).attr("data-stillURL"));
                $(this).attr("data-state", "still");
				//remove class for css purposes
				$(this).removeClass("playing-gif");
            };
        });

	// render the topic buttons 
	renderTopicButtons();

