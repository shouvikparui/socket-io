import React,{useState,useEffect} from 'react';
import { io } from "socket.io-client";
import './Poll.css';

const socket=io.connect("http://localhost:8000/");




const Poll = () => {
    
  const [poll,setPoll]=useState([
    {votes:0,label:"JS",color:"red",id:0},
    {votes:0,label:"PHP",color:"green",id:1},
    {votes:0,label:"HTML",color:"blue",id:2},
    {votes:0,label:"CSS",color:"black",id:3}
  ]);
  
  
 
  const get_req= (event)=>{
    
    const index=event.target.value;
    let newArr = [...poll];
    newArr[index].votes+=1;
    socket.emit("get_poll",newArr);
    setPoll(newArr);
    


  }
  useEffect(()=>{socket.on("send_poll",(data)=>{
    console.log("Get data",data);
    let newArr = [...data];
    console.log(newArr);
    setPoll(newArr);
  })},[socket])
   
  return (
    <>
      <div className='voting '>
        {poll.map((object,index)=>{
          
          return(<>
              <div className='item' key={index}>
              <h1>{object.label}</h1><p>{index}</p>
              <button style={{color:object.color}} value={index}  onClick={get_req} >{object.label}</button>
              <p>{object.votes}</p>
              
              
        </div>
          </>)

        })}
        
      </div>
     
    </>
  )
}

export default Poll