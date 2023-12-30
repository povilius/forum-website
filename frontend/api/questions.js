
import axios from 'axios';

const API_BASE_URL = `http://localhost:3000` // Replace with your backend server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchQuestions = async () => {
  const response = await api.get('/questions');
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await api.post('/questions', question);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
};