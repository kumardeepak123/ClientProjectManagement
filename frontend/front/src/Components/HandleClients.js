import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
const HandleClients=()=>{
     const[clients, setClients]=  useState([]);
     const user =  JSON.parse(localStorage.getItem('user-info'));
     const[isClientDeleted,setIsClientDeleted]=useState(false);
     const[searchBy, setSearchBy]= useState("");
     const[sortBy, setSortBy]= useState("");

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
            setIsClientDeleted(false);
        })
      }

     useEffect(()=>{
        loadData();
     },[])

     const deleteClientHandle=(clientID,clientName)=>{
        if(!window.confirm("Do you really want to delete?")){
          return;
        }
        //update client id of project to null
        fetch(`https://localhost:44327/api/Project/update/clientIds/${clientID}`,{
          method:'PUT',
          headers:{
            Authorization:`Bearer ${user.token}`,
          }
        })
        .then(res=> res.json())
        .then(res=>{
            fetch(`https://localhost:44327/api/Client/delete/${clientID}`,{
              method:'DELETE',
              headers:{
                Authorization:`Bearer ${user.token}`
              }
            })
            .then(r=>r.json())
            .then(r=>{
              alert(clientName+" deleted successfully");
              setIsClientDeleted(true);
              loadData();
            })
        })
      }

      const onChangeHandler=name=>(event)=>{
          if(name === "searchBy"){
            setSearchBy(event.target.value);
            return;
          }
          if(name === "sortBy"){
            if(event.target.value === "sort"){
              setSortBy("");
              return;
            }
            setSortBy(event.target.value);
          }
      }

      const searchEmployee=()=>{
        fetch(`https://localhost:44327/api/Client/all?sortBy=${sortBy}&&orderBy=""&&searchByName=${searchBy}`,{
            headers:{
                "Authorization" : `Bearer ${user.token}`
            }
        })
        .then(res=> res.json())
        .then(res=>{          
            setClients(res);
            
            setIsClientDeleted(false);
        })
      }
    return(
        <div className="container mt-5 "> 
        <nav class="navbar navbar-light bg-light">
        <select id="leavetype" onChange={onChangeHandler("sortBy")}>
        <option  value="sort">sort</option>
        <option  value="name">name</option>
        <option  value="email">email</option>
        </select>
          <div style={{display:'flex'}}>
            <input class="form-control mr-sm-2" type="search Client" onChange={onChangeHandler("searchBy")} placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" onClick={searchEmployee} >Search</button>
          </div>
        <button className="btn btn-success" onClick={()=>{navigate(`/admin/create/client`)}}>Add Client</button>
        </nav>
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
                   <button className="btn btn-danger" onClick={()=>{deleteClientHandle(e.id, e.name)}}>Delete</button>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
  )

}

export default HandleClients;