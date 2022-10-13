import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
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
  
const CreateClient=()=>{
    const[client, setClient]= useState({
        "id": 2,
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "organization": "",
        "role": "Client",
        "profileImageFile": null,// new formDat()
        "agreementPaperFile": null
    });
    const user =  JSON.parse(localStorage.getItem('user-info'));
    const navigate = useNavigate();

    const handleChange=name=>(event)=>{
        
        if(name === "profileImageFile" || name === "agreementPaperFile"){
            setClient({...client,[name]:event.target.files[0]})
            return;
        }
        setClient({...client,[name]:event.target.value})
    }

    const addClient=()=>{
         if(client.name==="" || client.email===""|| client.password===""||
         client.phone===""|| client.organization===""||
         client.agreementPaperFile==null ||
         client.profileImageFile==null)
         {
          alert("Please include all the fields");
          return;
         }
         if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(client.email))
       {
        alert("Invalid email address");
        return;
       }
         var afileExtn=client.agreementPaperFile.name.split(".").pop()
         if(afileExtn !== 'pdf'){
          alert("Please select .pdf files only");
          return;
         }

         var pfileExtn=client.profileImageFile.name.split(".").pop()
         if(pfileExtn !== 'png' && pfileExtn!=='jpeg' && pfileExtn!=='jpg'){
          alert("Please .png or .jpeg image");
          return;
         }

         if(client.password.length<5){
          alert("Password should be minimum of 5 characters");
          return;
         }

         const  formData =  new FormData();
         formData.append("Id", 2);
         formData.append("Name", client.name);
         formData.append("Email", client.email);
         formData.append("Password", client.password);
         formData.append("Phone", client.phone);
         formData.append("Organization", client.organization);
         formData.append("Role", client.role);
         formData.append("ProfileImageFile", client.profileImageFile);
         formData.append("AgreementPaperFile", client.agreementPaperFile);

         fetch(`https://localhost:44327/api/Client/create`,{
            method:'POST',
            headers:{
                "Authorization" : `Bearer ${user.token}`,
                // "Content-Type": "multipart/form-data"
            },
            body: formData
         })
         .then(res=>res.json())
         .then(res=>{
            
            alert("Client created successfully");
            navigate("/admin/handle/clients");
         })
    }
    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='5' className='my-5'>
    
              <h1 class="text-black mb-4">Create Client</h1>
    
              <MDBCard>
                <MDBCardBody className='px-4'>
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Name</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='text' onChange={handleChange("name")}/>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Email address</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='email' onChange={handleChange("email")}/>
                    </MDBCol>
    
                  </MDBRow>

                  
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                      <h6 className="mb-0">Password</h6>
                    </MDBCol>
    
                    <MDBCol md='9' className='pe-5'>
                      <MDBInput  size='lg'  type='password' onChange={handleChange("password")}/>
                    </MDBCol>
    
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Phone</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' onChange={handleChange("phone")}/>
                    </MDBCol>

                 </MDBRow>
                 <hr className="mx-n3" />
                 <MDBRow className='align-items-center pt-4 pb-3'>
    
                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Organization</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput  size='lg'  type='text' onChange={handleChange("organization")}/>
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
                      <MDBFile size='lg'   onChange={handleChange("profileImageFile")}/>
                      <div className="small text-muted mt-2">select .png, .jpeg etc</div>
                    </MDBCol>
    
                  </MDBRow>
    
                  <hr className="mx-n3" />
    
                  <button className='btn btn-lg btn-primary mr-3'  onClick={addClient}>Create</button>
                  <button className='btn btn-lg btn-secondary'  onClick={()=>{navigate(`/admin/handle/clients`)}}>Cancel</button>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
    

}

export default CreateClient;