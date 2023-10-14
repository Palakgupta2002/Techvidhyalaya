import React, { useState } from 'react';
import Share from './Share'; // Import your Share component
import Download from './Download'; // Import your Download component
import { Button, Modal } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import Report from './Report';
import { MoreOutlined } from '@ant-design/icons';
import {ShareAltOutlined } from '@ant-design/icons'
import {DownloadOutlined } from '@ant-design/icons'
// Import react-pdf for PDF rendering

// Configure PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const ShowImages = ({ profilesToMap, globalemail, searchQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [offendemail, setoffendemail] = useState("")
  const [ReportImageLink, SetReportImageLink] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  console.log(ReportImageLink, "REport ")

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
  const [isModalVisibleP, setIsModalVisibleP] = useState(false);
 

  const showModalP = (post) => {
    setSelectedPost(post);
    setIsModalVisibleP(true);
  };

  const handleOkP = () => {
    setIsModalVisibleP(false);
  };

  const handleCancelP = () => {
    setIsModalVisibleP(false);
  };


  return (
    <div>
      <div>
        <ul style={{ width: "800px", listStyle: "none" }}>
          <h3>user profiles</h3>
          {profilesToMap.map((profile, index) => (
            <li style={{ width: "500px", marginLeft: "100px"}} key={index}>
              {/* <p>{profile.username}</p> */}
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
                    <li style={{ border: "2px solid grey", marginTop: "20px",borderRadius:"20px" }} key={imageIndex}>
                      {(image !== null && image.data && image.contentType) && (
                        <>
                          <p style={{ borderBottom: "2px solid grey", padding: "10px", textAlign: "start" }}>{image.description}</p>
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
                              <iframe style={{}}
                              
                                src={URL.createObjectURL(
                                  new Blob([new Uint8Array(image.data.data)], {
                                    type: image.contentType,
                                  })
                                )}
                                width="90%"
                                height="500px"
                                frameBorder="0"
                              ></iframe>
                              

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
                          <div style={{ borderTop: "2px solid grey", padding: "10px" }}>
                            <div style={{width:"5.5rem",position:"absolute",marginLeft:"18rem"}}>
                              <Button   type="primary" onClick={() => showModalP({ email: profile.email, reportImageLink: URL.createObjectURL(new Blob([new Uint8Array(image.data.data)], { type: image.contentType })) })}>
                                More <MoreOutlined />
                              </Button>
                              <Modal
                                title="Report about The Post"
                                visible={isModalVisibleP && selectedPost && selectedPost.email === profile.email}
                                onOk={handleOkP}
                                onCancel={handleCancelP}
                              >
                                <button onClick={() => {
                                  console.log(profile?.email)
                                  setoffendemail(profile?.email)
                                  SetReportImageLink(image?._id)
                                }}>
                                  <Report offendemail={offendemail} ReportImageLink={ReportImageLink} />
                                </button >
                              </Modal>
                            </div>
                            <Download />
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
                              <ShareAltOutlined />
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