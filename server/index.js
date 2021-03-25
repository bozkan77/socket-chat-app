const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUserInRoom} = require ('./users.js');

const PORT = process.env.PORT || 2000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);


io.on('connect', (socket)=> {

  socket.on('join', ({name, room}, callback)=> {
    
    const {error, user} = addUser({id: socket.id, name, room});

    if(error) return callback(error);

    socket.emit('message', {user: 'admin', text: `${user.room} sohbet odasına hoş geldin ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name} katıldı.`})
    
    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})

    callback();
  })

  socket.on('sendMessage', (message, callback)=>{
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {user: user.name, text: message});

    callback()
  })

  socket.on('disconnect', ()=> {
    const user = removeUser(socket.id);

    if(user){
      io.to(user.room).emit('message', {user: 'Admin', text:`${user.name} ayrıldı...`});
      io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom[user.room]});
    }
  });
});



server.listen(PORT, ()=> console.log(`Server ${PORT} portunda çalışıyor.`))