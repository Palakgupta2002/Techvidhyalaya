// RouterMeetup.jsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Layout from "./Layout";
import Home from "./Home";
import Profile from "./Profile";
import Posts from "./Posts";
import Signup from "./Signup";
import context from "./context";
import MyNotes from "./MyNotes";
import { Adlogin } from "../admin/Adlogin";
import AdminHome from "../admin/AdminHome";
import Report from "./Report";
import Blog from "./Blog";
import CreateQuiz from "../admin/CreateQuiz";

const RouterMeetup = () => {
  const [globalEmail, setGlobalEmail] = useState(null);
  const [AdminLogin,SetAdminlogin]=useState(null)
  const [postcreate, setpostcreate] = useState(false);
  return (
    <context.Provider
      value={{ setGlobalEmail: setGlobalEmail, globalEmail: globalEmail, postcreate: postcreate, setpostcreate: setpostcreate,AdminLogin:AdminLogin,SetAdminlogin:SetAdminlogin }}

    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/Home" element={<Home />}>
            <Route path="Profile" element={<Profile />} />
            <Route path="Posts" element={<Posts />} />

          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/MyNotes" element={<MyNotes />} />
          <Route path="/Adlogin" element={<Adlogin />} />
          <Route path="/AdHome" element={<AdminHome />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Report" element={<Report/>}/>
         </Routes>
      </BrowserRouter>
    </context.Provider>
  );
};

export default RouterMeetup;
