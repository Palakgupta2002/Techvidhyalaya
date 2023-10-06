// Assuming you've imported necessary modules and set up your server properly

// Define the Quiz model


// Your ShowQuiz component
import React, { useEffect, useState } from 'react';

export const ShowQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [UserAns,SetUserAns]=useState("");
  const[Answer,SetAnswer]=useState("");
  const [BackgroundChange,SetBackgroundChange]=useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/ShowQuiz");
        if (response.ok) {
          const data = await response.json();
          setQuizData(data);
        } else {
          console.log("Failed to fetch quiz data.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      {quizData.map((quiz, index) => (
        <div key={index}>
          <div className='QuizCard'>
          <h2 style={{borderBottom:"2px solid black"}}>Question: {quiz.Question}</h2>
          <ul style={{listStyle:"none",paddingRight:"40px"}}>
            <li><button className='OptionStyle'   onClick={()=>{
              SetUserAns("Option1")
            }}>Option1: {quiz.Option1}</button></li>
            <li><button className='OptionStyle' onClick={()=>{
              SetUserAns("Option2")
            }}>Option2: {quiz.Option2}</button></li>
            <li> <button className='OptionStyle' onClick={()=>{
              SetUserAns("Option3")

            }}>Option3: {quiz.Option3}</button></li>
            <li><button className='OptionStyle' onClick={()=>{
              SetUserAns("Option4")
            }}>Option4: {quiz.Option4}</button></li>
          </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
