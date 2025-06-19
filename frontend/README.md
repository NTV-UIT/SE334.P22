# Hệ thống Phân tích Cảm xúc với React Frontend

## Tổng quan
Ứng dụng phân tích cảm xúc văn bản sử dụng:
- **Backend**: Flask (Python) + Node.js Express (Proxy)
- **Frontend**: React + Material-UI
- **Database**: PostgreSQL
- **AI Model**: cardiffnlp/twitter-xlm-roberta-base-sentiment

## Cấu trúc thư mục
```
├── app.py                 # Flask API server
├── backend/              # Node.js proxy server
│   ├── index.js
│   └── package.json
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── templates/            # HTML templates cũ (không sử dụng)
└── static/              # CSS cũ (không sử dụng)
```

## Hướng dẫn chạy ứng dụng

### 1. Cài đặt và chạy Flask Backend (Python)
```bash
# Cài đặt dependencies
pip install -r requirements.txt

# Chạy Flask server
python app.py
```
Flask server sẽ chạy trên: `http://localhost:5050`

### 2. Cài đặt và chạy Node.js Backend (Proxy)
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Chạy Node.js server
npm start
```
Node.js server sẽ chạy trên: `http://localhost:4101`

### 3. Cài đặt và chạy React Frontend
```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Chạy React development server
npm start
```
React app sẽ chạy trên: `http://localhost:3000`

## Cách sử dụng

1. **Phân tích cảm xúc**:
   - Mở trình duyệt tại `http://localhost:3000`
   - Nhập văn bản vào ô text
   - Nhấn "Phân tích cảm xúc"
   - Xem kết quả với độ tin cậy

2. **Xem xu hướng**:
   - Click tab "Xu hướng"
   - Chọn khoảng thời gian (giây, 15 phút, giờ, 12 giờ, ngày)
   - Xem biểu đồ xu hướng cảm xúc

## Tính năng mới trong React Frontend

### 🎨 Giao diện hiện đại
- Material-UI components
- Responsive design
- Gradient backgrounds
- Glass effect styling

### 📊 Biểu đồ tương tác
- Chart.js integration
- Real-time data visualization
- Multiple time intervals
- Color-coded sentiment tracking

### 🚀 Trải nghiệm người dùng
- Loading states
- Error handling
- Form validation
- Smooth animations

### 🔧 Tính năng kỹ thuật
- React Router for navigation
- Axios for API calls
- Component-based architecture
- Responsive design

## API Endpoints

### Flask API (Port 5050)
- `POST /analyze` - Phân tích cảm xúc văn bản
- `GET /trend?interval=day` - Lấy dữ liệu xu hướng

### Node.js Proxy API (Port 4101)
- `POST /api/analyze` - Proxy to Flask analyze
- `GET /api/trend` - Proxy to Flask trend

## Cấu hình Database
Đảm bảo PostgreSQL đang chạy với:
- Host: localhost
- Port: 5432
- Database: sentimentdb
- Username: postgres
- Password: Vinh_132004

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra PostgreSQL service đang chạy
- Kiểm tra thông tin kết nối trong `app.py`

### Lỗi CORS
- Node.js proxy đã cấu hình CORS
- React proxy đã được cấu hình trong package.json

### Lỗi model không tải được
- Kiểm tra kết nối internet để tải model
- Model sẽ được cache sau lần đầu tải

## Scripts hữu ích

### Chạy tất cả services
```bash
# Terminal 1 - Flask
python app.py

# Terminal 2 - Node.js
cd backend && npm start

# Terminal 3 - React
cd frontend && npm start
```

### Build production
```bash
cd frontend
npm run build
```

Sau khi build, files static sẽ được tạo trong `frontend/build/`
