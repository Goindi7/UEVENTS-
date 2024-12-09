const mongoose = require("mongoose")

async function dbConnect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/uevents');
        console.log("Db connected")
    } catch (error) {
        console.log("Error in DB : ", error)
    }
}

module.exports = dbConnect