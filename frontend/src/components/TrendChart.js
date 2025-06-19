import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = () => {
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [interval, setInterval] = useState('day');

  const fetchTrendData = async (selectedInterval) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:4101/api/trend?interval=${selectedInterval}`);
      setTrendData(response.data);
    } catch (err) {
      setError('Không thể tải dữ liệu xu hướng. Vui lòng thử lại.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendData(interval);
  }, [interval]);

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const prepareChartData = () => {
    if (!trendData) return null;

    const periods = Object.keys(trendData).sort();
    const positiveData = [];
    const negativeData = [];
    const neutralData = [];

    periods.forEach(period => {
      const data = trendData[period];
      positiveData.push(data.positive || 0);
      negativeData.push(data.negative || 0);
      neutralData.push(data.neutral || 0);
    });

    return {
      labels: periods,
      datasets: [
        {
          label: 'Tích cực',
          data: positiveData,
          backgroundColor: 'rgba(76, 175, 80, 0.6)',
          borderColor: 'rgba(76, 175, 80, 1)',
          borderWidth: 2,
        },
        {
          label: 'Tiêu cực',
          data: negativeData,
          backgroundColor: 'rgba(244, 67, 54, 0.6)',
          borderColor: 'rgba(244, 67, 54, 1)',
          borderWidth: 2,
        },
        {
          label: 'Trung tính',
          data: neutralData,
          backgroundColor: 'rgba(255, 152, 0, 0.6)',
          borderColor: 'rgba(255, 152, 0, 1)',
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Xu hướng Cảm xúc theo Thời gian',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Thời gian',
        },
      },
    },
  };

  const chartData = prepareChartData();

  return (
    <Card sx={{ maxWidth: 1000, mx: 'auto', mt: 4, borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Biểu đồ Xu hướng Cảm xúc
          </Typography>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Khoảng thời gian</InputLabel>
            <Select
              value={interval}
              onChange={handleIntervalChange}
              label="Khoảng thời gian"
            >
              <MenuItem value="second">Giây</MenuItem>
              <MenuItem value="15min">15 phút</MenuItem>
              <MenuItem value="hour">Giờ</MenuItem>
              <MenuItem value="12h">12 giờ</MenuItem>
              <MenuItem value="day">Ngày</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {chartData && !loading && (
          <Box sx={{ height: 400 }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        )}

        {!chartData && !loading && !error && (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            Chưa có dữ liệu để hiển thị. Hãy thử phân tích một số văn bản trước.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendChart;
