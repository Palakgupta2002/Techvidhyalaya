import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useState } from 'react'

 const Report = () => {

  return (
    <div>
        <form>
            <Input name="ReportMakerEmail" placeholder='ReportMakerEmail'></Input>
            <Input name="OffenderEmail" placeholder='Offender Email'></Input>
            <TextArea name='ReportDesc' placeholder='Report Description'></TextArea>
        </form>
    </div>
  )
}
export default Report;
