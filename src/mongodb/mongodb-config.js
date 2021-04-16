const mongoose = require("mongoose")
const { MONGO_CONNECTION } = require("../_variables")

const mongoDB = {
    init() {
        mongoose.connect(MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            socketTimeoutMS: 60000,
            serverSelectionTimeoutMS: 10000,
            poolSize: 20,
            family: 4,
        })
        mongoose.connection.once("open", () => {
            console.log("Mongodb is now connected!")
        })
        mongoose.connection.on("error", (error) => {
            console.error(error)
        })
    },
}

module.exports = mongoDB
