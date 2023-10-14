import React, { useEffect, useState } from 'react';
import TextTruncate from 'react-text-truncate'; // recommend
import { Button, Modal } from 'antd';

const ShowBlog = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginLeft: "2rem", marginRight: "2rem", marginTop: "4rem" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        blogsData.map((item, index) => (
          <>
            <div className='BlogCard'>
              <h3>{item?.Blogtitle || "Blog"}</h3>
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
              <p>
                <TextTruncate
                  line={2.9}
                  element="span"
                  truncateText="…...."
                  text={item.BlogDes}
                  textTruncateChild={<div>
                    <Button className="buttondesign" type="primary" onClick={() => showModal(item)}>
                      Read More
                    </Button>
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <h3>{selectedItem?.Blogtitle || "Blog"}</h3>
                      {selectedItem?.Blogimage && selectedItem?.Blogimage?.BcontentType && selectedItem?.Blogimage?.Bdata ? (
                        <img
                          width={"200px"}
                          height={"150px"}
                          src={URL.createObjectURL(
                            new Blob([new Uint8Array(selectedItem.Blogimage.Bdata.data)], {
                              type: selectedItem?.Blogimage?.BcontentType,
                            })
                          )}
                          alt={`Blog ${index}`}
                        />
                      ) : (
                        <img width={"200px"} height={"150px"} src={require('./images/Blogs.jpeg')} alt={`Blog ${index}`} />
                      )}
                      <p>{selectedItem?.BlogDes}</p>
                    </Modal>

                  </div>}
                />
              </p>
              <span>{`Creation date ${new Date(item.Blogdate).toLocaleString()}`}</span>

            </div>
          </>

        ))
      )}
    </div>
  );
};

export default ShowBlog;