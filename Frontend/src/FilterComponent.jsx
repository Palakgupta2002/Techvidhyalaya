import { Input } from 'antd'
import React, { useState } from 'react'

const FilterComponent = ({ data, setFilterData }) => {
  const [searchvalue, setsearchvalue] = useState("");
 
  
  const handlesearch = () => {
    const filteredData = data.filter((item) => {
      // Check if item has a 'description' property and if it includes the search value
      return item.image.description && item.image.description.includes(searchvalue);
    });
    setFilterData(filteredData);
  };
  
  return (
    <div>
      <div style={{display:"flex"}}>
      <div><Input
        value={searchvalue}
        onChange={(e) => {
          setsearchvalue(e.target.value)
        }}
        placeholder='Search Here' /></div>
        <div><button onClick={handlesearch}>Search</button></div>
        </div>
      <div>titte</div>
    </div>
  )
}
export default FilterComponent
