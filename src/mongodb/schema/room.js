const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoomSchema = {
    _id: Schema.Types.ObjectId,
    room_id: {
        type: String,
        required: true,
        unique: true,
    },
    room_name: {
        type: String,
        required: true,
    },
    room_description: {
        type: String,
        required: true,
    },
    room_password: {
        type: String,
        required: false,
    },
    room_created: {
        type: Date,
        default: new Date(),
    },
    is_public: {
        type: Boolean,
        required: true,
    },
    is_archive: {
        type: Boolean,
        default: false,
    },
}

module.exports = mongoose.model("rooms", RoomSchema)
