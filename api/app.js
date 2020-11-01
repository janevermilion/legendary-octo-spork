const express = require('express');
const config = require('config');
const cors = require('cors');
const PORT = config.get('port');

const app = express();

app.use(express.static('public'))
app.use(express.static('files'))
app.use('/static', express.static('public'))
app.use(cors())
app.use(express.json());
app.use('/api/user', require('./routes/user.routes'));
//app.use('/api/chat', require('./routes/chat_socketio'));
// app.use('/api/card', require('./routes/card.routes'));

let server = require('http').Server(app);
let io = require('socket.io')(server);
require('./routes/chat_socketio')(io);
server.listen(PORT, () => console.log('App on ' + PORT));
