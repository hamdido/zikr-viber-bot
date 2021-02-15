require('dotenv').config()
const prexit = require('prexit')

const ngrok = require('./src/get_public_url');
const logger = require('./src/logger.js');
const sql = require('./src/db.js')
const bot = require('./src/bot.js')(logger,sql);

let server

if (process.env.SERVER_URL) {
    const http = require('http')
    const port = process.env.PORT || 8080
    if(process.env.BOT_REGISTER === 'true') {
        http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.SERVER_URL));
    } else {
        http.createServer(bot.middleware()).listen(port);
    }
    
} else {
    logger.debug('Could not find the now.sh/Heroku environment variables. Trying to use local ngrok server');
    ngrok.getPublicUrl().then(publicUrl => {
        const http = require('http');
        const port = process.env.PORT || 8080;
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


