import React, {useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile
  }
  from 'mdb-react-ui-kit';
  
const EditClient=()=>{
    const[client, setClient]= useState({
        "id": 2,
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "organization": "",
        "profileImageName": "",
        "agreementPaperName": "",
        "role": "Client",
        "projects": null,
        "profileImageFile": null,
        "profileImageSrc": "",
        "agreementPaperFile": null,
        "agreementPaperSrc": ""
    });
    const[projects, setProjects]= useState([]);
    const[projectId, setProjectId]= useState(0);
    const[projectInfo, setProjectInfo]= useState(
        {
            "id": 2,
            "name": "",
            "startDate": "",
            "endDate": "",
            "technology": "",
            "fRequirement": "",
            "nfRequirement": "",
            "budget": 0,
            "_Client": null,
            "clientId": 0
        }
    );

    const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();
    const {id} = useParams();

    const loadAdminInfo= async()=>{
        
        await fetch(`https://localhost:44327/api/Client/details/${id}`,{
           headers:{
               "Authorization" : `Bearer ${user.token}`
           }
        })
        .then(res=> res.json())
        .then(res=>{
           setClient(res);
           
        })
        .catch(err=>console.log(err));
    }

    const loadProjects = async()=>{
        await fetch(`https://localhost:44327/api/Project/noclient`,{
           headers:{
               "Authorization" : `Bearer ${user.token}`
           }
        })
        .then(res=> res.json())
        .then(res=>{
           setProjects(res);
           
        })
        .catch(err=>console.log(err));
    }


    useEffect(()=>{
        loadAdminInfo();
        loadProjects();
     },[])

    const handleChange=name=>(event)=>{
        if(name === "profileImageFile" || name === "agreementPaperFile"){
            setClient({...client,[name]:event.target.files[0]})
            return;
        }

        if(name === "assignProject"){
            setProjectId(event.target.value);
            return;
        }

        setClient({...client,[name]:event.target.value})
    }
   
    const EditClientHandle= (e)=>{
        
        //load project
        fetch(`https://localhost:44327/api/Project/details/${projectId}`,{
            headers:{
                "Authorization" : `Bearer ${user.token}`
            }
        })
        .then(res=> res.json())
        .then(resProj=>{
            setProjectInfo(resProj);
            //setProj({...proj,"clientId":client.id});
            const resProject = {...resProj,"clientId":client.id};
            console.log(resProject)
            
            //console.log(JSON.stringify(proj)+">>");
            
            //update client
            const  formData =  new FormData();
            formData.append("Id", 2);
            formData.append("Name", client.name);
            formData.append("Email", client.email);
            formData.append("Password", client.password);
            formData.append("Phone", client.phone);
            formData.append("Organization", client.organization);
            formData.append("Role", client.role);
            formData.append("ProfileImageName", client.profileImageName);
            formData.append("AgreementPaperName", client.agreementPaperName);
            formData.append("ProfileImageSrc", client.profileImageSrc);
            formData.append("AgreementPaperSrc", client.agreementPaperSrc);
            formData.append("ProfileImageFile", client.profileImageFile);
            formData.append("AgreementPaperFile", client.agreementPaperFile);
            fetch(`https://localhost:44327/api/Client/update/${client.id}`,{
            method:'PUT',
            headers:{
                "Authorization" : `Bearer ${user.token}`,
                // "Content-Type": "multipart/form-data"
            },
            body: formData
         })
         .then(res=>res.json())
         .then(res=>{
            //console.log("CLient UPDATED");
            //console.log(project+"?????")
            //update project
            console.log(projectId);
            //console.log(JSON.stringify(projectInfo));
            fetch(`https://localhost:44327/api/Project/update/${projectId}`,{
            method:'PUT',
            headers:{
                "Authorization" : `Bearer ${user.token}`,
                "Content-Type":"application/json",
                "Accept":'application/json'
            },
            body:JSON.stringify(resProject)
           })
           .then(res=> res.json())
           .then(res=>{
            
            alert("Updated successfully");
            navigate(`/admin/handle/clients`);
           })

         })

          
                      
        })
        
        

         
         //navigate("/admin/handle/clients");
    }
    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Edit Client</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg' value={client.name} type='text' onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0"  >Email address</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='email' value={client.email} onChange={handleChange("email")}/>
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Password</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='password' value={client.password} onChange={handleChange("password")}/>
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Phone</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' value={client.phone} onChange={handleChange("phone")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Organization</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' value={client.organization} onChange={handleChange("organization")}/>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Upload Agreement paper</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'  onChange={handleChange("agreementPaperFile")}/>
                      <div className="small text-muted mt-2">only .pdf files</div>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Upload Profile photo</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBFile size='lg'    onChange={handleChange("profileImageFile")}/>
                      <div className="small text-muted mt-2">select .png, .jpeg etc</div>
                    </MDBCol>
    
                  </MDBRow>

                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Assign Project</h6>
                    </MDBCol>    
                  </MDBRow>
                  {
                    projects.length !== 0 ? (
                      <select id="leavetype" onChange={handleChange("assignProject")}>
                      <option  value="select ...">select...</option>
                          {projects.map((p, index)=>
                              // if(p.clientId == null){
                              //     return(
                              //         <option key={index} value={p.id}>{p.name}</option>
                              //     )
                              // }
                          
                              <option key={index} value={p.id}>{p.name}</option>
                          
                          )}
                          
                      </select>
                    ):(
                      <p style={{color:"red"}}>No projects available</p>
                    )
                  }
                    

                  <hr className="mx-n3" />
    
                  <button className='btn btn-primary'  onClick={EditClientHandle}>Edit</button>
    
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
    

}

export default EditClient;