import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint: nhận text, gọi Flask API
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    const flaskRes = await axios.post('http://127.0.0.1:5050/analyze', { text });
    res.json(flaskRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Proxy endpoint: lấy trend từ Flask API
app.get('/api/trend', async (req, res) => {
  try {
    const flaskRes = await axios.get('http://127.0.0.1:5050/trend' + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''));
    res.send(flaskRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Proxy endpoint: lấy thời gian hiện tại từ Flask API
app.get('/api/current-time', async (req, res) => {
  try {
    const flaskRes = await axios.get('http://127.0.0.1:5050/current-time');
    res.json(flaskRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4101;
app.listen(PORT, () => {
  console.log(`Node backend running on http://localhost:${PORT}`);
});
