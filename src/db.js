const postgres = require('postgres')

console.log("Connecting to",process.env.DATABASE_URL)
let ssl = process.env.DATABASE_SSL !== undefined ? process.env.DATABASE_SSL : false
if(ssl){
    module.exports = postgres(process.env.DATABASE_URL, {ssl: { rejectUnauthorized: false}})
}else {
    module.exports = postgres(process.env.DATABASE_URL)
}
