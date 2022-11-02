import React, { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import ReactPaginate from 'react-paginate';

let items= [];

const HandleClients=()=>{
     const[clients, setClients]=  useState([]);
     const user =  JSON.parse(localStorage.getItem('user-info'));
     const[isClientDeleted,setIsClientDeleted]=useState(false);
     const[searchBy, setSearchBy]= useState("");
     const[sortBy, setSortBy]= useState("");
    //  Pagination Logic
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const[itemsPerPage,setItemsPerPage]= useState(5);

     const navigate = useNavigate();
      // const loadData=()=>{
      //   fetch(`https://localhost:44327/api/Client/all`,{
      //       headers:{
      //           "Authorization" : `Bearer ${user.token}`
      //       }
      //   })
      //   .then(res=> res.json())
      //   .then(res=>{
      //     const endOffset = itemOffset + itemsPerPage;
      //     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      //     setClients(res.slice(itemOffset, endOffset));
      //     items= res;
      //     setPageCount(Math.ceil(res.length / itemsPerPage));
      //       // setClients(res);
      //       setIsClientDeleted(false);
      //   })
      // }

     useEffect(()=>{
        //loadData();
        searchEmployee();
     },[itemOffset, itemsPerPage])

     const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

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
              // loadData();
              searchEmployee();
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
          const endOffset = itemOffset + itemsPerPage;
          console.log(`Loading items from ${itemOffset} to ${endOffset}`);
          setClients(res.slice(itemOffset, endOffset));
          items= res;
          setPageCount(Math.ceil(res.length / itemsPerPage));
            // setClients(res);
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
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      </div>
  )

}

export default HandleClients;