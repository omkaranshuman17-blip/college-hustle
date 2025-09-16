# PowerShell script to start both frontend and backend

Write-Host "🚀 Starting Mind Haven Mental Health App..." -ForegroundColor Green
Write-Host ""

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WorkingDirectory $PSScriptRoot

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting frontend application..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WorkingDirectory $PSScriptRoot

Write-Host ""
Write-Host "✅ Application starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend will open at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API running at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers" -ForegroundColor Yellow
