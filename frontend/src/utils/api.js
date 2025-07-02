// Centralized API functions for the app
import axios from 'axios';

export const analyzeSentiment = (text) =>
  axios.post('http://localhost:4101/api/analyze', { text });

export const getTrend = (interval) =>
  axios.get(`http://localhost:4101/api/trend?interval=${interval}`);

export const getCurrentTime = () =>
  axios.get('http://localhost:4101/api/current-time');
