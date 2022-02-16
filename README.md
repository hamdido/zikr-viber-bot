# Viber bot for shared Zikr - e.g. uttering 1000000 Salawats
Application is used for shared uttering of Salawat with with a target count and fixed period.

High level steps
 - Register to Viber and create a bot -  https://partners.viber.com/
 - Register to Heroku - https://dashboard.heroku.com/
 - Create Postgres database and initialize using init.sql
 - Update Config Vars in Heroku dashboard
 - Deploy application
 - Share link and start using application - e.g. viber://pa/info?uri=zikrdev
 - Unregister bot when application no longer used.

# Usage
Every member of the bot group registers regularly the number of uttered Salawats by just entering the number: e.g. 200. 

All available commands:
```
[?,info] - show reading information
[read,zikr, +] - show interactive menu
[100] - register reading
[help, *] - show help
```

Normal users have restriction of min/maximum number of Salawats that can be registered in single go. This is to avoid corrupt practice.

# Sharing application
Use following links for reaching the application via Viber

viber://pa/info?uri=zikrdev

# Configuration
Additional configuration via config.json:
```
[
    {
        "name" : "salawat",
        "count": 1000000,
        "text": "ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
        "maxentry": 5000,
        "minentry": 100
    }
]
```
# Development
## Running locally
```
ngrok http 8080
BOT_REGISTER=true node index.js
```

Additional setup
```
docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres
docker stop postgres
docker start postgres
docker container rm postgres
psql -h localhost -p 5432 -U postgres
sudo lsof -i -P | grep -i "listen"
```



## Posgres

```
heroku pg:psql --app zikr
```

Heroku Hobby plan has row limit of 10000, thus we might need to cleanup records. Before doing that export data.
```
delete from zikr.record where created < now();
```

## Deployment
git push prod master
or
git push staging master

heroku git:remote -a zikr-dev
heroku git:remote -a zikr-prod

https://dashboard.heroku.com/apps/zikr-prod

# Viber API
## Register bot
curl --location --request POST 'https://chatapi.viber.com/pa/set_webhook' \
--header 'X-Viber-Auth-Token: xxx' \
--header 'Content-Type: application/json' \
--data-raw '{
   "url":"https://zikr-prod.herokuapp.com/"
}'

## Unregisster bot

curl --location --request POST 'https://chatapi.viber.com/pa/set_webhook' \
--header 'X-Viber-Auth-Token: xxx' \
--header 'Content-Type: application/json' \
--data-raw '{
   "url":""
}'

# Heroku 
Heroku provides free hosting and databse with some limitations for the Hobby plans:
 - application sleeps regularly if not used
 - 550 monthly dyno hours 
 - Postgres limit of 10000 rows

Usually those limits are just enough for this application. 

## config
Configuration variables:
 - ADMINS - list of admins
 - BOT_AUTH_KEY - bot token
 - BOT_NAME - name of the bot 
 - BOT_REGISTER - while starting enable bot by registering webhook
 - DATABASE_SSL - use true when db connection is using ssl
 - DATABASE_URL - db url e.g. postgres://username:server.compute.amazonaws.com:5432/databasename
 - LOG_LEVEL - e.g. info
 - SERVER_URL - url of the application - e.g. https://zikr-dev.herokuapp.com/
 

# Links
- https://github.com/Viber/sample-bot-isitup
- https://developers.viber.com/docs/api/rest-bot-api/
- https://developers.viber.com/docs/tools/deep-links/
- https://partners.viber.com/account
- https://github.com/porsager/postgres
- https://partners.viber.com/

