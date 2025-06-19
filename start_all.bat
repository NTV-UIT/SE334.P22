@echo off
echo =================================
echo  Khoi dong He thong Phan tich Cam xuc
echo =================================

echo.
echo [1/3] Khoi dong Flask Backend (Python)...
start "Flask Backend" cmd /k "cd /d "%~dp0" && python app.py"

timeout /t 3 /nobreak >nul

echo [2/3] Khoi dong Node.js Backend...
start "Node.js Backend" cmd /k "cd /d "%~dp0backend" && npm start"

timeout /t 3 /nobreak >nul

echo [3/3] Khoi dong React Frontend...
start "React Frontend" cmd /k "cd /d "%~dp0frontend" && npm start"

echo.
echo =================================
echo  Tat ca cac service dang khoi dong...
echo =================================
echo  Flask Backend:  http://127.0.0.1:5050
echo  Node.js Backend: http://localhost:4101  
echo  React Frontend:  http://localhost:3000
echo =================================
echo.
echo Bam phim bat ky de dong script nay...
pause >nul
