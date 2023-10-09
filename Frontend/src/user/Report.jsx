import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useContext, useState } from 'react';
import context from './context';

const Report = ({ offendemail, ReportImageLink }) => {
  const {globalEmail} = useContext(context);
  const [reportmaker, setReportmaker] = useState(globalEmail);
  const [reportdesc, setReportdesc] = useState('');

  const handleReportmakerChange = (e) => {
    setReportmaker(e.target.value);
  };

  const handleReportdescChange = (e) => {
    setReportdesc(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ReportMakerEmail", reportmaker);
    formData.append("OffenderEmail", offendemail.offendemail); // Updated here
    formData.append("Reportdesc", reportdesc);
    formData.append("ReportLink", ReportImageLink.ReportImageLink); // Updated here
    console.log(formData,"formdata")

    try {
      const response = await fetch('http://localhost:5000/ReportCreation', {
        method: 'POST',
        body: formData,
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
