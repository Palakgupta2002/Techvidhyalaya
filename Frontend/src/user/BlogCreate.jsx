import React, { useState } from 'react';
import Blog from '../user/images/Blogs.jpeg';
import { Select } from 'antd';

export const BlogCreate = () => {
  const [Blogimage, setimage] = useState(Blog); // Initialize with default image
  const [BlogDescription, setdesc] = useState('');
  const [Blogemail, setemail] = useState('');
  const [selectedOption, setSelectedOption] = useState("Choose a title   ");

  const options = [
    { value: "Programming", label: "Programming" },
    { value: "Placement", label: "Placement" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile App Development", label: "Mobile App Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "DevOps", label: "DevOps" },
    { value: "IoT (Internet of Things)", label: "IoT (Internet of Things)" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Game Development", label: "Game Development" },
    { value: "Database Management", label: "Database Management" },
    { value: "Frontend Development", label: "Frontend Development" },
    { value: "Backend Development", label: "Backend Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Robotics", label: "Robotics" },
    { value: "Networking", label: "Networking" },
    { value: "Operating Systems", label: "Operating Systems" },
    { value: "Algorithms and Data Structures", label: "Algorithms and Data Structures" },
  ];

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handlechangeimg = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB.');
      } else {
        setimage(selectedFile);
      }
    } else {
      // User didn't select a new image, use the default image
      setimage(Blog);
    }
  };


  const handlechangedesc = (e) => {
    setdesc(e.target.value);
  };

  const handlechangetit = (e) => {
    setemail(e.target.value);
  };

  const formData = new FormData();
  formData.append('Blogimage', Blogimage);
  formData.append('BlogDescription', BlogDescription);
  formData.append('BlogEmail', Blogemail);
  formData.append('Blogtitle', selectedOption);


  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission


    try {
      const currentDate = new Date().toISOString();
      formData.append('BlogDate', currentDate);
      const response = await fetch('http://localhost:5000/BlogCreation', {
        method: 'POST',
        body: formData,
        headers: {
          // No need to set the "Content-Type" header when using FormData
        },
      });

      if (response.status === 200) {
        alert('Post Creation Successfully');
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      console.log('Internal Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input type="file" name="Blogimage" onChange={handlechangeimg} />
        <textarea
          className="textarea"
          placeholder="Write a Blog"
          name="BlogDescription"
          onChange={handlechangedesc}
          style={{ color: 'black', fontFamily: 'sans-serif', fontSize: '15px' }}
        />
        <input
          type="text"
          defaultValue="test@gmail.com"
          name="Blogemail"
          onChange={handlechangetit}
          placeholder="Title Of Your Post"
        />
        <br></br>
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          options={options}

        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};
