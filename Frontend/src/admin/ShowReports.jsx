import React, { useEffect } from 'react'
import { useState } from 'react';

 const ShowReports = () => {
    const [userReport, setUserReport] = useState(null);
    const [imageclick,setimageclick]=useState(false);

    useEffect(() => {
        // Use useEffect to fetch data when the component mounts
        fetch("http://localhost:5000/ShowReports")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setUserReport(data);
          })
          .catch((error) => {
            console.error("Error fetching Report:", error);
          });
      }, []); 
      console.log(imageclick)
    


  return (
    <div>
      
      {
  userReport && userReport.length > 0 ? (
    userReport.map((item, index) => (
      <div style={{width:"300px"}} key={index}>
        <p>{`Report Maker ${item.report.ReportMakerEmail}`}</p>
        <p>{`Offend Maker ${item.user.email}`}</p>
        <div>
      <h3>hello</h3>
      {item.user && (
        <ul style={{ listStyle: "none" }}>
          <h3>hello</h3>
          <li>
            <button onClick={()=>{
                setimageclick(true)
            }}> show images
                </button>
            <ul style={{ listStyle: "none" }}>
              {item.user.image && imageclick===true &&
                Array.isArray(item.user.image) &&
                item.user.image.map((image, imageIndex) => (
                  <li key={imageIndex}>
                    {image !== null && image.data && image.contentType.startsWith("image/") && (
                      <>
                        <p>{image.description}</p>
                        <h3>hello</h3>
                        <img
                          style={{ border: "2px solid red" }}
                          width={"300px"}
                          src={URL.createObjectURL(
                            new Blob([new Uint8Array(image.data.data)], {
                              type: image.contentType,
                            })
                          )}
                          alt={`${item.user.username}'s Image`}
                        />
                        
                      </>
                    )}
                  </li>
                ))}
              {item.user.image &&
                Array.isArray(item.user.image) &&
                item.user.image.map((pdf, pdfIndex) => (
                  <li key={pdfIndex}>
                    {pdf !== null && pdf.data && pdf.contentType === "application/pdf" && (
                      <>
                        <p>{pdf.title}</p>
                        
                        <iframe
                          style={{ border: "2px solid red" }}
                          title={`${item.user.username}'s PDF`}
                          src={URL.createObjectURL(
                            new Blob([new Uint8Array(pdf.data.data)], {
                              type: pdf.contentType,
                            })
                          )}
                          width="100%"
                          height="360"
                        ></iframe>
                        
                      </>
                    )}
                  </li>
                ))}
              {item.user.image &&
                Array.isArray(item.user.image) &&
                item.user.image.map((pdf, pdfIndex) => (
                  <li key={pdfIndex}>
                    {pdf !== null && pdf.data && pdf.contentType === "video/mp4" && (
                      <>
                        <p>{pdf.title}</p>
                        <video
                          style={{ border: "2px solid red" }}
                          title={`${item.user.username}'s Video`}
                          controls
                          width="100%"
                          height="500"
                        >
                          <source
                            src={URL.createObjectURL(
                              new Blob([new Uint8Array(pdf.data.data)], {
                                type: pdf.contentType,
                              })
                            )}
                          />
                          Your browser does not support the video tag.
                        </video>
                      </>
                    )}
                  </li>
                ))}
            </ul>
            
          </li>
        </ul>
      )}
    </div>

      </div>
    ))
  ) : (
    <p>No data available</p>
  )
}




    </div>
  )
}
export default ShowReports;
