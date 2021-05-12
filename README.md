# Simple Chat

The "Simple Chat" application powered from GatsbyJS, NodeJS, MongooseJS and socket.io allow user to create "public" and "private" rooms, with privacy in mind.

Which means, we never save your messages on our server, only active chat members who can read your messages during your active session. Thanks to socket.io enables real-time, bidirectional and event-based communication.

[![Simple Chat Preview](https://simple-chat.kurtobando.com/preview.png "Simple Chat Preview")](https://simple-chat.kurtobando.com/preview.png "Simple Chat Preview")

Have doubts? Check Source Code

Client [github.com/kurtobando/simple-chat](https://github.com/kurtobando/simple-chat)

Server API [github.com/kurtobando/simple-chat-api](https://github.com/kurtobando/simple-chat-api)

## Demo
Visit [simple-chat.kurtobando.com](https://simple-chat.kurtobando.com)


## Installation

Simple Chat requires [Node.js](https://nodejs.org/) v14+ to run.

### Development
create `.env`
```
APP_URL=http://localhost
APP_PORT=3000
MONGO_CONNECTION=MONGO_DB_CONNECTION_STRING
ORIGIN_URL=SIMPLE_CHAT_CLIENT_URL
```
Then.
```sh
npm install
npm run develop
```

### Production
create `.env`
```
APP_URL=http://localhost
APP_PORT=3000
MONGO_CONNECTION=MONGO_DB_CONNECTION_STRING
ORIGIN_URL=SIMPLE_CHAT_CLIENT_URL
```
Then.
```sh
npm install
node ./src/server.js
```

## License
MIT
