import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import SentimentAnalyzer from '../components/SentimentAnalyzer';
import { Psychology } from '@mui/icons-material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: 3
        }}
      >
        <Psychology sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
          Phân tích Cảm xúc với AI
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Sử dụng trí tuệ nhân tạo để phân tích cảm xúc từ văn bản tiếng Việt một cách chính xác và nhanh chóng        </Typography>
      </Paper>
      
      <SentimentAnalyzer />
      
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Hướng dẫn sử dụng:
        </Typography>
        <Typography variant="body1" paragraph>
          • Nhập văn bản tiếng Việt hoặc tiếng Anh vào ô text
        </Typography>
        <Typography variant="body1" paragraph>
          • Nhấn nút "Phân tích cảm xúc" để xem kết quả
        </Typography>
        <Typography variant="body1" paragraph>
          • Hệ thống sẽ phân loại cảm xúc thành: Tích cực, Tiêu cực, hoặc Trung tính
        </Typography>
        <Typography variant="body1">
          • Xem biểu đồ xu hướng cảm xúc theo thời gian tại tab "Xu hướng"
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
