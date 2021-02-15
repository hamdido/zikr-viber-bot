const ViberBot  = require('viber-bot').Bot;
// eslint-disable-next-line no-unused-vars
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const config = require('./config.js');
const _  = require('lodash');

function init(logger, sql) {
    const c = require('./commands.js')(sql, config, logger)

    const bot = new ViberBot(logger, {
        authToken: process.env.BOT_AUTH_KEY,
        name: process.env.BOT_NAME,
        avatar: process.env.BOT_AVATAR
    });
    
    bot.onSubscribe(response => {
        response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}!`));
    });
    
    bot.onTextMessage(/.*/i, (message, response) => {
        logger.debug(`Message ${message.text} from ${response.userProfile}`)
        if(isNumeric(message.text)) {
            c.read(message, response, () => {
                response.send(new TextMessage(`Thank you ${response.userProfile.name}`))
                c.info(message, response,
                    (info) => {
                        showInfo(response, info)
                })
            }, (msg) => {
                response.send(new TextMessage(`Sorry! ${msg}`))
            })
        } else if(['read', 'zikr', '+'].includes(message.text)){
            response.send(getKeyboard()) // TODO failing t
        } else if(['info','?'].includes(message.text)){
            c.info(message, response,
                (info) => {
                    showInfo(response, info)
            })
        } else {
            response.send(new TextMessage(
            `
            --- Help ---
            Type '+' to choose count (read, zikr)
            Type '100' e.g. 100 to register reading
            Type 'info' to see reading details
            Type 'help' or '?' to show help information
            `))    
        }
    });
    return bot
}

function isNumeric(num){
    return !isNaN(num)
}

function showInfo(response, info){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const remainingDays = daysBetween(new Date(), info.expected)
    const percentage = ((info.utterance / info.target) * 100).toFixed(2)
    response.send([new TextMessage(`${info.text}`), new TextMessage(
        `${info.type} count ${info.utterance} - ${percentage}%.\n` + 
        `remaining ${info.remaining}\n` + 
        `${remainingDays} days until ${new Date(info.expected).toLocaleDateString('en-UK',options)}`)])
}
function daysBetween(one, another) {
    return Math.round(Math.abs((+one) - (+another))/8.64e7);
}

function getKeyboard() {
    var buttons = []
    for(const item of [100,200,500,1000]){
        buttons.push(
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#e6f5ff",
                "BgLoop": true,
                "Text": `${item}`,
                "TextVAlign": "middle",
                "TextHAlign": "center",
                "TextOpacity": 60,
                "TextSize": "regular",
                "ActionType": "reply",
                "ActionBody": `${item}`
            }
        )
    }
    
    return new KeyboardMessage({
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": buttons
    })
}

module.exports = init
