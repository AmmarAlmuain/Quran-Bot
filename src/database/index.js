require("dotenv").config();
const mongoose = require("mongoose")

try {
    mongoose.connect(process.env.DB_CONNECTION_URI)
    console.log("Database is connected!")
} catch(error) {
    console.log(error)
}