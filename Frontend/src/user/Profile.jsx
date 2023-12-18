import React, { useState, useEffect } from "react";
import { EditOutlined } from '@ant-design/icons'
import Type from "./Type.jsx"
import { Input } from "antd";



function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    // Fetch the user's profile data
    fetch("http://localhost:5000/Profile")
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);
  //Update a Profile
  // const formData={
  //   username:
  // }
  const handleUpdateProfile = (e) => {
    console.log()
    try {


    } catch (error) {

    }

  }


  return (
    <div style={{ width: '300px', height: "300px", padding: "40px", backgroundColor: "#d3b094" }}>
      {console.log(setUserProfile)}
      {userProfile && (
        <div>
          <div style={{ marginLeft: "4rem" }}><h2><Type String={[`Hii!  ${userProfile.username}`]} /></h2></div>
          <Input style={{ marginBottom: "0.5rem", marginTop: "1rem" }} value={userProfile.username} />
          <Input style={{ marginBottom: "0.5rem" }} value={userProfile.email} />
          <Input style={{ marginBottom: "0.5rem" }} value={userProfile.phone} />
          <Input style={{ marginBottom: "0.5rem" }} value={userProfile.college} />
          <button style={{ marginLeft: "6rem" }} className="buttondesign">Update</button>

        </div>
      )}
    </div>
  );
}

export default Profile;
