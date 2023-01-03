import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getPosts = (pageNumber) => api.get(`/posts?_page=${pageNumber}`).then((res) => res.data);
export const getPost = (id) => api.get(`/posts/${id}`).then((res) => res.data);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post).then((res) => res.data);
