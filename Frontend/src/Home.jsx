import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "./Ever.png"
import Profile from "./Profile"
import { Button, Modal } from 'antd';
import { RedoOutlined } from '@ant-design/icons'
import context from "./context";
import Download from "./Download";
import { useNavigate } from "react-router-dom";
import Share from "./Share";
import Blog from "./Blog";
import Posts from "./Posts";
import FilterComponent from "./FilterComponent";



const Home = () => {

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [url, seturl] = useState(" ")
  const { postcreate } = useContext(context)



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




  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = profiles.filter((profile) => {
      // Search in profile data (username, email, college)
      const foundInProfileData =
        (profile?.username?.toLowerCase().includes(lowerCaseQuery) || false) ||
        (profile?.email?.toLowerCase().includes(lowerCaseQuery) || false) ||
        (profile?.college?.toLowerCase().includes(lowerCaseQuery) || false);
  
      // Search in image descriptions
      const foundInImageDescriptions = profile.image.some((image) =>
     
        (image?.description?.toLowerCase().includes(lowerCaseQuery) || false)
      );
  
      return foundInProfileData || foundInImageDescriptions;
    });
  
    setFilteredProfiles(filteredData);
  };
  console.log(filteredProfiles)
 
  
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
  const [isModalOpenN, setIsModalOpenN] = useState(false);
  const showModalN = () => {
    setIsModalOpenN(true);
  };
  const handleOkN = () => {
    setIsModalOpenN(false);
  };
  const handleCancelN = () => {
    setIsModalOpenN(false);
  };
  

  return (
    <div >
      <nav id="nav" style={{ justifyContent: "space-between" }} >
        <div><img width={"150px"} src={logo} /></div>
        <div><button className="buttondesign" onClick={onNotes}>
          MyNotes

        </button></div>
        <div>
          <Button style={{ backgroundColor: "#f3bc3e" }} type="primary" onClick={showModal}>
            Profile
          </Button>
          <Modal style={{}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Profile />
          </Modal>
        </div>

        <div>
          <Button style={{ backgroundColor: "transparent" }} type="primary" onClick={showModalS}>
            <Button style={{ backgroundColor: "#f3bc3e", color: "white" }}>
              LogOut
              <RedoOutlined />
            </Button>
          </Button>
          <Modal open={isModalOpenS} onOk={handleOkS} onCancel={handleCancelS}>
            Want to go logout

            <Link to="/">
              Logout
            </Link>

          </Modal>

        </div>
        <div className="buttondesign">
          <Blog />
        </div>


      </nav>
      <div >


        <div>
          <Button style={{ backgroundColor: "#f3bc3e" }} type="primary" onClick={showModalN} >
            New Post
          </Button>
          <Modal style={{}} open={isModalOpenN} onOk={handleOkN} onCancel={handleCancelN}>
            <Posts />
          </Modal>
        </div>
        <div>
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      
        <div>

          <ul>
            <h3>user profiles</h3>
            {profiles.map((profile, index) => (
              <li key={index}  >
                <p>{profile.username}</p>
                <ul style={{ listStyle: "none" }}>
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
      </div>



      <Outlet />
    </div>
  );
};

export default Home;
