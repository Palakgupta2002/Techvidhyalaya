import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import context from "./context";
export const Login = () => {
  const [user, setuser] = useState({});
  const { globalEmail, setGlobalEmail } = useContext(context);
  const navigate = useNavigate();
  function handlechange(e) {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/Login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/Home");
        } else if (res.status !== 200) {
          navigate("/Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setGlobalEmail(user.lemail);
  };

  return (
    <div>
      {/* This is a Form  */}
      <p>Login</p>
      <form style={{width:"100%"}} onSubmit={handleSubmit}>
        <label>Username</label>
        <br></br>
        <input
          type="email"
          name="lemail"
          placeholder="Enter your username"
          onChange={handlechange}
        />
        <br></br>
        <label>Username</label>
        <br></br>
        <input
          type="text"
          name="lpassword"
          placeholder="Enter your Password"
          onChange={handlechange}
        />
        <br></br>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default Login;
