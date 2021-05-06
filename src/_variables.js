const APP_URL = process.env.APP_URL || "http://localhost"
const APP_PORT = process.env.APP_PORT || 3000
const MONGO_CONNECTION = process.env.MONGO_CONNECTION || null
const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost"

module.exports = {
    APP_URL,
    APP_PORT,
    MONGO_CONNECTION,
    ORIGIN_URL,
}
