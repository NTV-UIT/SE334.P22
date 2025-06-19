import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Psychology, TrendingUp } from '@mui/icons-material';

const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' }}>
      <Toolbar>
        <Psychology sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hệ thống Phân tích Cảm xúc
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
              borderRadius: 2
            }}
          >
            Phân tích
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/trends"
            startIcon={<TrendingUp />}
            sx={{
              backgroundColor: location.pathname === '/trends' ? 'rgba(255,255,255,0.2)' : 'transparent',
              borderRadius: 2
            }}
          >
            Xu hướng
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
