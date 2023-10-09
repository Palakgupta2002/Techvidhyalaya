import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import Report from './Report';
import { Modal, Button } from 'antd';

function Download(offendemail,ReportImageLink) {
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
        <button className='buttondesign' onClick={onButtonClick}>Download</button>
      </div>
      <div>
        <Button className='buttondesign' type="primary" onClick={showModal}>
          More <MoreOutlined />
        </Button>
        <Modal
          title="Report about The Post"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <button onClick={()=>{}}>
            <Report offendemail={offendemail} ReportImageLink={ReportImageLink}/>
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Download;
