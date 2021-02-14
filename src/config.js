const fs = require('fs');
let rawdata = fs.readFileSync('./resources/config.json');
let config = JSON.parse(rawdata);

module.exports = config