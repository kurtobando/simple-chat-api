const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = {
    _id: Schema.Types.ObjectId,
    user_name: {
        type: String,
        required: true,
    },
    user_password: {
        type: String,
        required: false,
    },
    user_created: {
        type: Date,
        default: new Date(),
    },
    is_archive: {
        type: Boolean,
        default: false,
    },
}

module.exports = mongoose.model("users", UserSchema)
