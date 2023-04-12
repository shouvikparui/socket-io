import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:9000");

const Home = () => {
  const [message, setMessage] = useState();
  const [receiveMessage, set_receiveMessage] = useState([]);
  const [sentMessage, set_sentMessage] = useState([]);
  const [room, setRoom] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Error");

    socket.emit("send_message", { message, room });
    set_sentMessage([...sentMessage, message]);
    
    setMessage(""); //client--->server
  };

  function getRoom(event) {
    setRoom(event.target.value);
  }

  function sendRoom(e) {
    e.preventDefault();
    socket.emit("join_room", { room });
  }

  const addMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(receiveMessage);
      set_receiveMessage([...receiveMessage, data.message]);
    });
  });

  return (
    <>
      <div className="App">
        <input
          type="text"
          name="message"
          value={message}
          onChange={addMessage}
          placeholder="Message..."
        />
        <button onClick={sendMessage}>Send Message</button>
        <input
          type="number"
          name="room"
          value={room}
          onChange={getRoom}
          placeholder="Room..."
        />
        <button onClick={sendRoom}>Set Room</button>

        {receiveMessage.map((object, id) => {
          return (
            <>
              <h4 key={id}>{object}</h4>
            </>
          );
        })}
        {sentMessage.map((object, id) => {
          return (
            <>
              <h2 key={id}>{object}</h2>
            </>
          );
        })}
      </div>
    </>
  );
};
export default Home;
/*
 // server-side
io.on("connection", (socket) => {
   socket.emit("hello", 1, "2", { 3: '4', 5: Buffer.from([6]) });
 });
 
 // client-side
 socket.on("hello", (arg1, arg2, arg3) => {
   console.log(arg1); // 1
   console.log(arg2); // "2"
   console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
 });
 */

/*  // for a specific event
socket.removeAllListeners("details");
// for all events
socket.removeAllListeners(); */

//for same server and ignoring the rest servers
//io.local.emit("hello", "world");

//io.to("room1").to("room2").to("room3").emit("some event");