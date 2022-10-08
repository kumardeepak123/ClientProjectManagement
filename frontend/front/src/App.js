
import React from 'react';
import {BrowserRouter,Route,Routes} from'react-router-dom'
import Login from './Components/Login'
import ClientDashboard from './Components/ClientDashboard';
import Protected from './Auth/Protected';
function App() {
  return (
    <div > 
     <BrowserRouter>
     <Routes>
        <Route path="/login" element={<Login/>}></Route> 
        <Route path='/client/dashboard/:id' element={<Protected Cmp={ClientDashboard}/>}></Route>      
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
