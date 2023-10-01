import React from 'react'

import { useState  } from 'react';

function Download() {
    
    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('SamplePDF.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'SamplePDF.pdf';
                alink.click();
            })
        })
    }
    

  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
        <button onClick={onButtonClick}>
                    Download PDF
                </button>
        </div>
        </div>
      
  )
}


export default Download