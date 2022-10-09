
import React from 'react';
import {BrowserRouter,Route, Routes} from'react-router-dom'
import Login from './Components/Login'
import ClientDashboard from './Components/ClientDashboard';
import Protected from './Auth/Protected';
import Home from './Components/Home';
import AdminDashboard from './Components/AdminDashboard';
import Navigationbar from './Components/Navigationbar';
import AdminProfile from './Components/AdminProfile';
import HandleClients from './Components/HandleClients';
function App() {
  return (
    <div > 
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigationbar/>}>
            <Route index  element={<Home/>}/>     
            <Route path="/login" element={<Login/>}/>
            <Route path='/client/dashboard/:id' element={<Protected Cmp={ClientDashboard}/>}/> 
            <Route path='/admin/dashboard/:id' element={<Protected Cmp={AdminDashboard}/>}/>  
            <Route path='/admin/profile' element={<Protected Cmp={AdminProfile}/>}/>  
            <Route path='/admin/handle/clients' element={<Protected Cmp={HandleClients}/>}/>  
        </Route> 
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
