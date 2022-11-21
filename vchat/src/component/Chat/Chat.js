import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join";
import socketIo, { io } from "socket.io-client";
import "./Chat.css";
import sendlogo from "../../send.webp";
import byelogo from "../../good.jpeg";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useRef } from 'react';
const ENDPOINT="https://vishalchat-app.herokuapp.com/";

let socket;
// const socket=socketIo(ENDPOINT,{cors: {
//         origin: ENDPOINT,
//         credentials: true
//         },transports:['websocket']})

const Chat = () => {
  
  const [id,setid] = useState("")
  const [messages,setMessages] = useState([]);
  const send=()=>{
  const message = document.getElementById("chatInput").value;
   socket.emit('message',{message, id});
   document.getElementById("chatInput").value = "";
  }
  const refmessages=useRef(messages);

    useEffect(() => {
        socket=socketIo(ENDPOINT,{cors: {
            origin: ENDPOINT,
            credentials: true
            },transports:['websocket']})

        socket.on('connect',()=>{
            alert("connected");
            setid(socket.id);
            socket.emit('joined',{user})
        })
        
        socket.on('welcome',(data)=>{
          setMessages([...refmessages.current,data]);
            // console.log(data.user,data.message);
            refmessages.current=[...refmessages.current,data];
        })
        
        socket.on('userJoined',(data)=>{
          setMessages([...refmessages.current,data]);
            // console.log(data.user,data.message);
            refmessages.current=[...refmessages.current,data];
        })
       
        socket.on('leave',(data)=>{
          setMessages([...refmessages.current,data]);
          // console.log(data.user, data.message);
          refmessages.current=[...refmessages.current,data];
      })
      socket.on('sendMessage',(data)=>{
        setMessages([...refmessages.current,data]);
        // console.log(data.user ,data.message ,data.id)
        // console.log(messages);
        refmessages.current=[...refmessages.current,data];
      })
    
      return () => {
        socket.emit('disconnect');
        socket.off();
      }

    }, [])

  return (
    <div className="chatPage">
        <div className="ChatContainer">
        <div className="header" >
          <h2>V Chat</h2>
         <a href="/"> <img src={byelogo} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox" >
          {messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/> )}
        </ReactScrollToBottom>
        <div className="inputBox" >
            <input onKeyPress={(event)=>event.key==='Enter' ?send(): null} type="text" className="chatInput" id="chatInput" />
            <button onClick={send} className="sendBtn"><img src={sendlogo} alt="" /></button>               
        </div>
        </div>
       
    </div>
  )
}

export default Chat