import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import 'reactjs-popup/dist/index.css';
import Slider from "react-slick";
import Login from "./login"
import Signup from "./Signup"
import { Button, Modal } from 'antd';
import { useState } from 'react';
import logo from "./Ever.png"
import Banner from "./Banner1.png"
import Banner1 from "./Banner2.png"
import Banner2 from "./Banner3.png"
import Banner3 from "./Banner4.png"
import Banner4 from "./Banner5.png"
import Banner5 from "./Banner3.png"
import { useNavigate } from 'react-router-dom';
const Layout = () => {
  const navigate = useNavigate();
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1
  };
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
              <div className="signupbox">
                <Modal centered width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                  <div className="signupcontent">
                    <div className="imagesection"></div>
                    <div className="signupsection">
                      < Signup setIsModalOpen={setIsModalOpen} />
                    </div>
                  </div>
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
          </ul>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: "60px" }}>
          <div className='popupimages'></div>
          <div style={{ width: "70%", height: "200px" }}> <Slider {...settings}>
            <div>
              <img width={"900px"} height={"400px"} src={Banner} />
            </div>
            <div>
              <img width={"900px"} height={"400px"} src={Banner1} />
            </div>
            <div>
              <img width={"900px"} height={"400px"} src={Banner2} />
            </div>
            <div>
              <img width={"900px"} height={"400px"} src={Banner3} />
            </div>
            <div>
              <img width={"900px"} height={"400px"} src={Banner4} />
            </div>
            <div>
              <img width={"900px"} height={"400px"} src={Banner5} />
            </div>
          </Slider>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>


    </div>
  );
}

export default Layout;
