import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./Signup.css";
import {  Checkbox } from 'antd';
import logo from "../user/images/Ever.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import context from "./context";

const Signup = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { globalEmail, setGlobalEmail } = useContext(context);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/Signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
       
      }
      
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data.message === "User registered successfully") {
          message.success("Signup successful");
          setIsModalOpen(false);
          navigate("/Home");
          // Reset the form
          form.resetFields();
        } else {
          message.error("User already exists");
        }
      } else {
        message.error("Failed to register user");
      }
    } catch (error) {
      console.error(error);
    }
    
  };
  console.log(globalEmail,"hello")

  return (
   
    <div className="login-page">
      
        <div className="illustration-wrapper">
          <img  src={logo} alt="Login" />
        </div>
        
        <Form className="form" form={form} onFinish={handleSubmit} >
          <h1 style={{marginLeft:"8rem"}}>Signup</h1>
          <label className="label">Username</label>
          <Form.Item
            
            name="username"
            rules={[
              {
                required: true,
                message: "Username is required",
              },
            ]}
          >
            <Input className="inputbox" />
          </Form.Item>
          <label>College</label>
          <Form.Item
           
            name="college"
            rules={[
              {
                required: true,
                message: "College name is required",
              },
            ]}
          >
            <Input className="inputbox" />
          </Form.Item>
          <label>Email-ID</label>
          <Form.Item
           
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Invalid email address",
              },
            ]}
          >
            <Input onChange={(e)=>{setGlobalEmail(e.target.value)}} className="inputbox" />
          </Form.Item>
          <label>Phone no</label>
          <Form.Item
           
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone number is required",
              },
              {
                pattern: /^\d{10}$/,
                message: "Invalid phone number",
              },
            ]}
          >
            <Input className="inputbox" />
          </Form.Item>
          <label>Password</label>
          <Form.Item
           
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password className="inputbox" />
          </Form.Item>

          <Form.Item>
            <Button style={{marginLeft:"8rem"}} className="buttondesign" type="primary" htmlType="submit">
              Signup
            </Button>
          </Form.Item>
        </Form>
       
      
    </div>
  );
};

export default Signup;
