const socketIO = {
    init(io) {
        let onlineUsers = {}

        io.on("connection", (socket) => {
            console.log("[server] user connected, with an id", socket.id)

            socket.on("disconnect", () => {
                console.log("[server] user disconnected", socket.id)
                const userDisconnect = onlineUsers[socket.id]
                delete onlineUsers[socket.id]

                // emit
                io.emit("ONLINE_USERS", onlineUsers)
                io.emit("USER_DISCONNECTED", userDisconnect)
            })

            socket.on("disconnecting", (reason) => {
                console.log(`[server] user disconnecting, reason: ${reason}`)
            })

            socket.on("USER_CONNECTED", (args) => {
                onlineUsers[socket.id] = args
                console.log(`[server] received from client ${JSON.stringify(args)}`)

                // emit
                io.emit("USER_CONNECTED", args)
                io.emit("ONLINE_USERS", onlineUsers)
            })

            socket.on("USER_SEND_MESSAGE", (data) => {
                console.log(`[server] user send message`, data)

                // emit
                socket.broadcast.emit("USER_SEND_MESSAGE", data)
            })

            socket.on("USER_TYPING", (data) => {
                console.log(`[server] user typing`, data)

                // emit
                socket.broadcast.emit("USER_TYPING", data)
            })

            socket.on("USER_NOT_TYPING", (data) => {
                console.log(`[server] user not typing`, data)

                // emit
                socket.broadcast.emit("USER_NOT_TYPING", data)
            })
        })
    },
}

module.exports = socketIO
