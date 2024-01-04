import { API } from "./consts"
import axios from 'axios';

const API_BASE_URL = `http://localhost:3000`

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchQuestions = async () => {
  try {
    const response = await api.get('/questions');
    console.log("Fetched questions:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error; // Rethrow the error so the calling code can handle it
  }
};

export const createQuestion = async (question) => {
  const response = await api.post('/questions', question);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/questions/${id}`);
  return response.data;
};

export const postQuestion = async (question) => {
  try {
    const response = await axios.post(`${API}/questions`, question);
    return response.data
  } catch (error) {
    console.error("Error posting question", error);
    throw error; // Rethrow the error so the calling code can handle it
  }
};