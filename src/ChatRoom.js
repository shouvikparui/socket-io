import React,{useState,useEffect} from 'react';
import { io } from "socket.io-client";
//import './ChatRoom.css';

const socket=io.connect('http://localhost:7000');

const ChatRoom = () => {
  const [chat,setChat]=useState();
  const [arraychat,setArrayChat]=useState([]);
  const [getChat,setGetChat]=useState([]);
  const [room,setRoom]=useState();
  const [name,setName]=useState();
  

  

  const setText=async (event)=>{

     const name=event.target.name;
     if(name=="Chat"){setChat(event.target.value)}

     else if(name=="Room"){setRoom(event.target.value)}

     else if(name=="Name"){setName(event.target.value)}
     
    
  }

  const sendChat=(e)=>{

    e.preventDefault();
    
    var today = new Date();
    const time = today.getHours() + ':' + today.getMinutes();
    let chatting={text:chat,time:time,room:room}
    socket.emit("setChat",chatting);
    setArrayChat([...arraychat,chatting]);
  }
  const sendRoom=(e)=>{

    e.preventDefault();
    socket.emit("setRoom",room);
    
  }
  const sendName=(e)=>{

    e.preventDefault();
    socket.emit("setName",name);
    
  }

  useEffect(()=>{
      socket.on("getChat",(data)=>{
        var today = new Date();
        const time = today.getHours() + ':' + today.getMinutes();
        let chatting={text:data.text,time:time}
        setGetChat([...getChat,chatting])
      })
  },[socket])


  return (
    <>
      <div className='chatRoom'>
        <input type="text" placeholder="Enter text.." onChange={setText} value={chat} name="Chat"/><span><button onClick={sendChat}>Create</button></span>
        <input type="number"  onChange={setText} value={room} name="Room" /><span><button onClick={sendRoom}>Create room</button></span>
        <input type="text" onChange={setText} value={name} name="Name" placeholder="Enter name"/><span><button onClick={sendName}>Send!!</button></span>
      </div>

      <div className='displayChat'>

        <div className='sendChat'>
           {arraychat.map((object)=>{
            return(<>
                <p>{object.text},{object.time}</p>
            </>)
           })}
        </div>

        <div className='receivedChat'>
           {getChat.map((object)=>{
            return(<>
                <h1>{object.text},{object.time}</h1>
            </>)
           })}
        </div>

      </div>
    

    </>
  )
}

export default ChatRoom