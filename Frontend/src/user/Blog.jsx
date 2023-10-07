import React, { useState } from 'react';
import { BlogCreate } from './BlogCreate';
import { useContext } from 'react';
import context from "./context";
import { Modal, Button } from 'antd';
import ShowBlog from './ShowBlog';

const Blog = () => {
  const { globalEmail, setGlobalEmail } = useContext(context);
  const [email, setusername] = useState("");
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <nav id='nav'>
        <div>TechPathshala</div>
      </nav>
      <div>
        <div style={{ display: "flex",marginTop:"20px",columnGap:"30px" }}>
          
        
        <div>
          <Button type="primary" onClick={showModal} style={{backgroundColor:"#f3bc3e",borderTopRightRadius:"80px",marginLeft:"30px"}}>
            Create Yours One
          </Button>
          <Modal
            title="Create a Blog"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <BlogCreate />
          </Modal>
        </div>
        
      </div>
      <div><ShowBlog/></div>
      </div>
    </div>
  );
}

export default Blog;
