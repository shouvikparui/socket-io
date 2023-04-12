import React from 'react';
import {Route,Routes} from 'react-router-dom';


import Poll from './Poll';
import ChatRoom from './ChatRoom';

const App= ()=> {

  
 return (
   <Routes>
    
    <Route path="/poll" element={<Poll/>}/>
    <Route path='/chat' element={<ChatRoom/>}/>
   </Routes>
 )
}
export default App;