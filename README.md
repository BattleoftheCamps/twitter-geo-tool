# twitter-geo-tool
Understand trending topics in a specific geographic location. 

## See the site live!
https://battleofthecamps.github.io/twitter-geo-tool/

## Demo Video
https://youtu.be/9fJlmTzbv7A

## Backend (where the TwitterAPI is used)
https://github.com/BattleoftheCamps/twitter-geo-tool-backend

## Resources Used
https://www.earthdatascience.org/courses/use-data-open-source-python/intro-to-apis/twitter-data-in-python/
https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
http://docs.tweepy.org/en/latest/index.html
https://towardsdatascience.com/geocode-with-python-161ec1e62b89

# More Information: 
Or, https://devpost.com/software/asd-3ys54f. 

# Inspiration
Our goal was to create a product which is utilizable by Twitter in real life. Recently, one of our team members attended Twitter’s Q2, 2020 earnings call on July 23rd (https://twitter.com/TwitterIR/status/1286258421147160576?s=20) in which Ned Segal (CFO) and Jack Dorsey (CEO) mentioned their interest in looking into alternative streams of revenue for the platform. Jack also mentioned looking into a subscription service model in order to sustain revenue for longer time periods rather than a quick advertising campaign fee. We were inspired by Twitter’s revenue strategy to create a product that would help the company experiment with new paths for creating revenue while keeping the platform completely free-of-cost its users.

Our vision is for Twitter GeoTool to be offered as a new product for advertisers or simply anyone who is looking for rich insights into specific locations regarding specific buckets of topics. The tool will be offered in a subscription-based model to advertisers and others as opinions and #trends are constantly changing which requires longevity in use. We included the incorporation of Jack & Ned’s vision for a subscription-based model in order to create a new, sustainable method of revenue for Twitter which does not compromise Twitter’s Trust & Safety mission, yet still provides powerful information insights into public opinions aggregated on the Twitter platform

# What it does (in detail)
We have created the Twitter GeoTool. This tool cross-references between buckets such as politics, pop culture, technology, etc. with any given location to provide real-time insight into the live stream of opinions of those currently living in that region. For example, you can cross-reference between San Francisco, CA, and technology to hear the latest tech buzz directly from the heart of Silicon Valley. Or, you can do some recon about a smaller town in the countryside to learn more about consumer demand for local restaurants, opinions on politics, etc.

Our goal with Twitter GeoTool is to create a time-sensitive and scalable tool that can provide insight about any given location by utilizing the great number of public opinions aggregated on the Twitter platform. There are a few key use cases we have curated towards.

Political Campaigns. Twitter recently banned political campaign advertisements from its platform, and yet campaign strategy makers are still active on the platform to engage directly with their potential voters to understand the political demand and cater their candidate accordingly. Twitter GeoTool can be utilized by campaign strategists to better understand and map locations throughout the country and world which are better suited to invest campaign funding, schedule town halls, etc. Such users can simply search a location and select the politics tab to fetch the latest political opinions in the region selection.

Business Looking to Expand. At the moment, if a small, medium or larger-tier business is considering expanding their operations into a new locale, they will generally only opt for locations that they are personally familiar with as they “know the area” and are familiar with the resident’s existing demographics or demand. With Twitter GeoTool, now any business looking to expand and open up new locations can gather the area's public opinion by simply utilizing our tool. For example, a Mexican restaurant looking to expand into San Ramon, CA can select the given location and select our Food tab to learn more about what types of cuisines people are speaking out or currently craving and make strategic decisions with this powerful information.

We are confident there are multiple more use cases for such a dynamic tool, but these are the two we have focused on at the moment. Further cases may include, Venture Capitalists understanding a geographic demographic before making an investment, etc.

# How we built it
Twitter GeoTool has a front-end, back-end, and a middle-end.

Front-End: Our front-end consists of HTML, CSS, and JavaScript. We aimed for our tool to be easily accessible and understandable by people of all backgrounds and technical experience. And such, we have created a minimalistic and user-centric design. We utilized HTML to build the foundation of our site, added some CSS to give it a Twitter makeover, and then implemented JavaScript to render the individual tweet components. We also used the Google Maps API in order to create a search bar which gathered an accurate location by autocompleting user input, guaranteeing accuracy when translating to longitude and latitude using the Google Places API. Our JavaScript also makes the AJAX requests to our backend, making a POST request to /location/coordinates, passing the location’s latitude and longitude when the user selects a location and making a GET request to /topic, passing the selected topic, when the user clicks on a topic button.

Middle: We created a REST API using Python and Flask and deployed the API to Heroku. We implemented two endpoints: POST /location/coordinates with a request body of the form { "latitude" : [num], "longitude" : [num]} and GET /topic with a query parameter of any of the following: "politics", "food", "pop culture", "technology", or "latest".

The POST endpoint concatenates the latitude and longitude along with some other location-based information and stores the result in a string called location_selected. This endpoint is hit when the user selects a location from the autocomplete suggestions in our UI, and the frontend sends the latitude and longitude of the selected location with a POST request. This endpoint returns a 200 status code if this operation is successfully completed. If the user tries to use a different REST method to hit this endpoint, we return a 501 NOT IMPLEMENTED error.

The GET request maps possible query parameters to their corresponding backend functions and calls the function associated with the query parameter, passing the location_selected string in order to get tweets about the specified topic in the specified location. This endpoint is hit when the user clicks on one of our blue topic buttons in the UI, which causes the frontend to send a text representation of the clicked button as a query parameter. For example, if the parameter ‘politics’ is passed in, the GET endpoint calls the get_politics method in tools.py, passing the location_selected string which was set when the user selected a location in the UI. For simplicity, lets say the user searched for “New York”. The get_politics method then returns a list/dict of all tweets in and around New York about politics. One potential issue which could arise is if the user clicks a category button in the UI without first searching for a location. To address this, we included a check to see if the location_selected string is empty, and if so we return a 400 error code (bad input) with the error message “NO LOCATION SELECTED”. This prevents unnecessary calls to the Twitter API for cases where no location has been specified. If the user tries to use a different REST method to hit this endpoint, we return a 501 NOT IMPLEMENTED error.

Back-End: In our back-end we heavily utilized Python to create functions for each bucket such as politics, technology, food, along with the Twitter Developer API Standard Search. We defined a query with key words relating to the bucket, defined a start date for the timeline to be fetched, and accessed tweets based on translated longitude and latitude coordinates. With the Twitter Developer API’s Standard Search we were able to configure the above inputs into returning an array of tweets with the following users_attributes = [tweet.user.screen_name, tweet.user.location, tweet.text]. We then sent this gathered content back to the front-end to be displayed to the user using our REST API.

We also deployed our site to GitHub pages! https://battleofthecamps.github.io/twitter-geo-tool/

# What's next for Twitter GeoTool
Up next for Twitter GeoTool, we would love to increase the number of buckets available and scale beyond our current use cases. One feature we would love to implement going forward is the option for users to specify their own topic of choice, instead of choosing from the existing options. We would also love to integrate the tweet results with their t.co URLs so users can click on a result and be taken directly to that tweet. This would be an awesome feature to directly integrate into the existing twitter.com website so users can search for trending topics in their desired location directly within the official site or app.

# Built With
css flask flask-cors github google-map sgoogle-places heroku html javascript python twitter
