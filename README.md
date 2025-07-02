# Sentiment Analysis System


## Cấu trúc thư mục dự án

```
SE334.P22/
├── app.py                  # Backend Flask API
├── requirements.txt        # Thư viện Python
├── test_sentiment.py       # Script kiểm thử tự động
├── start_all.bat           # Script chạy cả backend & frontend (Windows)
├── start_all.ps1           # Script chạy cả backend & frontend (PowerShell)
├── backend/                # (Có thể chứa file backend phụ)
├── frontend/               # Source code React
│   ├── package.json
│   ├── public/
│   └── src/
│       └── ...
├── static/                 # CSS tĩnh
├── templates/              # HTML template Flask
```

## Mô tả dự án

Đây là hệ thống phân tích cảm xúc (Sentiment Analysis System) sử dụng phương pháp lập trình khai báo (Declarative Programming) cho cả frontend (ReactJS) và backend (Flask + Transformers + SQLAlchemy). Hệ thống cho phép người dùng nhập văn bản tiếng Việt hoặc tiếng Anh để phân tích cảm xúc (tích cực, tiêu cực, trung tính), lưu kết quả vào cơ sở dữ liệu và hiển thị xu hướng cảm xúc theo thời gian.

- **Frontend:** ReactJS, Material UI, ChartJS, giao diện hiện đại, realtime status.
- **Backend:** Flask, Transformers (cardiffnlp/twitter-xlm-roberta-base-sentiment), SQLAlchemy ORM, PostgreSQL.
- **Kiểm thử:** Tự động với file `test_sentiment.py`.

## Đánh giá & Tổng kết

- Dự án tuân thủ nghiêm ngặt phương pháp lập trình khai báo.
- Code rõ ràng, dễ bảo trì, dễ mở rộng.
- Hỗ trợ tiếng Việt tốt, có lưu lịch sử và thống kê xu hướng cảm xúc.
- Đã kiểm thử tự động các trường hợp cơ bản và biên.

## Hướng dẫn build & run dự án

### 1. Yêu cầu
- Python >= 3.8
- Node.js >= 16
- PostgreSQL

### 2. Cài đặt backend
```bash
cd backend
pip install -r ../requirements.txt
# Hoặc nếu dùng Anaconda:
# conda activate sentiment_py39
# pip install -r ../requirements.txt
```

Cấu hình DATABASE_URL trong biến môi trường hoặc sửa trực tiếp trong app.py nếu cần.

### 3. Chạy backend Flask
```bash
cd ..
python app.py
# Flask sẽ chạy ở http://localhost:5050
```

### 4. Cài đặt frontend
```bash
cd frontend
npm install
```

### 5. Chạy frontend
```bash
npm start
# Ứng dụng sẽ chạy ở http://localhost:3000
```

### 6. Kiểm thử hệ thống
Đảm bảo backend đã chạy ở cổng 5050:
```bash
python test_sentiment.py
```


## Cấu trúc thư mục dự án

```
SE334.P22/
├── app.py                  # Backend Flask API
├── requirements.txt        # Thư viện Python
├── test_sentiment.py       # Script kiểm thử tự động
├── start_all.bat           # Script chạy cả backend & frontend (Windows)
├── start_all.ps1           # Script chạy cả backend & frontend (PowerShell)
├── backend/                # (Có thể chứa file backend phụ)
├── frontend/               # Source code React
│   ├── package.json
│   ├── public/
│   └── src/
│       └── ...
├── static/                 # CSS tĩnh
├── templates/              # HTML template Flask
```

## Chạy nhanh toàn bộ project bằng script

### 1. Windows (cmd)
Chạy file:
```cmd
start_all.bat
```

### 2. Windows (PowerShell)
Chạy file:
```powershell
./start_all.ps1
```

Script này sẽ tự động mở 2 cửa sổ: 1 cho backend Flask, 1 cho frontend React.

---

