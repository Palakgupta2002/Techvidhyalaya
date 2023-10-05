import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShowImages } from "../user/ShowImages";
import { useContext } from "react";
import context from "../user/context";
import CreateQuiz from "./CreateQuiz";

const Home = () => {
  const {AdminLogin}=useContext(context)
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
  console.log(selectedEmail, selectedLink);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        <div><button onClick={() => { selectsearchquery("College") }}>College</button></div>
        <div><button onClick={() => { selectsearchquery("Programming") }} >Programming</button></div>
        <div><button onClick={() => { selectsearchquery("Placement") }}>Placement</button></div>
       <CreateQuiz Adminlogin={AdminLogin}/>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* <div>
         <ShowImages searchQuery={searchquery} profilesToMap={profiles}/>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
