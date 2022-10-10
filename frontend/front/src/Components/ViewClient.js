import React, { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn} from 'mdb-react-ui-kit';


const ViewCliet=()=>{
    const[adminInfo, setAdminInfo]=useState(
        {
            "id": 0,
            "name": "",
            "email": "",
            "password": "",
            "phone": "",
            "organization": "",
            "profileImageName": "",
            "agreementPaperName": "",
            "role": "",
            "projects": null,
            "profileImageFile": null,
            "profileImageSrc": "",
            "agreementPaperFile": null,
            "agreementPaperSrc": ""
        });
      const[error, setError]= useState("");

      const user =  JSON.parse(localStorage.getItem('user-info'));
      const {id} = useParams();
      const navigate = useNavigate();
    
      useEffect(()=>{
        
    
         fetch(`https://localhost:44327/api/Client/details/${id}`,{
            headers:{
                "Authorization" : `Bearer ${user.token}`
            }
         })
         .then(res=> res.json())
         .then(res=>{
            setAdminInfo(res);
            
         })
         .catch(err=>console.log(err));
      },[])
    
      function BacktoDash(){
            navigate(`/admin/handle/clients`);
      }
      return (
        <section className="vh-100" >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center text-white"
                      style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                      <MDBCardImage src={adminInfo.profileImageSrc}
                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                      <MDBTypography tag="h5">{adminInfo.name}</MDBTypography>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4"/>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Name</MDBTypography>
                            <MDBCardText className="text-muted">{adminInfo.name}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Organization</MDBTypography>
                            <MDBCardText className="text-muted">{adminInfo.organization}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        
                        <hr className="mt-0 mb-4"/>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{adminInfo.email}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">{adminInfo.phone}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr className="mt-0 mb-4"/>
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Agreement Paper</MDBTypography>
                            <a href={adminInfo.agreementPaperSrc} ><button className="btn btn-sm mb-4 px-6" color='#888' size='md'   >View</button></a>

                          </MDBCol>
                         
                        </MDBRow>
    
                        {/* <MDBTypography tag="h6">Information</MDBTypography> */}
                        <hr className="mt-0 mb-4" />
                        
    
                        <MDBBtn className="mb-4 px-6" color='dark' size='md'  onClick={BacktoDash} >Back</MDBBtn>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      );
      
}

export default ViewCliet;