const status = require("http-status-codes")
const validator = require("express-validator")
const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const RoomSchema = require("../mongodb/schema/room")
const { ERROR_01 } = require("../_error-messages")

const validationRules = [
    validator.check("room-unique-id").trim().notEmpty(),
    validator.check("room-name").trim().notEmpty(),
    validator.check("room-description").trim().notEmpty(),
    validator.check("room-password").trim(),
    validator.check("room-enable-password").trim().isBoolean(),
]

router.post("/room-create", validationRules, async (req, res) => {
    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: ERROR_01,
            data: {
                errors: errors.array(),
            },
        })
    }

    try {
        const roomUniqId = req.body["room-unique-id"] || null
        const roomName = req.body["room-name"] || null
        const roomDescription = req.body["room-description"] || null
        const roomPassword = req.body["room-password"] || null
        const isPublic = req.body["room-enable-password"] || false

        const roomCreate = new RoomSchema({
            _id: new mongoose.Types.ObjectId(),
            room_id: roomUniqId,
            room_name: roomName,
            room_description: roomDescription,
            room_password: roomPassword,
            is_public: isPublic,
        })

        await roomCreate.save()

        return res.status(status.OK).json({
            success: true,
            message: `${roomName} successfully created, with room id ${roomUniqId}`,
            data: {
                room_id: roomUniqId,
            },
        })
    } catch (e) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: ERROR_01,
            data: {},
        })
    }
})

module.exports = router
