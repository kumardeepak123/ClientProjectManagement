import React ,{useState, useEffect}from "react";
import {useParams, useNavigate} from 'react-router-dom'
import Moment from 'moment'
import {
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
const EditProject=()=>{
    const[project, setProject]= useState({
        "id": 0,
        "name": "",
        "startDate":'',
        "endDate": "",
        "technology": "",
        "fRequirement": "",
        "nfRequirement": "",
        "budget": 0,
        "_Client": null,
        "clientId": 10
    });
    const[showSd, setShowSd]= useState(true);
    const[showED, setShowED]= useState(true);

    const user =  JSON.parse(localStorage.getItem('user-info'));
    const {id}= useParams();
    const navigate = useNavigate();

    const handleChange=name=>(event)=>{
        setProject({...project,[name]:event.target.value})
     }


    const editProject=()=>{

      if(project.name===""|| project.startDate===""|| project.endDate==="" ||
      project.budget===""|| project.technology===""|| project.fRequirement===""
      ||project.nfRequirement==="")
      {
          alert("Please include all the fields");
          return;
      }
      
      const sDate = Moment(project.startDate).format('YYYY-MM-DD');
      const eDate = Moment(project.endDate).format('YYYY-MM-DD');
      if(eDate<=sDate){
          alert("End date should be greater than start date");
          return;
      }

     fetch(`https://localhost:44327/api/Project/update/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${user.token}`,
            "Accept":'application/json',
            "Content-Type":'application/json'
        },
        body: JSON.stringify(project)
     })
     .then(res=>res.json())
     .then(res=>{
        alert("Project updated successfully");
        navigate(`/admin/projects`);
     })
    }

    const loadData= async()=>{
        await fetch(`https://localhost:44327/api/Project/details/${id}`,{
           
                headers:{
                    Authorization : `Bearer ${user.token}`
                }
            
        })
        .then(res=>res.json())
        .then(res=>{
            setProject(res);
        })
  }

  useEffect(()=>{
   loadData();
  },[])

     return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Edit Project</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg' value={project.name.split("T")[0]} type='text' onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Start Date</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                    {
                        showSd ?(
                            <div>
                            <p className="text-muted">{project.startDate.split("T")[0]}</p>
                            <button className="btn btn-sm text-muted" onClick={()=>{setShowSd(false)}}>change</button>
                            </div>
                        ):(
                            
                               
                              <input type="date" value={project.startDate} onChange={handleChange("startDate")}></input>
                              
                        )      
                                                      
                    }
                      
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">End Date</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                    {
                        showED ?(
                            <div>
                            <p className="text-muted">{project.endDate.split("T")[0]}</p>
                            <button className="btn btn-sm text-muted" onClick={()=>{setShowED(false)}}>change</button>
                            </div>
                        ):(
                                                
                              <input type="date" value={project.endDate} onChange={handleChange("endDate")}></input>
                              
                        )      
                                                      
                    }
                    {/* <input type="date" value={project.endDate} onChange={handleChange("endDate")}></input> */}
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Budget</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='number' value={project.budget} onChange={handleChange("budget")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Technology</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg' value={project.technology}  onChange={handleChange("technology")}/>
                    </MDBCol>

                </MDBRow>
                <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Functional requirement</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg' value={project.fRequirement}  onChange={handleChange("fRequirement")}/>
                    </MDBCol>

                </MDBRow>
    
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Non Functional requirement</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea  size='lg' value={project.nfRequirement}  onChange={handleChange("nfRequirement")}/>
                    </MDBCol>
                </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <button className='btn btn-lg btn-primary mr-3'  onClick={editProject}>Edit</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/projects`)}}>Cancel</button>
                  
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
}

export default EditProject;