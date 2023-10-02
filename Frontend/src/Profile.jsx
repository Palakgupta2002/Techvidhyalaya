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

  return (
    <div>
      {console.log(setUserProfile)}
      {userProfile && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userProfile.username}<EditOutlined /></p>
          <p>College: {userProfile.college}<EditOutlined/></p>
          <p>Email: {userProfile.email}<EditOutlined/></p>
          <p>Phone: {userProfile.phone}<EditOutlined/></p>
        </div>
      )}
    </div>
  );
}

export default Profile;
