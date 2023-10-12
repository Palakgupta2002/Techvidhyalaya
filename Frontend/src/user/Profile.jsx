import React, { useState, useEffect } from "react";
import { EditOutlined } from '@ant-design/icons'




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
  const handleUpdateProfile=()=>{
    try{


    }catch(error){

    }

  }


  return (
    <div style={{border:"2px solid red",width:'300px',height:"300px",padding:"40px "}}>
      {console.log(setUserProfile)}
      {userProfile && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userProfile.username}<EditOutlined onClick={handleUpdateProfile} /></p>
          <p>College: {userProfile.college}<EditOutlined onClick={handleUpdateProfile}/></p>
          <p>Email: {userProfile.email}<EditOutlined onClick={handleUpdateProfile}/></p>
          <p>Phone: {userProfile.phone}<EditOutlined onClick={handleUpdateProfile}/></p>
        </div>
      )}
    </div>
  );
}

export default Profile;
