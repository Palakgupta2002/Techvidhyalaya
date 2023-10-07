import React, { useState } from 'react';
import Share from './Share';
import Download from './Download';
import { Button, Modal } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf'; // Import react-pdf for PDF rendering

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const ShowImages = ({  profilesToMap,globalemail,SetReportLink}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  

  const showModal = (imageUrl, contentType) => {
    setUrl(imageUrl);
    setContentType(contentType);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
const handleclick=()=>{
  console.log("hello");
}

  return (
    <div>
      <div>
        <ul style={{width:"800px",listStyle:"none"}}>
          <h3>user profiles</h3>
          {profilesToMap.map((profile, index) => (
            <li  style={{ width:"450px",marginLeft:"100px"}} key={index}>
              <p>{profile.username}</p>
              <ul style={{ listStyle: 'none' }}>
                {(profile.image || []).map((image, imageIndex) => (
                  <li style={{border:"2px solid red",marginTop:"20px"}} key={imageIndex}>
                    {(image !== null && image.data && image.contentType ) && (
                      <>
                        <p style={{borderBottom:"2px solid red",padding:"10px",textAlign:"start"}}>{image.description}</p>
                        {image.contentType.startsWith('image/') && (
                          <img
                            width={'400px'}
                            src={URL.createObjectURL(
                              new Blob([new Uint8Array(image.data.data)], {
                                type: image.contentType,
                              })
                            )}
                            alt={`${profile.username}'s Image`}
                          />
                        )}
                        
                        {image.contentType === 'application/pdf' && (
                          // Render a PDF viewer for PDF files
                          <div>
                            <Document className="Document"
                              file={URL.createObjectURL(
                                new Blob([new Uint8Array(image.data.data)], {
                                  type: image.contentType,
                                })
                              )}
                              onLoadSuccess={onDocumentLoadSuccess}
                              
                            >
                              
                              {Array.from(new Array(numPages), (el, index) => (
                                <Page _className='page' 
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                  onClick={handleclick}
                                />
                               
                              ))}
                               
                            </Document >
                            <p>Page {pageNumber} of {numPages}</p>
                          </div>
                        )}
                        {image.contentType.startsWith('video/') && (
                          // Render a video player for video files
                          <video controls width="300">
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
                        <div style={{borderTop:"2px solid red",padding:"10px"}}>
                        <Download globalemail={globalemail}/>
                        <button className='buttondesign' style={{position:"absolute", marginTop:"-30px"}}
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
        <Modal  visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {contentType.startsWith('image/') && <Share url={url} />}
        </Modal>
      </div>
    </div>
  );
};
