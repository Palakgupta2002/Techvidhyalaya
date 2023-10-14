import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import logo from "../user/images/Ever.png";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import context from "../user/context"

export const Adlogin = () => {
  const { AdminLogin,SetAdminlogin} = useContext(context);
  
  const [form] = Form.useForm(); 
  const [user, setuser] = useState({});
 // Initialize form values
  const navigate = useNavigate();
  function handlechange(e) {
    
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    
    });
    SetAdminlogin(user.email)
    e.preventDefault();
    
  }
  
  console.log(AdminLogin,"hello")

  const handleSubmit = async () => { // Changed function name to handleSubmit
    try {
      const response = await fetch("http://localhost:5000/AdminLogin", {
        method: "POST",
        body: JSON.stringify(user), // Send the form values
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        navigate("/AdHome");
      } else if (response.status !== 200) {
        navigate("/AdLogin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div style={{marginTop:"4rem"}} className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={logo} alt="Login" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          form={form}
        >
          <p className="form-title">Welcome back</p>
          <p> Admin Dashboard</p>
          <Form.Item
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              name="email"
              placeholder="Username"
              style={{ outline: "none !important" }}
              onChange={handlechange} // Call handleChange when input changes
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              name="password"
              placeholder="Password"
              onChange={handlechange} // Call handleChange when input changes
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="custom-checkbox">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
