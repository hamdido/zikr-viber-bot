const postgres = require('postgres')

console.log("Connecting to",process.env.DATABASE_URL)
const sql = postgres(process.env.DATABASE_URL, {ssl: { rejectUnauthorized: false }})

module.exports = sql