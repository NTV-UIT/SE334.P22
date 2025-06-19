import axios from 'axios';

async function testFlaskAnalyze() {
  try {
    const res = await axios.post('http://localhost:5000/analyze', { text: 'Tôi rất vui' });
    console.log('Flask API /analyze response:', res.data);
  } catch (err) {
    console.error('Error calling Flask API /analyze:', err.message);
    if (err.response) {
      console.error('Response:', err.response.data);
    }
  }
}

testFlaskAnalyze();
