import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "./Ever.png"
import Profile from "./Profile"
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { RedoOutlined } from '@ant-design/icons'
import context from "./context";
import Download from "./Download";
import { useNavigate } from "react-router-dom";
import Share from "./Share";



const Home = () => {

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [url, seturl] = useState(" ")
  const { postcreate } = useContext(context)
  console.log("post create", postcreate)

  const getdata = async () => {
    await fetch("http://localhost:5000/Profiles")
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }
  const onNotes = () => {
    navigate("/MyNotes");
  }
  const handleShareClick = (newUrl) => {
    seturl(newUrl);
  };


  useEffect(() => {
    getdata()
  }, [postcreate]);



  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpenp, setIsModalOpenp] = useState(false);
  const showModalp = () => {
    setIsModalOpenp(true);
  };
  const handleOkp = () => {
    setIsModalOpen(false);
  };
  const handleCancelp = () => {
    setIsModalOpenp(false);
  };
  const [isModalOpenS, setIsModalOpenS] = useState(false);
  const showModalS = () => {
    setIsModalOpenS(true);
  };
  const handleOkS = () => {
    setIsModalOpenS(false);
  };
  const handleCancelS = () => {
    setIsModalOpenS(false);
  };

  return (
    <div >
      <nav id="nav" style={{ justifyContent: "space-between" }} >
        <div><img width={"150px"} src={logo} /></div>
        <div><button onClick={onNotes}>
          MyNotes

        </button></div>
        <Button style={{}} type="primary" onClick={showModal}>
          profile
        </Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Profile />
        </Modal>
      </nav>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>

          <ul>
            <h3>user profiles</h3>
            {profiles.map((profile, index) => (
              <li key={index}>
                <p>{profile.username}</p>
                <ul>
                  {profile.image &&
                    Array.isArray(profile.image) &&
                    profile.image.map((image, imageIndex) => (
                      <li key={imageIndex}>
                        {image !== null &&
                          image.data &&
                          image.contentType.startsWith("image/") && (
                            <>
                            <p>{image.title}</p>
                              <img style={{ border: "2px solid red" }} width={"300px"}
                                src={URL.createObjectURL(
                                  new Blob([new Uint8Array(image.data.data)], {
                                    type: image.contentType,
                                  })
                                )}
                                alt={`${profile.username}'s Image`}

                              />
                              <Download />
                              <button
                                onClick={() =>
                                  handleShareClick(
                                    URL.createObjectURL(
                                      new Blob([new Uint8Array(image.data.data)], {
                                        type: image.contentType,
                                      })
                                    )
                                  )
                                }
                              >
                                <Button style={{}} type="primary" onClick={showModalp}>
                                  Share
                                </Button>
                                <Modal open={isModalOpenp} onOk={handleOkp} onCancel={handleCancelp}>
                                  <Share url={url} />
                                </Modal>
                              </button>
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
                              {console.log(pdf.tittle)}
                              <p>{pdf.title}</p>
                              <iframe style={{ border: "2px solid red" }}
                                title={`${profile.username}'s PDF`}
                                src={URL.createObjectURL(
                                  new Blob([new Uint8Array(pdf.data.data)], {
                                    type: pdf.contentType,
                                  })
                                )}
                                onClick={() => seturl(URL.createObjectURL(
                                  new Blob([new Uint8Array(pdf.data.data)], {
                                    type: pdf.contentType,
                                  })
                                ))}
                                width="100%"
                                height="500"
                              ></iframe>
                              <Download />
                              <button
                                onClick={() =>
                                  handleShareClick(
                                    URL.createObjectURL(
                                      new Blob([new Uint8Array(pdf.data.data)], {
                                        type: pdf.contentType,
                                      })
                                    )
                                  )
                                }
                              >
                                <Button style={{}} type="primary" onClick={showModalp}>
                                  Share
                                </Button>
                                <Modal open={isModalOpenp} onOk={handleOkp} onCancel={handleCancelp}>
                                  <Share url={url} />
                                </Modal>

                              </button>
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
                              {console.log(pdf.data.data)}
                              <p>{pdf.data.title}</p>
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
                                  type={pdf.contentType}
                                  onClick={() => seturl(URL.createObjectURL(
                                    new Blob([new Uint8Array(pdf.data.data)], {
                                      type: pdf.contentType,
                                    })
                                  ))}
                                />
                                Your browser does not support the video tag.
                              </video>
                              <Download />
                              <button
                                onClick={() =>
                                  handleShareClick(
                                    URL.createObjectURL(
                                      new Blob([new Uint8Array(pdf.data.data)], {
                                        type: pdf.contentType,
                                      })
                                    )
                                  )
                                }
                              >
                                <Button style={{}} type="primary" onClick={showModalp}>
                                  Share
                                </Button>
                                <Modal open={isModalOpenp} onOk={handleOkp} onCancel={handleCancelp}>
                                  <Share url={url} />
                                </Modal>
                              </button>
                            </>
                          )}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div >

          <Link to="Posts">
            <button>
              new Post
              <PlusOutlined />

            </button>
          </Link>
        </div>
        <div>
          <Button style={{ backgroundColor: "transparent" }} type="primary" onClick={showModalS}>
            <Button >
              LogOut
              <RedoOutlined />
            </Button>
          </Button>
          <Modal open={isModalOpenS} onOk={handleOkS} onCancel={handleCancelS}>
            Want to go logout
            <button>
              <Link to="/">
                Logout
              </Link>
            </button>
          </Modal>

        </div>

      </div>



      <Outlet />
    </div>
  );
};

export default Home;
