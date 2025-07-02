import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { AccessTime, Schedule } from '@mui/icons-material';
import { getCurrentTime } from '../utils/api';

const RealTimeStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [serverTime, setServerTime] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  // Cập nhật thời gian local mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Đồng bộ với server time mỗi 30 giây
  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await getCurrentTime();
        setServerTime(new Date(response.data.current_time));
        setLastSync(new Date());
      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };

    // Fetch ngay lần đầu
    fetchServerTime();

    // Sau đó fetch mỗi 30 giây
    const syncTimer = setInterval(fetchServerTime, 30000);

    return () => clearInterval(syncTimer);
  }, []);


  const formatTime = (date) =>
    date?.toLocaleTimeString('vi-VN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) ?? '--:--:--';

  const formatDate = (date) =>
    date?.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) ?? '--/--/----';

  const timeDiff = serverTime ? Math.floor(Math.abs(currentTime.getTime() - serverTime.getTime()) / 1000) : null;

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mb: 3, 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        borderRadius: 2,
        border: '1px solid rgba(102, 126, 234, 0.1)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Schedule sx={{ color: '#667eea', mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Trạng thái Thời gian Thực
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ fontSize: 18, color: '#4caf50', mr: 1 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Thời gian hiện tại
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(currentTime)}
            </Typography>
          </Box>
        </Box>

        {serverTime && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 18, color: '#2196f3', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Thời gian server
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2196f3' }}>
                {formatTime(serverTime)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(serverTime)}
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ ml: 'auto' }}>
          {timeDiff !== null && (
            <Chip
              label={timeDiff < 5 ? 'Đồng bộ' : `Chênh lệch ${timeDiff}s`}
              color={timeDiff < 5 ? 'success' : 'warning'}
              size="small"
              sx={{ mr: 1 }}
            />
          )}
          
          {lastSync && (
            <Chip
              label={`Cập nhật: ${formatTime(lastSync)}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default RealTimeStatus;
