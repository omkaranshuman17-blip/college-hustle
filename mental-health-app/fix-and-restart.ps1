# Fix and Restart Mental Health App
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   FIXING AND RESTARTING THE APP" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Kill existing processes on ports 3000 and 5000
Write-Host "1. Stopping existing processes..." -ForegroundColor Yellow

$port3000Process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -First 1
$port5000Process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -First 1

if ($port3000Process) {
    $pid3000 = $port3000Process.OwningProcess
    Write-Host "   Stopping process on port 3000 (PID: $pid3000)..." -ForegroundColor Yellow
    try {
        Stop-Process -Id $pid3000 -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ Port 3000 cleared" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️ Could not stop process on port 3000" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✅ Port 3000 is already free" -ForegroundColor Green
}

if ($port5000Process) {
    $pid5000 = $port5000Process.OwningProcess
    Write-Host "   Stopping process on port 5000 (PID: $pid5000)..." -ForegroundColor Yellow
    try {
        Stop-Process -Id $pid5000 -Force -ErrorAction SilentlyContinue
        Write-Host "   ✅ Port 5000 cleared" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️ Could not stop process on port 5000" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✅ Port 5000 is already free" -ForegroundColor Green
}

# Kill any node processes that might be hanging
Write-Host "`n2. Cleaning up Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "   ✅ Node processes cleaned" -ForegroundColor Green

# Wait a moment for ports to be released
Start-Sleep -Seconds 2

# Step 2: Check if dependencies are installed
Write-Host "`n3. Checking dependencies..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ✅ Frontend dependencies already installed" -ForegroundColor Green
}

if (-not (Test-Path "backend\node_modules")) {
    Write-Host "   Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location backend
    npm install
    Pop-Location
    Write-Host "   ✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ✅ Backend dependencies already installed" -ForegroundColor Green
}

# Step 3: Create .env file if it doesn't exist
if (-not (Test-Path "backend\.env")) {
    Write-Host "`n4. Creating backend .env file..." -ForegroundColor Yellow
    @"
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
"@ | Out-File -FilePath "backend\.env" -Encoding UTF8
    Write-Host "   ✅ Backend .env file created" -ForegroundColor Green
} else {
    Write-Host "`n4. ✅ Backend .env file exists" -ForegroundColor Green
}

# Step 4: Start the application
Write-Host "`n5. Starting the application..." -ForegroundColor Yellow
Write-Host "   Opening new windows for backend and frontend..." -ForegroundColor Cyan

# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host '`n🚀 Starting Backend Server...' -ForegroundColor Green; Write-Host '================================' -ForegroundColor Cyan; npm run dev" -WorkingDirectory $PSScriptRoot

# Wait for backend to initialize
Write-Host "   Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '`n🚀 Starting Frontend Application...' -ForegroundColor Green; Write-Host '================================' -ForegroundColor Cyan; npm start" -WorkingDirectory $PSScriptRoot

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ APPLICATION FIXED AND RESTARTING!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The app will open automatically in your browser." -ForegroundColor Yellow
Write-Host "If not, manually open: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API running at: " -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop the servers: Close the PowerShell windows" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan
