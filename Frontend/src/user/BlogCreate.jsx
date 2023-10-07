import React, { useState } from 'react';
import Blog from './Blog.jpeg';

export const BlogCreate = () => {
  const [Blogimage, setimage] = useState(Blog); // Initialize with default image
  const [BlogDescription, setdesc] = useState('');
  const [Blogemail, setemail] = useState('');

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

  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};
