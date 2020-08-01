# Import Packages
import tweepy

# Create Credential Keys for Map API
from geopy import Nominatim

consumer_key = 'V6XKhulVp7YYY3jVJAE5yZHcR'
consumer_secret = 'k6ydihnwe2Oue1ITswLVTSHrD5YpLQyNIQlWrxlLnvBYwjRFuL'
access_token = '2620473211-yUybtaw3CDNd9vyHh9qSvgOul1pkiOuB0wpVEts'
access_token_secret = 'srxKoqEdF0SJbBnB8K2mgcz1m7AOJLUVHofIB5yyycXAZ'

# Set Up Configuration
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# Assign Address
addressINPUT = 'San Francisco'

# Translate Address to Longitude and Latitude Coordinates
locator = Nominatim(user_agent='myGeocoder')
location = locator.geocode(addressINPUT)
longitudeINPUT = location.longitude
latitudeINPUT = location.latitude
print('Latitude = {}, Longitude = {}'.format(location.latitude, location.longitude))


# Fetching Government & Politics Trends
def get_politics(latitudeINPUT, longitudeINPUT):
    # Define the search term and the date_since date as variables
    query = "democrat+republicans -filter:retweets"  # removes retweets
    location_selected = (latitudeINPUT, longitudeINPUT, '45mi')  # latitude,longitude,radius
    date_since = '2020/01/01'

    # Collect tweets
    tweets = tweepy.Cursor(api.search,
                           q=query,
                           since=date_since,
                           geocode=location_selected,
                           lang="en",
                           ).items(5)

    # Print tweets and attached attributes
    for tweet in tweets:
        users_attributes = [tweet.user.screen_name, tweet.user.location, tweet.text]
        print(users_attributes)


# Fetching Food Trends
def get_food():
    # Define the search term and the date_since date as variables
    query = "food -filter:retweets"  # removes retweets
    location_selected = latitudeINPUT, longitudeINPUT, '45mi'
    date_since = '2020/07/01'

    # Collect tweets
    tweets = tweepy.Cursor(api.search,
                           q=query,
                           date_since=date_since,
                           geocode=location_selected,
                           lang="en",
                           ).items(5)

    # Print tweets and attached attributes
    for tweet in tweets:
        users_attributes = [tweet.user.screen_name, tweet.user.location, tweet.text]
        print(users_attributes)


# Fetching Pop Culture Trends
def get_pop_culture():
    # Define the search term and the date_since date as variables
    query = "tiktok+youtube -filter:retweets"  # removes retweets
    location_selected = latitudeINPUT, longitudeINPUT, '45mi'
    date_since = '2020/07/01'

    # Collect tweets
    tweets = tweepy.Cursor(api.search,
                           q=query,
                           date_since=date_since,
                           geocode=location_selected,
                           lang="en",
                           ).items(5)

    # Print tweets and attached attributes
    for tweet in tweets:
        users_attributes = [tweet.user.screen_name, tweet.user.location, tweet.text]
        print(users_attributes)


get_politics(37.7790262, -122.4199061)
get_food()
get_pop_culture()
