import React, { useState, useEffect } from 'react';
import Home from './Home';

function MyNotes() {
  const [profile, setProfiles] = useState([]);
  const [selectedLink, setSelectedLink] = useState("Yes")
  
  const handleImageClick = (link) => {
    setSelectedLink(link);
    
  };
  console.log(selectedLink,"hello..............")


  useEffect(() => {
    // Fetch the user's profile data
    fetch("http://localhost:5000/Profile")
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  return (
    <div>
      
      <h3>User Profiles</h3>
      {profile && (
        <ul>
         
            <li>
              <p>{profile.username}</p>
              <ul>
                {console.log(profile)}
                {profile.image &&
                  Array.isArray(profile.image) &&
                  profile.image.map((image, imageIndex) => (
                    <li key={imageIndex}>
                      {image !== null &&
                        image.data &&
                        image.contentType.startsWith("image/") && (
                          <>
                            <img style={{ border: "2px solid red" }} width={"300px"}
                               src={URL.createObjectURL(
                                new Blob([new Uint8Array(image.data.data)], {
                                  type: image.contentType,
                                })
                              )}
                              alt={`${profile.username}'s Image`}
                             
                            />
                            <button  onClick={() =>
                                // handleImageClick(
                                //   URL.createObjectURL(
                                //     new Blob([new Uint8Array(image.data.data)], {
                                //       type: image.contentType,
                                //     })
                                //   )
                                // )
                                console.log("hello")
                              }></button>
                           
                          </>
                        )}
                    </li>
                  ))}
                {profile.image !== null &&
                  Array.isArray(profile.image) &&
                  profile.image.map((pdf, pdfIndex) => (
                    <li key={pdfIndex}>
                      {pdf !== null &&
                        pdf.data &&
                        pdf.contentType === "application/pdf" && (
                          <>
                            {console.log(pdf.data.data, "ek ladaka pagal h")}
                            <iframe style={{ border: "2px solid red" }}
                              title={`${profile.username}'s PDF`}
                              src={URL.createObjectURL(
                                new Blob([new Uint8Array(pdf.data.data)], {
                                  type: pdf.contentType,
                                })
                              )}
                              width="100%"
                              height="500"
                              alt={`${profile.username}'s Image`}
                              
                            ></iframe>
                            <button onClick={() =>
                                handleImageClick(
                                  URL.createObjectURL(
                                    new Blob([new Uint8Array(pdf.data.data)], {
                                      type: pdf.contentType,
                                    })
                                  )
                                )
                                
                              }>delete</button>
                          </>
                        )}
                    </li>
                  ))}
                {profile.image !== null &&
                  Array.isArray(profile.image) &&
                  profile.image.map((pdf, pdfIndex) => (
                    <li key={pdfIndex}>
                      {/* Debugging */}
                      {pdf !== null &&
                        pdf.data &&
                        pdf.contentType === "video/mp4" && (
                          <>
                            {console.log(pdf.data.data, "ek ladaka pagal h")}
                            <video style={{ border: "2px solid red" }}
                              title={`${profile.username}'s Video`}
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
                            
                            <button  onClick={() =>
                                handleImageClick(
                                  URL.createObjectURL(
                                    new Blob([new Uint8Array(pdf.data.data)], {
                                      type: pdf.contentType,
                                    })
                                  )
                                )
                              } >delete</button>
                          </>
                        )}
                    </li>
                  ))}
              </ul>
            </li>
         
        </ul>
      )}
    </div>
  );
}

export default MyNotes;
