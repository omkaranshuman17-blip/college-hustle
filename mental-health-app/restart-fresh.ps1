# Complete Fresh Restart
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   COMPLETE FRESH RESTART" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Kill all node processes
Write-Host "1. Stopping all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Kill processes on specific ports
$processes = @(3000, 5000)
foreach ($port in $processes) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        Stop-Process -Id $connection.OwningProcess -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ Cleared port $port" -ForegroundColor Green
    }
}

Start-Sleep -Seconds 2

Write-Host "`n2. Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; cls; Write-Host '🚀 BACKEND SERVER' -ForegroundColor Green; Write-Host '=================' -ForegroundColor Cyan; npm run dev"

Write-Host "   Waiting for backend to initialize..." -ForegroundColor Cyan
Start-Sleep -Seconds 4

Write-Host "`n3. Starting Frontend Application..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cls; Write-Host '🎨 FRONTEND APPLICATION' -ForegroundColor Green; Write-Host '======================' -ForegroundColor Cyan; npm start"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ APPLICATION RESTARTED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The app will open in your browser at:" -ForegroundColor Yellow
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API is running at:" -ForegroundColor Yellow
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you see a blank page, wait 10 seconds and refresh" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# Wait a bit then open browser
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"
