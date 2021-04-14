require("dotenv").config()

const compression = require("compression")
const helmet = require("helmet")
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:8000", "http://localhost:3000", "http://localhost"],
        methods: ["GET", "POST"],
    },
})
const { PORT } = require("./_variables")
const socketIO = require("./_socket-io")

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require("./routes/index"))
app.use(require("./routes/authenticate"))

socketIO(io)

http.listen(PORT, () => {
    console.log(`[app] can be access via http://localhost:${PORT}`)
})
