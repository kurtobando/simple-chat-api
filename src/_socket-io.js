const socketIO = {
    init(io) {
        let onlineUsers = {}

        io.on("connection", (socket) => {
            socket.on("disconnect", () => {
                const userDisconnect = onlineUsers[socket.id]

                if (userDisconnect !== undefined) {
                    delete onlineUsers[socket.id]
                    // emit
                    io.emit("ONLINE_USERS", onlineUsers)
                    io.emit("USER_DISCONNECTED", userDisconnect)
                }
            })

            socket.on("disconnecting", (reason) => {
                return false
            })

            socket.on("USER_CONNECTED", (args) => {
                onlineUsers[socket.id] = args

                // emit
                io.emit("USER_CONNECTED", args)
                io.emit("ONLINE_USERS", onlineUsers)
            })

            socket.on("USER_DISCONNECTED", () => {
                const userDisconnect = onlineUsers[socket.id]

                if (userDisconnect !== undefined) {
                    delete onlineUsers[socket.id]
                    // emit
                    io.emit("ONLINE_USERS", onlineUsers)
                    io.emit("USER_DISCONNECTED", userDisconnect)
                }
            })

            socket.on("USER_SEND_MESSAGE", (data) => {
                // emit
                socket.broadcast.emit("USER_SEND_MESSAGE", data)
            })

            socket.on("USER_TYPING", (data) => {
                // emit
                socket.broadcast.emit("USER_TYPING", data)
            })

            socket.on("USER_NOT_TYPING", (data) => {
                // emit
                socket.broadcast.emit("USER_NOT_TYPING", data)
            })
        })
    },
}

module.exports = socketIO
