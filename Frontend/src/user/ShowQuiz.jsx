import React, { useEffect, useState } from 'react';

export const ShowQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});

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

  const handleOptionClick = (postIndex, option) => {
    setSelectedPost(postIndex);
    setSelectedOption({ [postIndex]: option });
  };

  const getOptionClass = (postIndex, option) => {
    return selectedPost === postIndex && selectedOption[postIndex] === option
      ? "selected"
      : "";
  };

  return (
    <div>
      {quizData.map((quiz, index) => (
        <div key={index}>
          <div className='QuizCard'>
            <h2 style={{ borderBottom: "2px solid black" }}>Question: {quiz.Question}</h2>
            <ul style={{ listStyle: "none", paddingRight: "40px" }}>
              <li>
                <button
                  className={`OptionStyle ${getOptionClass(index, "Option1")}`}
                  onClick={() => handleOptionClick(index, "Option1")}
                >
                  Option1: {quiz.Option1}
                </button>
              </li>
              <li>
                <button
                  className={`OptionStyle ${getOptionClass(index, "Option2")}`}
                  onClick={() => handleOptionClick(index, "Option2")}
                >
                  Option2: {quiz.Option2}
                </button>
              </li>
              <li>
                <button
                  className={`OptionStyle ${getOptionClass(index, "Option3")}`}
                  onClick={() => handleOptionClick(index, "Option3")}
                >
                  Option3: {quiz.Option3}
                </button>
              </li>
              <li>
                <button
                  className={`OptionStyle ${getOptionClass(index, "Option4")}`}
                  onClick={() => handleOptionClick(index, "Option4")}
                >
                  Option4: {quiz.Option4}
                </button>
              </li>
              <li>
                <h3>Answer:</h3>
                {selectedPost === index ? <span>{quiz.QAnswer}</span> : <span>Please Choose an Option</span>}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
