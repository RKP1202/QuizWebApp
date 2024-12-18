import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/questions/')
      .then(response => {
        console.log(response.data);  // Check what data is being returned
        setQuestions(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the questions!", error);
      });
  }, []);

  return (
    <div>
      <h1>QUIZ FOR PRANAV</h1>
      {questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>{question.question}</h3>
              {question.options.map((option, i) => (
                <div key={i}>
                  <input type="radio" name={`question-${index}`} value={option.option} />
                  <label>{option.option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
      <button>Submit</button>
    </div>
  );
}

export default Quiz;
