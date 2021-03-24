import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
const ENDPOINT = 'localhost2000'

let socket;

const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(()=>{
    const {name, room} = queryString.parse(location.search);
    
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, (err)=> {
      console.log(err)
    });

    return ()=> {
      socket.emit('disconnect');

      socket.off();
    }
  }, [ENDPOINT, location.search])

  return <div className="">Chat Comp</div>;
};

export default Chat;
