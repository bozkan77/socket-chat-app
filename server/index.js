const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removerUser, getUser, getUserInRoom} = require ('./users.js');

const PORT = process.env.PORT || 2000;

const router = require('./router');
const { on } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);


io.on('connection', (socket)=> {
  console.log('We have a new connection');

  socket.on('join', ({name, room}, callback)=> {
    
    const {error, user} = addUser({id: socket.id, name, room});

    if(error) return callback(error);

    socket.emit('message', {user: 'admin', text: `${user.room} sohbet odasına hoş geldin ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name} katıldı.`})
    
    socket.join(user.room);
  })

  socket.on('sendMessage', ()=>{
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {user: user.name, text: message})
  })

  socket.on('disconnect', ()=> {
    console.log('User had left!!!');
  });
});



server.listen(PORT, ()=> console.log(`Server ${PORT} portunda çalışıyor.`))