#Import Packages
import tweepy
import os
import tweepy as tw
import pandas as pd

#Create Crediential Keys
consumer_key = 'V6XKhulVp7YYY3jVJAE5yZHcR'
consumer_secret = 'k6ydihnwe2Oue1ITswLVTSHrD5YpLQyNIQlWrxlLnvBYwjRFuL'
access_token = '2620473211-yUybtaw3CDNd9vyHh9qSvgOul1pkiOuB0wpVEts'
access_token_secret = 'srxKoqEdF0SJbBnB8K2mgcz1m7AOJLUVHofIB5yyycXAZ'

#Set Up Configuration
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# Define the search term and the date_since date as variables
new_search = "presidential+election -filter:retweets" #-filter removes retweets
date_since = "2020-01-01"

# Collect tweets
tweets = tw.Cursor(api.search,
              q=new_search,
              lang="en",
              since=date_since).items(5)

users_locs = [[tweet.user.screen_name, tweet.user.location, tweet.text] for tweet in tweets]

#Print tweets and attached attributes
for tweet in tweets:
    print(users_locs)


