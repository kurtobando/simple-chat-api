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
            data: { error: e.message },
        })
    }
})

router.post("/room-join", [validationRules[0], validationRules[3]], async (req, res) => {
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
        const roomPassword = req.body["room-password"].length !== 0 ? req.body["room-password"] : null

        const roomFind = await RoomSchema.find({
            room_id: roomUniqId,
            room_password: roomPassword,
        })

        if (roomFind.length > 1) {
            return res.status(status.OK).json({
                success: false,
                message: `${roomUniqId} has a duplicate entry! Not allowed, please create new room instead.`,
                data: { room_id: roomUniqId },
            })
        }
        if (roomFind.length === 0) {
            return res.status(status.OK).json({
                success: false,
                message: `${roomUniqId} has a password or does not exist! Please create new room instead.`,
                data: { room_id: roomUniqId },
            })
        }

        return res.status(status.OK).json({
            success: true,
            message: `${roomUniqId} does exist! Welcome user!`,
            data: { room_id: roomUniqId },
        })
    } catch (e) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: ERROR_01,
            data: { error: e.message },
        })
    }
})

module.exports = router
