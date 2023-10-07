import React, { useEffect, useState } from 'react';

const ShowBlog = () => {
  const [BlogsData, setBlogsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/ShowBlogs");
        if (response.ok) {
          const data = await response.json();
          setBlogsData(data);
        } else {
          console.log("Failed to fetch blog data.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {BlogsData.map((item, index) => (
        <img
          key={index}
          src={`data:${item.Blogimage.contentType};base64,${btoa(
            String.fromCharCode(...new Uint8Array(item.Blogimage.Bdata))
          )}`}
          alt={`Blog ${index}`}
        />
      ))}
    </div>
  );
};

export default ShowBlog;
