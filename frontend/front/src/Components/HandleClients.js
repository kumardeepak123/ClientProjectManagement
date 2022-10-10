import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
const HandleClients=()=>{
     const[clients, setClients]=  useState([]);
     const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
      const loadData=()=>{
        fetch(`https://localhost:44327/api/Client/all`,{
            headers:{
                "Authorization" : `Bearer ${user.token}`
            }
        })
        .then(res=> res.json())
        .then(res=>{
            setClients(res);
        })
      }

     useEffect(()=>{
        loadData();
     },[])
    return(
        <div className="container mt-5 "> 
        <button className="btn mb-2" onClick={()=>{navigate(`/admin/create/client`)}}>Add Client</button>
        <table class="table table-hover  table-striped  ">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>    
            {clients.map((e, index)=>
                <tr key={index} >
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>
                <button className="btn  btn-info" style={{marginRight:'5px'}} onClick={()=>{navigate(`/admin/view/client/${e.id}`)}} >View</button>
                   <button className="btn  btn-secondary" style={{marginRight:'5px'}} onClick={()=>{navigate(`/admin/edit/client/${e.id}`)}}>Edit</button>
                   <button className="btn btn-danger">Delete</button>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
  )

}

export default HandleClients;