const status = require("http-status-codes")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.status(status.OK).json({
        success: true,
        message: "",
        data: {},
    })
})

module.exports = router
