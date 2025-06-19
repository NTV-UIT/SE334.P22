import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import TrendChart from '../components/TrendChart';
import { TrendingUp } from '@mui/icons-material';

const Trends = () => {
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
        <TrendingUp sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
          Xu hướng Cảm xúc
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Theo dõi xu hướng cảm xúc của các văn bản đã được phân tích theo thời gian        </Typography>
      </Paper>
      
      <TrendChart />
      
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Thông tin biểu đồ:
        </Typography>
        <Typography variant="body1" paragraph>
          • <span style={{ color: '#4caf50', fontWeight: 'bold' }}>Xanh lá</span>: Cảm xúc tích cực
        </Typography>
        <Typography variant="body1" paragraph>
          • <span style={{ color: '#f44336', fontWeight: 'bold' }}>Đỏ</span>: Cảm xúc tiêu cực
        </Typography>
        <Typography variant="body1" paragraph>
          • <span style={{ color: '#ff9800', fontWeight: 'bold' }}>Cam</span>: Cảm xúc trung tính
        </Typography>
        <Typography variant="body1">
          • Chọn khoảng thời gian để xem xu hướng theo từng mốc thời gian khác nhau
        </Typography>
      </Box>
    </Container>
  );
};

export default Trends;
