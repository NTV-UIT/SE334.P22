// Utility functions for Vietnamese timezone and formatting

export const formatVietnameseTime = (date) => {
  if (!date) return '--:--:--';
  
  // Đảm bảo date là Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return dateObj.toLocaleTimeString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const formatVietnameseDate = (date) => {
  if (!date) return '--/--/----';
  
  // Đảm bảo date là Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return dateObj.toLocaleDateString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatVietnameseDateTime = (date) => {
  if (!date) return '--/--/---- --:--:--';
  
  // Đảm bảo date là Date object
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return dateObj.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

export const getVietnameseTime = () => {
  return new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh'
  });
};

export const getCurrentVietnameseTime = () => {
  const now = new Date();
  return new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
};
