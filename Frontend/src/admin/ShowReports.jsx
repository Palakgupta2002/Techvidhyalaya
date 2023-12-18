import React, { useEffect, useState } from 'react';
import DeletePost from '../user/DeletePost';

const ShowReports = () => {
  const [userReports, setUserReports] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [offendemail, setOffendEmail] = useState(null);
  const getdata = async () => {
    await fetch("http://localhost:5000/ShowReports")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserReports(data);
      })
      .catch((error) => {
        console.error("Error fetching Report:", error);
      });
  }

  useEffect(() => {
    // Use useEffect to fetch data when the component mounts
    getdata();

  }, []);

  const handleImageDelete = (imageId, offenderEmail) => {
    setSelectedImageId(imageId);
    setOffendEmail(offenderEmail);
    console.log(selectedImageId); // This might not log the updated value immediately due to closure, but it's set correctly.
  };

  return (
    <div style={{width:"400px",border:"2px solid grey",paddingRight:"30px"}} >
      {userReports && userReports.length > 0 ? (
        userReports.map((item, index) => (
          <>
            {item && item?.user?.image?.length > 0 &&
              <div className='.blog-grid' key={index}>
                <p>{`Report Maker ${item.report.ReportMakerEmail}`}</p>
                <p>{`Offender Maker ${item.user.email}`}</p>
                <div>

                  <div>

                    {item.user && (
                      <ul style={{ listStyle: "none" }}>

                        <li>
                          <ul style={{ listStyle: "none" }}>
                            {item.user.image &&
                              Array.isArray(item.user.image) &&
                              item.user.image.map((image, imageIndex) => (
                                <li key={imageIndex}>
                                  {image !== null && image.data && image.contentType.startsWith("image/") && (
                                    <>
                                      <p>{image.description}</p>

                                      <img
                                        style={{ border: "2px solid red" }}
                                        width={"300px"}
                                        src={URL.createObjectURL(
                                          new Blob([new Uint8Array(image.data.data)], {
                                            type: image.contentType,
                                          })
                                        )}
                                        alt={`${item?.user?.username}'s Image`}
                                      />
                                      <button onClick={() => handleImageDelete(image?._id, item?.report?.OffenderEmail)}>
                                        <DeletePost globalEmail={item?.report?.OffenderEmail} selectedImageId={image?._id} />
                                      </button>
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
                                        title={`${item?.user?.username}'s PDF`}
                                        src={URL.createObjectURL(
                                          new Blob([new Uint8Array(pdf.data.data)], {
                                            type: pdf.contentType,
                                          })
                                        )}
                                        width="20%"
                                        height="360"
                                      ></iframe>
                                      <button
                                        onClick={() => handleImageDelete(pdf?._id, item?.report?.OffenderEmail)}
                                      >

                                        <DeletePost globalEmail={item?.report?.OffenderEmail} selectedImageId={pdf?._id} />
                                      </button>
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
                                        title={`${item?.usere?.username}'s Video`}
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
                                      {console.log(pdf?._id, "pdf", item.report, "item")}
                                      <button
                                        onClick={() => handleImageDelete(pdf?._id, item?.report?.OffenderEmail)}
                                      >
                                        <DeletePost globalEmail={item?.report?.OffenderEmail} selectedImageId={pdf?._id} />
                                      </button>
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
              </div>
            }

          </>

        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ShowReports;
