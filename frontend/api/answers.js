import axios from 'axios';
import { API } from "./consts";

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAnswers = async (questionId) => {
  const response = await api.get(`/questions/${questionId}/answers`);
  return response.data;
};

export const createAnswer = async (questionId, answer) => {
  const response = await api.post(`/questions/${questionId}/answers`, answer);
  return response.data;
};

export const updateAnswer = async (answerId, content) => {
  const response = await api.patch(`/answers/${answerId}`, { content });
  return response.data;
};

export const deleteAnswer = async (answerId) => {
  const response = await api.delete(`/answers/${answerId}`);
  return response.data;
};

export const likeAnswer = async (answerId) => {
  const response = await api.post(`/answers/${answerId}/like`);
  return response.data;
};

export const dislikeAnswer = async (answerId) => {
  const response = await api.post(`/answers/${answerId}/dislike`);
  return response.data;
};

