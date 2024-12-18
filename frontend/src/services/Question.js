import axios from 'axios';

const BaseUrl = "https://quizapp-zz59.onrender.com/api"; // Django backend URL

export const getRandomQuestions = async (numQuestions) => {
  try {
    const response = await axios.get(`${BaseUrl}/random-questions/`, {
      params: { num_questions: numQuestions }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getQuestions = async () => {
  const response = await axios.get(`${BaseUrl}/questions`);
  return response.data;
};

export const checkQuizStatus = async (username) => {
  const response = await axios.post(`${BaseUrl}/has_taken_quiz/`, { username });
  return response.data;
};

// export const submitQuizResults = async (username, score) => {
//   const response = await axios.post(`${BaseUrl}/submit_quiz/`, { username, score });
//   return response.data;
// };

export const submitQuizResults = async (username, score, totalQuestions, correctAnswers) => {
  const response = await axios.post(`${BaseUrl}/submit_quiz-results/`, { 
    username, 
    score, 
    total_questions: totalQuestions,
    correct_answers: correctAnswers 
  });
  return response.data;
};




