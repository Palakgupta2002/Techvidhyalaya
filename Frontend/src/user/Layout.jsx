import React from 'react';
import 'reactjs-popup/dist/index.css';
import Login from "./login"
import Signup from "./Signup"
import { Button, Modal } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import logo from "./images/Ever.png"
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Type from './Type';
// import Carousel from 'react-spring-3d-carousel';
const Layout = () => {
  const [background, setbackground] = useState("#f3bc3e")
  const [onclicktrue, setonclicktrue] = useState(false)
  const navigate = useNavigate();
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const stringsQ = [
    "Unleash Your Inner Quizmaster!",
    "Quiz Time: Challenge Accepted!",
    "Elevate Your Knowledge, One Quiz at a Time.",
    "Knowledge is Power, Play to Empower!",
    "Quiz It Up: Where Learning Meets Fun.",
    "Test Your Wits with Our Exciting Quizzes.",
    "Dive into the World of Quizzes & Discover!",
    "Join the Quiz Revolution – Are You Ready?",
    "Quizzes: Where Curiosity Meets Entertainment.",
    "Sharpen Your Mind, Play a Quiz Today!",
  ]
  const stringsB = [
    "Tech Notes: Where Knowledge Meets Innovation.",
    "Empower Your Tech Journey with Notes.",
    "Explore, Learn, and Share Tech Insights.",
    "Tech Enthusiasts Unite: Create and Contribute.",
    "Notes for the Tech-Savvy Mind.",
    "From Ideas to Innovation: Start with Notes.",
    "Elevate Your Tech Game, One Note at a Time.",
    "Connecting Tech Minds, One Note Sharing.",
    "Tech Notes: Fueling Creativity, Igniting Ideas.",
    "Build, Collaborate, and Innovate with Tech Notes."
  ]
  const stringsP = [
    "Navigating the Tech World Together.",
    "Explore Blogs, Ace Quizzes, and More!",
    "Your Gateway to Success: Placement Tips & More.",
    "Unlock the Secrets of College Life and Beyond.",
    "Code, Learn, and Excel with Us.",
    "Discover Career Opportunities, One Click Away.",
    "Simplify Your Journey to Tech Excellence.",
    "From Campus to Career: We've Got You Covered.",
    "Your Source for Programming Wisdom.",
    "Tech Enthusiasts' Hub: Join the Conversation.",
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isLogin, setLogin] = useState(false);
  const showLogin = () => {
    setLogin(true);
  };
  const handleokLogin = () => {
    setLogin(false);
  };
  const handleLogin = () => {
    setLogin(false);
  };
  const Admin = () => {
    navigate("/Adlogin");
  }
  return (
    <div>
      <div>

        <nav className='nav'>
          <div style={{ marginTop: "-20px", }} ><img width={"140px"} src={logo} /></div>

          <ul style={{ display: "flex", listStyle: "none", columnGap: "20px" }}>
            <li>

              <Button style={{ backgroundColor: "#f3bc3e" }} type="primary" onClick={showModal}>
                SignUp
              </Button>
              <div >
                <Modal centered width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                  < Signup setIsModalOpen={setIsModalOpen} />
                </Modal>
              </div>
            </li>
            <li >
              <Button style={{ backgroundColor: "#f3bc3e" }} type="primary" onClick={showLogin}>
                Login
              </Button>
              <Modal centered width={"500px"} open={isLogin} onOk={handleokLogin} onCancel={handleLogin}>
                <Login />
              </Modal>
            </li>
            <li>
            <button className='buttondesign' onClick={Admin}>Admin</button>
            </li>
          </ul>
        </nav>

        <div className='displayscn' >
          <div style={{ width: "50%", height: "100%", display: "flex", columnGap: "1rem", backgroundColor: "#d3b094" }}>
            <div className='Layoutcard' style={{ backgroundColor: "#febf05", marginLeft: "0.8rem" }}>
              <h1>Quiz</h1>
              <div class="typeeffect" >
                <Type String={stringsQ} deleteSpeed={50} />
              </div>

            </div>
            <div className='Layoutcard' style={{ backgroundColor: "#febf05" }}>
              <h2>Read Blogs</h2>
              <div class="typeeffect">
                <Type String={stringsB} deleteSpeed={70} />
              </div>

            </div>
            <div className='Layoutcard' style={{ backgroundColor: "#febf05" }}>
              <h2>Notes</h2>
              <div class="typeeffect">
                <Type String={stringsP} deleteSpeed={40} />
              </div>

            </div>

          </div>

          <div>
            <img src={logo}></img>
            <button style={{ width: "100px" }} className='buttondesign' onClick={()=>{
              alert("Please Signup or login First")
            }} > Let's Begin <ArrowRightOutlined /></button>
            
          </div>


        </div>

      </div>


    </div>
  );
}

export default Layout;



