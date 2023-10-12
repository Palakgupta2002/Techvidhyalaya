import React, { useContext, useState } from "react";
import context from "./context";
import { PlusOutlined } from "@ant-design/icons";
import Select from "react-select";

const Posts = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const { globalEmail, setpostcreate } = useContext(context);
  const [selectedOption, setSelectedOption] = useState(null); 

  const options = [
    { value: "College Notes", label: "College Notes" },
    { value: "Programming", label: "Programming" },
    { value: "Placement", label: "Placement" },
  ];

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    
      setImage(selectedFile);
    
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image to create a post.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", title);
    formData.append("email", globalEmail);
    formData.append("selectedOption",selectedOption.value ); // Use the same key as in the backend

  
    

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
        <textarea
          className="textarea"
          placeholder="Enter a title for your post"
          value={title}
          onChange={handleTitleChange}
        />
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

export default Posts;
