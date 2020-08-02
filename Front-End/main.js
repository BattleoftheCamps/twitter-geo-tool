var name = "";

function initialize() {
// set up google map api
  var input = document.getElementById('searchbar');
  var autocomplete = new google.maps.places.Autocomplete(input);
//   only return geographic info to reduce api load since we only need latitude and longitude
  autocomplete.setFields(['geometry', 'name']);
//   when user selects a location from the drop down, get the place information
  google.maps.event.addListener(autocomplete, 'place_changed', async function () {
    // hide error message
    document.getElementById("error").innerText = "";
    // hide old results
    document.getElementById("all-tweets-div").innerHTML = "";
    var place = autocomplete.getPlace();
    name = place.name;
    document.getElementById("topic-title").innerText = "Latest tweets in and around " + name + ":";
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    // create a JSON with the selected location's info
    var placeJSON = {
        "latitude" : latitude,
        "longitude" : longitude
    }
    // here we will pass placeJSON to the backend and set the latitude and longitude variables
    const response = await fetch("https://twitter-hackathon.herokuapp.com/location/coordinates", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(placeJSON)
    });
    console.log(response.status);
    if(response.ok){
      const displayResponse = await fetch("https://twitter-hackathon.herokuapp.com/topic?topic=latest");
      if(displayResponse.ok){
        var tweets = await displayResponse.json();
        console.log(tweets);
        displayTweets(tweets);
      }
    }

  });
}
google.maps.event.addDomListener(window, 'load', initialize);

async function getTweets(topic) {
  console.log(topic);
  if(name !== ""){
    const response = await fetch("https://twitter-hackathon.herokuapp.com/topic?topic=" + topic);
      // go to console to see response contents, just need to display these and we're done!!
      if(response.ok){
        document.getElementById("all-tweets-div").innerHTML = "";
        document.getElementById("error").innerText = "";
        if(topic === "latest"){
          document.getElementById("topic-title").innerText = "Latest tweets in and around " + name + ":";

        } else{
          document.getElementById("topic-title").innerText = "Tweets in and around " + name + " about " + topic + ":";

        }
        var tweets = await response.json();
        console.log(tweets);
        displayTweets(tweets);
      }
      else if(response.status===400){
        // show error message
        document.getElementById("error").innerText = "No location specified. Enter a location in the search bar to use this feature.";
      }
      else {
        document.getElementById("error").innerText = "An error occured. Please try again.";
      }
  } else{
        document.getElementById("error").innerText = "No location specified. Enter a location in the search bar to use this feature.";

  }

}

function displayTweets(tweets) {

  tweets.forEach(function(tweet) {
    let tweetInfo = document.createElement('div');
    tweetInfo.className = "tweetInfo";
    tweetInfo.id = tweet["tweetInfo"];

    let tweetUsername = document.createElement('span');
	  tweetUsername.className = "tweetUsername";
	  tweetUsername.innerHTML = tweet[0];

	  let tweetLocation = document.createElement('span');
	  tweetLocation.className = "tweetLocation";
    tweetLocation.innerHTML = " | " + tweet[1];

    let tweetContent = document.createElement('div');
	  tweetContent.className = "tweetContent";
	  tweetContent.innerHTML = tweet[2];

    tweetInfo.append(tweetUsername, tweetLocation, tweetContent);
    document.getElementById("all-tweets-div").append(tweetInfo);
  });
}
