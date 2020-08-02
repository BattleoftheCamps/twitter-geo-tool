function initialize() {
// set up google map api
  var input = document.getElementById('searchbar');
  var autocomplete = new google.maps.places.Autocomplete(input);
//   only return geographic info to reduce api load since we only need latitude and longitude
  autocomplete.setFields(['geometry']);
//   when user selects a location from the drop down, get the place information
  google.maps.event.addListener(autocomplete, 'place_changed', async function () {
    var place = autocomplete.getPlace();
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
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

async function getTweets(topic) {
  console.log(topic);
  const response = await fetch("https://twitter-hackathon.herokuapp.com/topic?topic=" + topic);
  // go to console to see response contents, just need to display these and we're done!!
  console.log(await response.json());
}

function readytosend() {
  var tweetList = document.querySelector('#list')
  var result = ['Apple', 'Orange', 'Banana', 'Melon']

  resultsArray.forEach(function(result) {
    let tweetInfo = document.createElement('div');
    tweetInfo.className = "searchResult";
    tweetInfo.id = result["1. tweet"];

    tweetInfo.onclick = function(){
      viewDetails(this);
    };

    let tweetUsername = document.createElement('span');
	  tweetUsername.className = "tweetUsername";
	  tweetUsername.innerHTML = result["1. username"];

	  let tweetLocation = document.createElement('span');
	  tweetLocation.className = "tweetLocation";
    tweetLocation.innerHTML = result["2. location"];

    let tweetContent = document.createElement('span');
	  tweetContent.className = "tweetContent";
	  tweetContent.innerHTML = result["3. tweet-content"];

    tweetInfo.append(tweetUsername, tweetLocation, tweetContent);
    $("#searchResults").append(tweetInfo);
  });
}
