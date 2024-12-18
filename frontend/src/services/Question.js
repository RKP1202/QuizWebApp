import axios from 'axios';

const BaseUrl = "http://127.0.0.1:8000/api"; // Django backend URL

export const getQuestions = async () => {
  const response = await axios.get(`${BaseUrl}/questions`);
  return response.data;
};

export const checkQuizStatus = async (username) => {
  const response = await axios.post(`${BaseUrl}/has_taken_quiz/`, { username });
  return response.data;
};

export const submitQuiz = async (username, score) => {
  const response = await axios.post(`${BaseUrl}/submit_quiz/`, { username, score });
  return response.data;
};
