import { API } from "./consts"
import axios from 'axios';


export const fetchQuestions = async () => {
  const response = await axios.get(`${API}/questions`);
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await axios.post(`${API}/posts`, question);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`${API}/questions/${id}`);
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