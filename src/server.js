require("dotenv").config()

const { PORT } = require("./_variables")
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const express = require("express")
const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require("./routes/index"))
app.use(require("./routes/authenticate"))

app.listen(PORT, () => {
    console.log(`[app] can be access via http://localhost:${PORT}`)
})
