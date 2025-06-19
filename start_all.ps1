# Script PowerShell để khởi động tất cả các service
Write-Host "=================================" -ForegroundColor Cyan
Write-Host " Khởi động Hệ thống Phân tích Cảm xúc" -ForegroundColor Cyan  
Write-Host "=================================" -ForegroundColor Cyan

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "[1/3] Khởi động Flask Backend (Python)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; python app.py"

Start-Sleep -Seconds 3

Write-Host "[2/3] Khởi động Node.js Backend..." -ForegroundColor Yellow  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\backend'; npm start"

Start-Sleep -Seconds 3

Write-Host "[3/3] Khởi động React Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\frontend'; npm start"

Write-Host ""
Write-Host "=================================" -ForegroundColor Green
Write-Host " Tất cả các service đang khởi động..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host " Flask Backend:   http://127.0.0.1:5050" -ForegroundColor White
Write-Host " Node.js Backend: http://localhost:4101" -ForegroundColor White
Write-Host " React Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "=================================" -ForegroundColor Green

Write-Host ""
Write-Host "Nhấn phím bất kỳ để đóng script này..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
