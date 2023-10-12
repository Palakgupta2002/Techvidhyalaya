import React, { useEffect, useState } from 'react';

const ShowBlog = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/ShowBlogs");
        if (response.ok) {
          const data = await response.json();
          setBlogsData(data);
        } else {
          console.error("Failed to fetch blog data.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (index) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        blogsData.map((item, index) => (
          <div style={{ width: "200px",border:"2px solid black" ,padding:"20px",backgroundColor:"#f3bc3e ",marginTop:"40px" }} key={index}>
            <h5>{item.Blogtitle}</h5>
            {item.Blogimage && item.Blogimage?.BcontentType && item.Blogimage?.Bdata ? (
              <img
                width={"200px"}
                height={"150px"}
                src={URL.createObjectURL(
                  new Blob([new Uint8Array(item.Blogimage.Bdata.data)], {
                    type: item.Blogimage?.BcontentType,
                  })
                )}
                alt={`Blog ${index}`}
              />
            ) : (
              <img width={"200px"} height={"150px"} src={require('./images/Blogs.jpeg')} alt={`Blog ${index}`} />
            )}
            <details
              style={{
                borderBottom: "2px solid red",
                padding: "10px",
                textAlign: "start",
                whiteSpace: expandedDescriptions[index] ? "normal" : "nowrap",
                overflow: "hidden",
              }}
            >
              <summary>
                {item.BlogDes}
              </summary>
              <p>{item.BlogDes}</p>
              <button onClick={() => toggleDescription(index)}>
                {expandedDescriptions[index] ? "Show Less" : "Show More"}
              </button>
            </details>
            <p>Post Date: {new Date(item.Blogdate).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowBlog;
