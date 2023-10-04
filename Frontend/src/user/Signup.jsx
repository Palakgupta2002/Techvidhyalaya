import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./Signup.css";
import Forgetpas from "./Forgetpas";

const Signup = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/Signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.message === "User registered successfully") {
          message.success("Signup successful");
          setIsModalOpen(false);
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

  return (
    <div className="signupBox">
      <div className="formSection">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Username"
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

          <Form.Item
            label="College"
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

          <Form.Item
            label="Email-id"
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
            <Input className="inputbox" />
          </Form.Item>

          <Form.Item
            label="Phone no."
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

          <Form.Item
            label="Password"
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
            <Button className="button" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Forgetpas />
      </div>
    </div>
  );
};

export default Signup;
