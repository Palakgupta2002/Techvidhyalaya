import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "antd/es/input/Input";
import context from "./context";
import logo from "../user/images/Ever.png"
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
          navigate("/");
          alert("Invalid username or Password")
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setGlobalEmail(user.lemail);
  };

  return (
    <div style={{width:"40rem",height:"20rem",display:"flex"}}>
      {/* This is a Form  */}
      <div className="loginimage" style={{width:"50%"}} ><img width={"350px"} src={logo}></img></div>
      <div style={{width:"50%",padding:"15px"}}>
      <h1 style={{marginLeft:"8rem"}}>Login</h1>
      <form style={{width:"100%"}} onSubmit={handleSubmit}>
        <label style={{}}>Username</label>
        
        <Input style={{marginTop:"0.5rem",marginBottom:"0.5rem"}}
          type="email"
          name="lemail"
          placeholder="Enter your username"
          onChange={handlechange}
        />
        
        <label >Password</label>
        
        <Input style={{marginTop:"0.5rem",marginBottom:"0.5rem"}}
          type="text"
          name="lpassword"
          placeholder="Enter your Password"
          onChange={handlechange}
        />
        <br></br>
        <button type="submit" style={{marginLeft:"2rem",marginTop:"2rem",width:"70%"}} className="buttondesign">submit</button>
      </form>
      </div>
    </div>
  );
};
export default Login;
