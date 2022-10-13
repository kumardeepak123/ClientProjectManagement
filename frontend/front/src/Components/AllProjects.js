import React, {useState, useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
const AllProjects=()=>{

   const[projects,setProjects]= useState([]);
   const user =  JSON.parse(localStorage.getItem('user-info'));

   const navigate = useNavigate();
   const loadData=async()=>{
    await fetch(`https://localhost:44327/api/Project/all`,{
        
            headers:{
                Authorization : `Bearer ${user.token}`
            }
        
    })
    .then(res=> res.json())
    .then(res=>{
        setProjects(res);
    })
   }

   const deleteProject=(id)=>{
    if(!window.confirm("Do you really want to delete?"))
    {
        return;
    }
        fetch(`https://localhost:44327/api/Project/delete/${id}`,{
        method:'DELETE',    
        headers:{
                Authorization:`Bearer ${user.token}`
            }
        })
        .then(res=>res.json())
        .then(res=>{
            alert("Project deleted successfully");
            loadData();

        })
   }
   
   useEffect(()=>{
    loadData();
   },[])
    return(
        <div className='container'>
            <button className='btn btn-lg btn-primary mt-3 mb-3' onClick={()=>{navigate(`/admin/create/project`)}}>Add Project</button>
            <div  class="row">
            {projects.map((p,i)=>(
                
                <div key={i} class="col-xl-4 mb-4">
                    <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            
                            <div class="ms-3">
                            <p class="fw-bold mb-1">{p.name}</p>
                            <p class="text-muted mb-0">Budget: {p.budget}cr</p>
                            </div>
                        </div>
                        {p.clientId!= null?(
                            <span class="badge rounded-pill badge-success">Assigned</span>
                        ) :(
                            <span class="badge rounded-pill badge-warning">Not Assigned</span>
                        )}
                        </div>
                    </div>
                    <div
                        class="card-footer border-0 bg-light p-2 d-flex justify-content-around"
                    >
                        <button className='btn   text-muted m-0 ' onClick={()=>{navigate(`/admin/view/project/${p.id}`)}}>
                          View
                        </button>
                        <button className='btn   text-muted m-0 ' onClick={()=>{navigate(`/admin/edit/project/${p.id}`)}}>
                          Edit
                        </button>
                        <button className='btn   text-muted m-0 ' onClick={()=>{deleteProject(p.id)}}>
                          Delete
                        </button>
                    </div>
                    </div>
                </div>
          
              
            ))}
            </div>
        </div>
    )
}

export default AllProjects;