import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../user/images/Ever.png"
import Profile from "./Profile"
import { Button, Modal } from 'antd';
import { RedoOutlined } from '@ant-design/icons'
import context from "./context";
import Download from "./Download";
import { useNavigate } from "react-router-dom";
import Share from "./Share";
import Blog from "./Blog";
import Posts from "./Posts";
import { ShowImages } from "./ShowImages";
import CreateQuiz from "../admin/CreateQuiz";
import { ShowQuiz } from "./ShowQuiz";
import { SearchOutlined } from "@ant-design/icons"
import { ReloadOutlined } from "@ant-design/icons"

const Home = () => {

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [url, seturl] = useState(" ")
  const { postcreate } = useContext(context)
  const { globalemail } = useContext(context)
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const profilesToMap = searchQuery ? filteredProfiles : profiles;
  const [ReportLink, SetReportLink] = useState("")
  const [offendlink, setoffendlink] = useState("")
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




  useEffect(() => {
    getdata()
  }, [postcreate]);





  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredData = profiles.filter((profile) => {
      // Search in profile data (username, email, college)

      // Search in image descriptions
      const foundInImageDescriptions = profile.image.some((image) =>
        (image?.description?.toLowerCase().includes(lowerCaseQuery) || false)
      );

      return foundInImageDescriptions;
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
  const [isModalOpenQ, setIsModalOpenQ] = useState(false);
  const showModalQ = () => {
    setIsModalOpenQ(true);
    setShowCreateQuiz(true)
  };
  const handleOkQ = () => {
    setIsModalOpenQ(false);
  };
  const handleCancelQ = () => {
    setIsModalOpenQ(false);
  };
  useEffect(() => {
    handleSearch()
  }, [])


  return (
    <div >
      <nav id="nav" style={{ justifyContent: "space-between" }} >
        <div style={{}}>
          <img width={"100px"} style={{ marginTop: "-1rem" }} src={logo}></img>
        </div>
        <div style={{ display: "flex", marginRight: "30px", columnGap: "10px", marginTop: "0.8%" }}>
          <div><button className="NavButtonDes" onClick={onNotes}>
            MyNotes
          </button></div>
          <div>
            <Button className="NavButtonDes" type="primary" onClick={showModal}>
              Profile
            </Button>
            <Modal style={{}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Profile />
            </Modal>
          </div>

          <div>
            <Button className="NavButtonDes" type="primary" onClick={showModalS}>
              LogOut
              <RedoOutlined />
            </Button>
            <Modal open={isModalOpenS} onOk={handleOkS} onCancel={handleCancelS}>
              Want to go logout
              <Link to="/">
                Logout
              </Link>
            </Modal>

          </div>
          <div >
            <button className="NavButtonDes">
              <Link style={{ textDecoration: "none", color: "black" }} to="/Blog">Blog</Link>
            </button>
          </div>
        </div>

      </nav>
      <div style={{ display: "flex", justifyContent: "space-between" }}>

        <div>
          <Button style={{ marginTop: "6rem" }} className="buttondesign" type="primary" onClick={showModalQ} >
            Create Your Quiz
          </Button>
          <Modal open={isModalOpenQ} onOk={handleOkQ} onCancel={handleCancelQ}>
            <h3>Create Quiz</h3>
            {showCreateQuiz && <CreateQuiz globalemail={globalemail} setShowCreateQuiz={setShowCreateQuiz} />}
          </Modal>

          <ShowQuiz />

        </div>
        <div>

          <div>
            <div style={{ marginTop: "40px" }}>
              <input className="SearchDesign"
                type="text"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button id="SearchButton" onClick={handleSearch}><SearchOutlined id="SerachIcon" /></button>
              <button id="ResetButton" onClick={() => {
                setFilteredProfiles(profiles)
              }}><ReloadOutlined /></button>
              <div>
              </div>
              <div style={{ width: "100px", marginLeft: "100px", }}>
                <Button style={{ backgroundColor: "#f3bc3e" }} type="primary" onClick={showModalN} >
                  New Post
                </Button>
                <Modal style={{}} open={isModalOpenN} onOk={handleOkN} onCancel={handleCancelN}>
                  <Posts />
                </Modal>
              </div>
            </div>

          </div>
          <div>
            <ShowImages profilesToMap={profilesToMap} globalemail={globalemail} searchQuery={searchQuery} />
          </div>
        </div>

      </div>
      <Outlet />
    </div>

  );
};

export default Home;
