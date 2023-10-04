import React from 'react'
import Notes from './Notes.png'
import Footerimage from './Footerimage.png'
import Link from 'antd/es/typography/Link'
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();
  const Admin = () => {
    navigate("/Adlogin");
  }
  return (
    <div>
      <footer style={{ marginTop: "180px", border: "1px solid orange", height: "300px", backgroundColor: "#f3bc3e" }}>
        <div style={{ display: "flex", columnGap: "20px", justifyContent: "space-between" }}>
          <div style={{ width: "100px", height: "100px", marginTop: "-60px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 400px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -50px, rgba(80, 37, 164, 0.35) 0px -2px 6px 0px inset" }}><img width={"500px"} src={Footerimage} /> </div>
          <div style={{ width: "100px", height: "100px", marginTop: "-50px" }}><img width={"100px"} src={Notes} /></div>
          <div style={{ width: "100px", height: "100px" }}></div>
        </div>
        <div style={{ display: "flex", columnGap: "20px", justifyContent: "space-between" }}>
          <div style={{ height: "100px", marginTop: "80px" }}><ul style={{ listStyle: "none", }}>
            <li>About</li>
            <li>Gole ka mandir</li>
            <li>Suppot@gmail.com</li>
            <li>909045673</li>
          </ul></div>
          <div style={{ width: "100px", height: "100px", marginLeft: "30px" }}>
            <ul style={{ listStyle: "none" }}>
              <li>hihi</li>
              <li>hi</li>
              <li>hi</li>
              <li>hi</li>
            </ul>
          </div>
          <div style={{ width: "100px", height: "100px", marginTop: "-100px" }}>
            <ul style={{ listStyle: "none" }}>
              <li>hihi</li>
              <li>hi</li>
              <li>hi</li>
              <li>hi</li>
            </ul>
          </div>
          <div style={{ width: "100px", height: "100px", marginTop: "-100px" }}>
            <ul style={{ listStyle: "none" }}>
              <li>About</li>
              <li><button onClick={Admin}>Admin Login</button></li>
              <li>hi</li>
              <li>hi</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}




export default Footer