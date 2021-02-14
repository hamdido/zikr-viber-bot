require('dotenv').config()
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./resources/config.json'))
const sql = require('../src/db.js')
const c = require('../src/commands.js')(sql,config)
const _ = require('lodash')
const { fail } = require('assert')


let responseUserA = {
  userProfile: {
    id: '001',
    name: 'UserA'
  }
}

beforeAll(async () => {
  await sql`truncate zikr.reading,zikr.record cascade;`
  await sql`INSERT INTO zikr.reading (zikr, utterance, started, expected) VALUES('salawat', 0, now(), now() + INTERVAL '5 day');`
})

afterAll(async () => {
  await sql.end()
});

beforeEach(() => {
    
})

afterEach(() => {

})


test('Should register reading', async () => {
  await c.read({text:'1000'}, responseUserA, _.noop, () => fail("Unable to take reading"))
})

test('Should show info', async () => {
  await c.info({text:''}, responseUserA, (info) => expect(info.remaining).toBe(999000) , _.noop)  
})



