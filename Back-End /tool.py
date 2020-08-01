import tweepy

#Create Crediential Keys
consumer_key = 'V6XKhulVp7YYY3jVJAE5yZHcR'
consumer_secret = 'k6ydihnwe2Oue1ITswLVTSHrD5YpLQyNIQlWrxlLnvBYwjRFuL'
access_token = '2620473211-yUybtaw3CDNd9vyHh9qSvgOul1pkiOuB0wpVEts'
access_token_secret = 'srxKoqEdF0SJbBnB8K2mgcz1m7AOJLUVHofIB5yyycXAZ'

#Set Up Configuration
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

#Run Number of Tweets Program
user = api.get_user('dishsrivastava')
print(user.screen_name)
print('Followers Count: ' + str(user.followers_count))
print('Tweets Count: ' + str(user.statuses_count))