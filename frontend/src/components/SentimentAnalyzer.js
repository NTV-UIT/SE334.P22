import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Paper
} from '@mui/material';
import { Send, SentimentSatisfied, SentimentNeutral, SentimentDissatisfied } from '@mui/icons-material';
import axios from 'axios';
import { formatVietnameseDateTime } from '../utils/timeUtils';

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Vui lòng nhập văn bản để phân tích');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:4101/api/analyze', { text });
      setResult(response.data);
    } catch (err) {
      setError('Có lỗi xảy ra khi phân tích văn bản. Vui lòng thử lại.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentIcon = (label) => {
    switch (label) {
      case 'positive':
        return <SentimentSatisfied sx={{ color: '#4caf50' }} />;
      case 'negative':
        return <SentimentDissatisfied sx={{ color: '#f44336' }} />;
      default:
        return <SentimentNeutral sx={{ color: '#ff9800' }} />;
    }
  };

  const getSentimentColor = (label) => {
    switch (label) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const getSentimentText = (label) => {
    switch (label) {
      case 'positive':
        return 'Tích cực';
      case 'negative':
        return 'Tiêu cực';
      default:
        return 'Trung tính';
    }
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4, borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
          Phân tích Cảm xúc Văn bản
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Nhập văn bản cần phân tích"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ví dụ: Tôi rất hạnh phúc hôm nay..."
            sx={{ mb: 2 }}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleAnalyze}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
            sx={{ 
              py: 1.5, 
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
              }
            }}
          >
            {loading ? 'Đang phân tích...' : 'Phân tích cảm xúc'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: `2px solid ${getSentimentColor(result.label)}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getSentimentIcon(result.label)}
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                Kết quả phân tích
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label={getSentimentText(result.label)}
                sx={{
                  backgroundColor: getSentimentColor(result.label),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  px: 1
                }}
              />
              <Typography variant="body1">
                Độ tin cậy: <strong>{(result.score * 100).toFixed(1)}%</strong>
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Văn bản được phân tích: "{text}"
            </Typography>
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Thời gian phân tích: {formatVietnameseDateTime(new Date())}
            </Typography>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default SentimentAnalyzer;
