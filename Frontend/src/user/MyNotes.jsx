import React, { useState, useEffect } from 'react';
import DeletePost from "../user/DeletePost"
import context from './context';
import { useContext } from 'react';

function MyNotes() {
  const [profile, setProfiles] = useState([]);
  const [selectedLink, setSelectedLink] = useState();
  const [selectedImageId, setSelectedImageId] = useState(null);
   const {globalEmail}=useContext(context);

  useEffect(() => {
    fetch("http://localhost:5000/Profile")
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  const handleImageDelete = (imageId) => {
    setSelectedImageId(imageId);
    console.log("Selected Image ID:", imageId,globalEmail,"global");
  };

  return (
    <div>
      <h3>hello</h3>
      {profile && (
        <ul style={{ listStyle: "none" }}>
          <h3>hello</h3>
          <li>
            <ul style={{ listStyle: "none" }}>
              {profile.image &&
                Array.isArray(profile.image) &&
                profile.image.map((image, imageIndex) => (
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
                          alt={`${profile.username}'s Image`}
                        />
                        <button onClick={() => handleImageDelete(image._id)}><DeletePost globalEmail={globalEmail} imageId={selectedImageId}/></button>
                      </>
                    )}
                  </li>
                ))}
              {profile.image &&
                Array.isArray(profile.image) &&
                profile.image.map((pdf, pdfIndex) => (
                  <li key={pdfIndex}>
                    {pdf !== null && pdf.data && pdf.contentType === "application/pdf" && (
                      <>
                        <p>{pdf.title}</p>
                        
                        <iframe
                          style={{ border: "2px solid red" }}
                          title={`${profile.username}'s PDF`}
                          src={URL.createObjectURL(
                            new Blob([new Uint8Array(pdf.data.data)], {
                              type: pdf.contentType,
                            })
                          )}
                          width="20%"
                          height="360"
                        ></iframe>
                        <button onClick={() => handleImageDelete(pdf._id)}><DeletePost  globalEmail={globalEmail} selectedImageId={selectedImageId}/></button>
                      </>
                    )}
                  </li>
                ))}
              {profile.image &&
                Array.isArray(profile.image) &&
                profile.image.map((pdf, pdfIndex) => (
                  <li key={pdfIndex}>
                    {pdf !== null && pdf.data && pdf.contentType === "video/mp4" && (
                      <>
                        <p>{pdf.title}</p>
                        <video
                          style={{ border: "2px solid red" }}
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
                        <button onClick={() => handleImageDelete(pdf._id)}><DeletePost globalEmail={globalEmail} imageId={selectedImageId}/></button>
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
