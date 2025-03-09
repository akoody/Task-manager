import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const register = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data).then((res) => res.data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data).then((res) => res.data);

export const getTasks = () => api.get('/tasks').then((res) => res.data);

export const createTask = (data: { title: string; description?: string; status?: string }) =>
  api.post('/tasks', data).then((res) => res.data);

export const updateTask = (id: string, data: { title?: string; description?: string; status?: string }) =>
  api.put(`/tasks/${id}`, data).then((res) => res.data);

export const deleteTask = (id: string) => api.delete(`/tasks/${id}`).then((res) => res.data);

export const help = () => api.post('/help').then((res) => res.data);

export default api;