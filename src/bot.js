const ViberBot  = require('viber-bot').Bot;
// eslint-disable-next-line no-unused-vars
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const config = require('./config.js');
const _  = require('lodash');

function init(logger, sql) {
    const c = require('./commands.js')(sql, config)

    const bot = new ViberBot(logger, {
        authToken: process.env.BOT_AUTH_KEY,
        name: process.env.BOT_NAME,
        avatar: process.env.BOT_AVATAR
    });
    
    bot.onSubscribe(response => {
        response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}!`));
    });
    
    bot.onTextMessage(/.*/i, (message, response) => {
        if(message === 'slm' || message === 'info') {
            let slm = 'وَعَلَيْكُمُ ٱلسَّلَامُ'
            response.send(new TextMessage(`${slm}`))
            response.send(new TextMessage(
            `--- Information ---
            Type 'read' to choose count <br>
            Type 'number' e.g. 100 to register reading <br>
            Type 'progress' to see progress details <br>
            `))
        } else if(message == 'read'){
            response.send(getKeyboard())
        }else if(message == 'progress'){
            c.info(message, response,
                (info) => {
                    response.send(new TextMessage(`${info.text}`))
                    response.send(new TextMessage(`${info.type} count ${info.utterance}. Remaining ${info.remaining} until ${info.expected}`))
            })
        } else {
            if(_.isNumber(message)) {
                c.read(message, response, () => response.send(new TextMessage(`Thank you ${response.userProfile.name}`)))
            } 
            c.info(message, response,
                (info) => {
                    response.send(new TextMessage(`${info.text}`))
                    response.send(new TextMessage(`${info.type} count ${info.utterance}. Remaining ${info.remaining} until ${info.expected}`))
            })
        }
    });
    return bot
}


function getKeyboard() {
    var buttons = []
    [200,500,1000].forEach(item => {
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
    })
    
    return new KeyboardMessage({
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": buttons
    })
}

module.exports = init
