require("dotenv").config()
const { APP_PORT, APP_URL, ORIGIN_URL } = require("./_variables")
const compression = require("compression")
const helmet = require("helmet")
const cors = require("cors")
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: [ORIGIN_URL],
        methods: ["GET", "POST"],
    },
})
const socketIO = require("./_socket-io")
const mongoDB = require("./mongodb/mongodb-config")

mongoDB.init()
socketIO.init(io)

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require("./routes/index"))
app.use(require("./routes/authenticate"))
app.use(require("./routes/room"))

http.listen(APP_PORT, () => {
    console.log(`[app] can be access via ${APP_URL}:${APP_PORT}`)
})
