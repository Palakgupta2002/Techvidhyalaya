import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShowImages } from "../user/ShowImages";
import { useContext } from "react";
import context from "../user/context";
import CreateQuiz from "./CreateQuiz";
import { BlogCreate } from "../user/BlogCreate";
import ReportPage from "./ReportPage";
import { Button, Modal } from "antd";

const Home = () => {
  const { AdminLogin } = useContext(context)
  const [profiles, setProfiles] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedLink, setSelectedLink] = useState("");
  const [searchquery, selectsearchquery] = useState("Programming");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/Profiles")
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  const handleItemClick = (email, link) => {
    setSelectedEmail(email);
    setSelectedLink(link);
  };

  const [isModalOpenQ, setIsModalOpenQ] = useState(false);
  const showModalQ = () => {
    setIsModalOpenQ(true);

  };
  const handleOkQ = () => {
    setIsModalOpenQ(false);
  };
  const handleCancelQ = () => {
    setIsModalOpenQ(false);
  };
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      {/* <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        <div><button onClick={() => { selectsearchquery("College") }}>College</button></div>
        <div><button onClick={() => { selectsearchquery("Programming") }} >Programming</button></div>
        <div><button onClick={() => { selectsearchquery("Placement") }}>Placement</button></div>
       <CreateQuiz Adminlogin={AdminLogin}/>
       <BlogCreate/>
       
      </div> */}
      {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
         <ShowImages  profilesToMap={profiles} globalemail={AdminLogin}  searchQuery={searchquery}/>
        </div>
      </div> */}
      <div style={{ display: "flex", justifyContent: 'center', gap: "20px", marginTop: "2rem" }}> <div>
        <Button className="buttondesign" type="primary" onClick={showModalQ} >
          Create Your Quiz
        </Button>
        <Modal open={isModalOpenQ} onOk={handleOkQ} onCancel={handleCancelQ}>
          <h3>Create Quiz</h3>
          <CreateQuiz globalemail={"anshu_chaturvedi@mitsgwalior.in"} />
        </Modal>
      </div>
        <div>
          <Button className="buttondesign" type="primary" onClick={showModal} style={{}}>
            Create Blog
          </Button>
          <Modal
            title="Create a Blog"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <BlogCreate />
          </Modal>
        </div>
      </div>
      <ReportPage />
    </div>
  );
};

export default Home;
