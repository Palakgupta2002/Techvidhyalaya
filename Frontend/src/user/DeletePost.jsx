import React from 'react';

const DeletePost = ({ globalEmail, selectedImageId }) => {
  console.log(globalEmail, "global");
  const handleDelete = async () => {
    const formData = {
      DEmail:globalEmail,
      ImageId:selectedImageId,
    }
    
    try {
      const response = await fetch("http://localhost:5000/DeletePost", {
        method: "DELETE",
        body:JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });

      if (response.ok) {
        alert("Post Deleted Successfully");
      } else {
        const data = await response.json(); // Parse the response for more information
        alert(`Unable to delete the post: ${data.error}`);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };
  

  return (
    <div>
      <h3 onClick={handleDelete}>Delete Post</h3>
    </div>
  );
};

export default DeletePost;