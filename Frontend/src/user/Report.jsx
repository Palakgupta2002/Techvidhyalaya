import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useContext, useState } from 'react';
import context from './context';

const Report = ({ offendemail, ReportImageLink }) => {
  const { globalEmail } = useContext(context);
  const [reportmaker, setReportmaker] = useState(globalEmail);
  const [reportdesc, setReportdesc] = useState('');
  console.log(ReportImageLink)

  const handleReportmakerChange = (e) => {
    setReportmaker(e.target.value);
  };

  const handleReportdescChange = (e) => {
    setReportdesc(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(offendemail)

    // const formData = new FormData();
    // if(reportmaker && offendemail?.offendemail && reportdesc && ReportImageLink.ReportImageLink)
    // formData.append("ReportMakerEmail", reportmaker);
    // formData.append("OffenderEmail", offendemail.offendemail); // Updated here
    // formData.append("ReportDesc", reportdesc);
    // formData.append("ReportLink", ReportImageLink.ReportImageLink); // Updated here
    // console.log(formData,"formdata")
    // {
    //   "ReportMakerEmail": "pg948303@gmail.com",
    //   "OffenderEmail": "pg948303@gmail.com",
    //   "ReportLink": "hiiisakndahdsknadbasj",
    //   "ReportDesc": "Report description"
    // }
    let formData = {
      ReportMakerEmail:reportmaker ,
      OffenderEmail: offendemail.offendemail,
      ReportLink:String(ReportImageLink), 
      ReportDesc: reportdesc

    }
    try {
      const response = await fetch('http://localhost:5000/ReportCreation', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
          "Content-Type":"application/json"

        },
      });
      

      if (response.status === 200) {
        alert('Report created successfully');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log('Internal Error:', error);
    }
  };
  console.log(ReportImageLink,"image")

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <Input
          name="ReportMakerEmail"
          placeholder="Report Maker Email"
          value={reportmaker}
          onChange={handleReportmakerChange}
        />
        <Input
          name="OffenderEmail"
          placeholder="Offender Email"
          value={offendemail} // Updated here
        />
        <TextArea
          name="ReportDesc"
          placeholder="Report Description"
          value={reportdesc}
          onChange={handleReportdescChange}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Report;
