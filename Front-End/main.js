function initialize() {
// set up google map api
  var input = document.getElementById('searchbar');
  var autocomplete = new google.maps.places.Autocomplete(input);
//   only return geographic info to reduce api load since we only need latitude and longitude
  autocomplete.setFields(['geometry']);
//   when user selects a location from the drop down, get the place information
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    // create a JSON with the selected location's info
    var placeJSON = {
        'latitude' : latitude,
        'longitude' : longitude
    }
    // here we will pass placeJSON to the backend
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

function readytosend() {
  resultsArray.forEach(function(result){
	    			
  let resultDiv = document.createElement('div');
  resultDiv.className = "searchResult";
  
/* set div id to stock ticker symbol for use later in api call in viewDetails() */    			
resultDiv.id = result["1. symbol"];
/* set onclick function to fetch stock details and redirect to details page */
  resultDiv.onclick = function(){
    viewDetails(this);
  };
    
    let tickerSymbol = document.createElement('span');
    tickerSymbol.className = "tickerSymbol";
    tickerSymbol.innerHTML = result["1. symbol"];
    
    let stockName = document.createElement('span');
    stockName.className = "stockName";
    stockName.innerHTML = result["2. name"];
    
    resultDiv.append(tickerSymbol, stockName);
    
    $("#searchResults").append(resultDiv);
  });
}