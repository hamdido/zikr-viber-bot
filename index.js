require('dotenv').config()
const prexit = require('prexit')

const ngrok = require('./src/get_public_url');
const logger = require('./src/logger.js');
const sql = require('./src/db.js')
const bot = require('./src/bot.js')(logger,sql);
express = require('express');
const app = express();

let server
if (process.env.SERVER_URL) {
    const http = require('http')
    const port = process.env.PORT || 8081
    const serverUrl  = process.env.SERVER_URL || "http://localhost"
    const serverPath =  process.env.SERVER_PATH || ""
    if(process.env.BOT_REGISTER === 'true') {
        logger.info("Start sever with webhook registered")
        app.use("/zikrviber", bot.middleware());
          app.listen(port, () => {
              console.log(`Application running on port: ${port}`);
              bot.setWebhook(`${serverUrl}${serverPath}`).catch(error => {
                  console.log('Can not set webhook on following server. Is it running?');
                  console.error(error);
                  process.exit(1);
              });
          });
    } else {
        logger.info(`Start sever on ${port}`)
        app.use(`${serverPath}`, bot.middleware());
        app.listen(port, () => {
            console.log(`Application running on port: ${port}`);
        });
    }
    
} else {
    logger.debug('Could not find the now.sh/Heroku environment variables. Trying to use local ngrok server');
    ngrok.getPublicUrl().then(publicUrl => {
        const http = require('http');
        const port = process.env.PORT || 8081;
        logger.info(`Start server on port [${port}]. Public url: ${publicUrl}`)
        server = http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
    }).catch(error => {
        logger.error('Can not connect to ngrok server. Is it running?');
        logger.error(error);
        process.exit(1);
    })
}

prexit(async () => {
    if(server) {
        await new Promise(r => server.close(r))
    }
    await sql.end({ timeout: 5 })
})


