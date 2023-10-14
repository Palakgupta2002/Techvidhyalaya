import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';

const CreateQuiz = ({ AdminLogin ,setShowCreateQuiz}) => {
  const [formData, setFormData] = useState({
    Question: '',
    Option1: '',
    Option2: '',
    Option3: '',
    Option4: '',
    Qemail: AdminLogin,
    Answer: 'Answer', // Initialize Answer with an empty string
  });

  const options = [
    { value: 'Option1', label: 'Option1' },
    { value: 'Option2', label: 'Option2' },
    { value: 'Option3', label: 'Option3' },
    { value: 'Option4', label: 'Option4' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAnswerChange = (value) => {
    setFormData({
      ...formData,
      Answer: value, // Set the selected value as the Answer
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/CreateQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });

      if (response.status === 200) {
        alert('Post created successfully');
      } else {
        alert(
          'Post creation failed. Please make sure your file size is less than 2MB.'
        );
        console.log(await response.text());
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred');
    }
    setShowCreateQuiz(false)
  };

  return (
    <div style={{padding:"10px"}}>
      <form onSubmit={handleSubmit} >
        <Input style={{marginBottom:"0.8rem"}}
          name="Question"
          value={formData.Question}
          placeholder="Write Your Question Here"
          onChange={handleInputChange}
        />
        <Input style={{marginBottom:"0.8rem"}}
          name="Option1"
          value={formData.Option1}
          placeholder="Write Your First Option"
          onChange={handleInputChange}
        />
        <Input style={{marginBottom:"0.8rem"}}
          name="Option2"
          value={formData.Option2}
          placeholder="Write Your Second Option"
          onChange={handleInputChange}
        />
        <Input style={{marginBottom:"0.8rem"}}
          name="Option3"
          value={formData.Option3}
          placeholder="Write Your Third Option"
          onChange={handleInputChange}
        />
        <Input style={{marginBottom:"0.8rem"}}
          name="Option4"
          value={formData.Option4}
          placeholder="Write Your Fourth Option"
          onChange={handleInputChange}
        />
        <Select style={{marginBottom:"0.8rem"}}
          name="Answer"
          value={formData.Answer}
          onChange={handleAnswerChange} // Use handleAnswerChange for the Select component
          options={options}
          
        />
        <Button className="buttondesign" type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateQuiz;
