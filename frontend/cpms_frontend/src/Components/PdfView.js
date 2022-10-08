import React,{useEffect} from 'react';

const PdfView =()=>{
    
    useEffect(()=>{
        // fetch(`http://localhost:10573/api/Client/agreementpaper/download/4`, {
        //     method: 'GET',
        //     responseType: 'blob' //Force to receive data in a Blob Format
        // })
        // .then(response => response.json())
        // .then( res=>{
        // //Create a Blob from the PDF Stream
        //     console.log(res);
        //     const file = new Blob(
        //       [res.fileContents], 
        //       {type: 'application/pdf'});
        // //Build a URL from the file
        //     const fileURL = URL.createObjectURL(file);
        // //Open the URL on new Window
        //     window.open(fileURL);
        // })
        // .catch(error => {
        //     console.log(error);
        // });

        //-------------------
        // fetch(`http://localhost:10573/api/Client/agreementpaper/download/4`).then(response => {
        //     console.log(response);
        //     response.blob().then(blob => {
        //         // Creating new object of PDF file
        //         const fileURL = window.URL.createObjectURL(blob);
        //         // Setting various property values
        //         let alink = document.createElement('a');
        //         alink.href = fileURL;
        //         alink.download = 'SamplePDF.pdf';
        //         alink.click();
        //     }) 
        // })
    },[])

    return(
        <div>
            Deepak
        </div>
    )
}

export default PdfView;