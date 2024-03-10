const mongoose = require("mongoose")

const url = process.env.DB_URL
const connect =mongoose.connect(url)
.then(()=>{
    console.log("db connected");
})

module.exports = connect