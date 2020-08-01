#Import Packages
import tweepy

#Create Crediential Keys
consumer_key = 'V6XKhulVp7YYY3jVJAE5yZHcR'
consumer_secret = 'k6ydihnwe2Oue1ITswLVTSHrD5YpLQyNIQlWrxlLnvBYwjRFuL'
access_token = '2620473211-yUybtaw3CDNd9vyHh9qSvgOul1pkiOuB0wpVEts'
access_token_secret = 'srxKoqEdF0SJbBnB8K2mgcz1m7AOJLUVHofIB5yyycXAZ'

#Set Up Configuration
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)



def get_politics():
    # Define the search term and the date_since date as variables
    query = "democrat+republicans -filter:retweets" #removes retweets
    location_selected = '37.781157,-122.398720,45mi'

    # Collect tweets
    tweets = tweepy.Cursor(api.search,
        q=query,
        geocode=location_selected,
        lang="en",
    ).items(5)

    #Print tweets and attached attributes
    for tweet in tweets:
        users_attributes = [tweet.user.screen_name, tweet.user.location, tweet.text]
        print(users_attributes)