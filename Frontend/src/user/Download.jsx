import React, { useState } from 'react';
import { DownloadOutlined  } from '@ant-design/icons';
import Report from './Report';
import { Modal, Button } from 'antd';


function Download() {
  const [isModalVisible, setIsModalVisible] = useState(false);
 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  

  const onButtonClick = () => {
    // Using JavaScript method to get PDF file
    fetch('SamplePDF.pdf')
      .then((response) => {
        response.blob().then((blob) => {
          // Creating a new object of the PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'TechVidhyalay.pdf';
          alink.click();
        });
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
     
      <div>
        <button className='buttondesign' onClick={onButtonClick}><DownloadOutlined /></button>
      </div>
     
    </div>
  );
}

export default Download;
