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
import { ShowImages } from "./ShowImages";
import CreateQuiz from "../admin/CreateQuiz";
import { ShowQuiz } from "./ShowQuiz";
import {SearchOutlined} from "@ant-design/icons"
import {ReloadOutlined}  from "@ant-design/icons"

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
  useEffect(() => {
    handleSearch()
  }, [])


  return (
    <div >
      <nav id="nav" style={{ justifyContent: "space-between" }} >
        <div style={{  }}>
          Tech PathShala
        </div>
        <div style={{ display: "flex", marginRight: "30px" }}>
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
            <Link to="/Blog">Blog</Link>
          </div>
        </div>

      </nav>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button style={{marginTop:"30px"}} className="buttondesign" onClick={() =>
            setShowCreateQuiz(true)
          }>Create Your Quiz</button>

          {showCreateQuiz && <CreateQuiz globalemail={globalemail} setShowCreateQuiz={setShowCreateQuiz} />}
          <ShowQuiz/>
        </div>
        <div>
          
          <div>
            <div style={{marginTop:"40px"}}> 
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
            <div style={{width:"100px",marginLeft:"100px",}}> 
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
            <ShowImages profilesToMap={profilesToMap} globalemail={globalemail} SetReportLink={SetReportLink} />
          </div>
        </div>

      </div>
      <Outlet />
    </div>

  );
};

export default Home;
