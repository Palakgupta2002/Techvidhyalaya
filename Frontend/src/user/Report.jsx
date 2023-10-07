import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useContext, useState } from 'react';
import context from './context';

const Report = ({ offendemail }) => {
  const { globalEmail } = useContext(context);
  const [reportmaker,setreportmaker]=useState(globalEmail)
  console.log(globalEmail, "hello report");
  console.log(offendemail, "successfully");
  const handlechangereport=(e)=>{
    setreportmaker(e.target.value)
  }

  return (
    <div>
      <form>
        <Input
          name="ReportMakerEmail"
          placeholder='Report Maker Email'
          value={reportmaker}
          onChange={handlechangereport}
        />
        <Input
          name="OffenderEmail"
          placeholder='Offender Email'
          value={offendemail.offendemail} 
        />
        <TextArea name='ReportDesc' placeholder='Report Description' />
      </form>
    </div>
  );
};

export default Report;
