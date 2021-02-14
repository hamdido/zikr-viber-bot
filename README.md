# Viber bot for shared Zikr - e.g. uttering 1000000 Salawats

# Running locally
```
ngrok http 8080
BOT_REGISTER=true nodejs index.js
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

# Commands
```
[slm,info] - show information
[read] - show interactive menu
[progress] - show reading progress

```

# Posgres

```
heroku pg:psql --app zikr
```

# Deployment

# Sharing application
viber://pa/info?uri=zirkdev

# Links
- https://github.com/Viber/sample-bot-isitup
- https://developers.viber.com/docs/api/rest-bot-api/
- https://developers.viber.com/docs/tools/deep-links/
- https://partners.viber.com/account
- https://github.com/porsager/postgres

