const { cond } = require('lodash');
const _  = require('lodash');

let type = "salawat"
function init(sql,config,logger) {
    let utils = {
        reading: (name) => {
            let [zikr] = config.filter( item => item.name === name)
            return zikr
        }
    }
    let command = {
        read: async (message, response, accept, reject) => {
            try {
                let conf = utils.reading(type)
                let addition = _.parseInt(message.text)
                
                // validate
                if(addition > conf.maxentry || addition < conf.minentry) {
                    reject(`Use from ${conf.minentry} to ${conf.maxentry}`)
                    return;
                }
                
                // add 
                await sql`
                    insert into zikr.record (zikr, profileid, profilename, utterance, created) 
                    values (${type},${response.userProfile.id},${response.userProfile.name}, ${addition}, now()) returning *
                `
                await sql`update zikr.reading set utterance = utterance + ${addition} where zikr = ${type}`
                accept()
            } catch(e){
                logger.error('Error during read command',e)
                reject('Please try again later')
            }
            
        },
        info: async (message, response, accept) => {
            let conf = utils.reading(type)
            let [reading] = await sql`
                select utterance, started, expected from zikr.reading where zikr = ${type}
            `
            let info =  {
                type : type, 
                utterance: reading.utterance,
                target: conf.count, 
                remaining: conf.count - reading.utterance,
                started: reading.started,
                expected: reading.expected,
                text: conf.text
            }
            accept(info)
        }
      
    }
    return command
}


module.exports = init