import React, { useState } from 'react';
import Share from './Share'; // Import your Share component
import Download from './Download'; // Import your Download component
import { Button, Modal } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
 // Import react-pdf for PDF rendering

// Configure PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const ShowImages = ({ profilesToMap, globalemail, searchQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [offendemail,setoffendemail]=useState("")

  // Function to show the modal with content
  const showModal = (imageUrl, contentType) => {
    setUrl(imageUrl);
    setContentType(contentType);
    setIsModalOpen(true);
  };
  console.log(offendemail)

  // Function to handle modal OK action
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // Function to handle modal Cancel action
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(globalemail,"in showimages")

  // Function to handle PDF page click
  const handlePageClick = () => {
    console.log("Page clicked");
  };

  // Function to handle click on any content
  const handleContentClick = () => {
    console.log("Content clicked");
  };

  // Function to handle video playback error
  const handleVideoError = () => {
    console.log("Video playback error");
  };

  // Function to handle PDF document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <div>
        <ul style={{ width: "800px", listStyle: "none" }}>
          <h3>user profiles</h3>
          {profilesToMap.map((profile, index) => (
            <li style={{ width: "450px", marginLeft: "100px" }} key={index}>
              <p>{profile.username}</p>
              <ul style={{ listStyle: 'none' }}>
                {(profile.image || [])
                  .filter((image) => {
                    // Check if searchQuery is not null and the image description includes the search query
                    return (
                      !searchQuery ||
                      (image !== null &&
                        image.data &&
                        image.contentType &&
                        image.description &&
                        image.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    );
                  })
                  .map((image, imageIndex) => (
                    <li style={{ border: "2px solid red", marginTop: "20px" }} key={imageIndex}>
                      {(image !== null && image.data && image.contentType) && (
                        <>
                          <p style={{ borderBottom: "2px solid red", padding: "10px", textAlign: "start" }}>{image.description}</p>
                          {image.contentType.startsWith('image/') && (
                            <img
                              width={'400px'}
                              src={URL.createObjectURL(
                                new Blob([new Uint8Array(image.data.data)], {
                                  type: image.contentType,
                                })
                              )}
                              alt={`${profile.username}'s Image`}
                              onClick={handleContentClick}
                            />
                          )}
                          {image.contentType === 'application/pdf' && (
                            // Render a PDF viewer for PDF files
                            <div>
                              <Document
                                file={URL.createObjectURL(
                                  new Blob([new Uint8Array(image.data.data)], {
                                    type: image.contentType,
                                  })
                                )}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onClick={handleContentClick}
                              >
                                {Array.from(new Array(numPages), (el, index) => (
                                  <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    onClick={handlePageClick}
                                  />
                                ))}
                              </Document>
                              <p>Page {pageNumber} of {numPages}</p>
                            </div>
                          )}
                          {image.contentType.startsWith('video/') && (
                            // Render a video player for video files
                            <video controls width="300" onError={handleVideoError}>
                              <source
                                src={URL.createObjectURL(
                                  new Blob([new Uint8Array(image.data.data)], {
                                    type: image.contentType,
                                  })
                                )}
                                type={image.contentType}
                              />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          <div style={{ borderTop: "2px solid red", padding: "10px" }}>
                            <button onClick={()=>{
                              setoffendemail(profile.email)
                            }}>
                            <Download offendemail={offendemail} />
                            </button>
                            <button className='buttondesign' style={{ position: "absolute", marginTop: "-30px" }}
                              onClick={() =>
                                showModal(
                                  URL.createObjectURL(
                                    new Blob([new Uint8Array(image.data.data)], {
                                      type: image.contentType,
                                    })
                                  ),
                                  image.contentType
                                )
                              }
                            >
                              Share
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
        <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {contentType.startsWith('image/') && <Share url={url} />}
        </Modal>
      </div>
    </div>
  );
};

export default ShowImages;
