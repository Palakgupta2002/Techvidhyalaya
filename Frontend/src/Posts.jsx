import React, { useContext, useState } from "react";
import context from "./context";

const Posts = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(""); // Add a state for the title
  const { globalEmail, setpostcreate } = useContext(context);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      // Check if the selected file size is greater than 2MB (2 * 1024 * 1024 bytes)
      alert("File size should be less than 2MB.");
    } else {
      setImage(selectedFile);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to create a post.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title); // Add title to the FormData
    formData.append("email", globalEmail);
    try {
      const response = await fetch("http://localhost:5000/CreatePost", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Post created successfully");
        setpostcreate(true);
      } else {
        alert(
          "Post creation failed. Please make sure your file size is less than 2MB."
        );
        console.log(await response.text());
        setpostcreate(false);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handlePostSubmit}>
        <input type="file" name="image" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter a title for your post"
          value={title}
          onChange={handleTitleChange}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default Posts;
