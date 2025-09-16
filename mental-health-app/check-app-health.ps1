# Mental Health App - System Health Check
Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "   MENTAL HEALTH APP - SYSTEM CHECK" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check Node.js and npm
Write-Host "1. CHECKING ENVIRONMENT:" -ForegroundColor Yellow
Write-Host "   Node.js version: " -NoNewline
node --version
Write-Host "   npm version: " -NoNewline
npm --version

# Check Frontend
Write-Host "`n2. FRONTEND STATUS:" -ForegroundColor Yellow
$frontendPath = Get-Location
if (Test-Path "$frontendPath\node_modules") {
    Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green
    $packageCount = (Get-ChildItem "$frontendPath\node_modules" -Directory).Count
    Write-Host "   📦 $packageCount packages in node_modules" -ForegroundColor Cyan
} else {
    Write-Host "   ❌ Frontend dependencies NOT installed" -ForegroundColor Red
    Write-Host "   Run: npm install" -ForegroundColor Yellow
}

# Check key frontend files
$frontendFiles = @(
    "src\App.tsx",
    "src\pages\Landing.tsx",
    "src\pages\Dashboard.tsx",
    "src\pages\Assessments.tsx",
    "src\components\Navigation.tsx",
    "src\store\authStore.ts",
    "tailwind.config.js",
    "postcss.config.js"
)

$missingFiles = @()
foreach ($file in $frontendFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -eq 0) {
    Write-Host "   ✅ All key frontend files present" -ForegroundColor Green
} else {
    Write-Host "   ❌ Missing frontend files:" -ForegroundColor Red
    $missingFiles | ForEach-Object { Write-Host "      - $_" -ForegroundColor Red }
}

# Check Backend
Write-Host "`n3. BACKEND STATUS:" -ForegroundColor Yellow
if (Test-Path "backend\node_modules") {
    Write-Host "   ✅ Backend dependencies installed" -ForegroundColor Green
    $backendPackageCount = (Get-ChildItem "backend\node_modules" -Directory).Count
    Write-Host "   📦 $backendPackageCount packages in backend/node_modules" -ForegroundColor Cyan
} else {
    Write-Host "   ❌ Backend dependencies NOT installed" -ForegroundColor Red
    Write-Host "   Run: cd backend; npm install" -ForegroundColor Yellow
}

# Check key backend files
$backendFiles = @(
    "backend\src\server.ts",
    "backend\src\database\init.ts",
    "backend\src\routes\auth.ts",
    "backend\src\routes\assessments.ts",
    "backend\tsconfig.json"
)

$missingBackendFiles = @()
foreach ($file in $backendFiles) {
    if (-not (Test-Path $file)) {
        $missingBackendFiles += $file
    }
}

if ($missingBackendFiles.Count -eq 0) {
    Write-Host "   ✅ All key backend files present" -ForegroundColor Green
} else {
    Write-Host "   ❌ Missing backend files:" -ForegroundColor Red
    $missingBackendFiles | ForEach-Object { Write-Host "      - $_" -ForegroundColor Red }
}

# Check Database
Write-Host "`n4. DATABASE STATUS:" -ForegroundColor Yellow
if (Test-Path "backend\mental_health.db") {
    $dbSize = (Get-Item "backend\mental_health.db").Length / 1KB
    Write-Host "   ✅ SQLite database exists ($([math]::Round($dbSize, 2)) KB)" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Database will be created on first run" -ForegroundColor Yellow
}

# Check Ports
Write-Host "`n5. PORT AVAILABILITY:" -ForegroundColor Yellow
$port3000 = netstat -ano | Select-String ":3000"
$port5000 = netstat -ano | Select-String ":5000"

if ($port3000) {
    Write-Host "   ⚠️  Port 3000 is in use (Frontend port)" -ForegroundColor Yellow
} else {
    Write-Host "   ✅ Port 3000 is available (Frontend)" -ForegroundColor Green
}

if ($port5000) {
    Write-Host "   ⚠️  Port 5000 is in use (Backend port)" -ForegroundColor Yellow
} else {
    Write-Host "   ✅ Port 5000 is available (Backend)" -ForegroundColor Green
}

# Check TypeScript compilation
Write-Host "`n6. TYPESCRIPT COMPILATION:" -ForegroundColor Yellow
Write-Host "   Checking frontend..." -ForegroundColor Cyan
$frontendTSC = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Frontend TypeScript: No errors" -ForegroundColor Green
} else {
    Write-Host "   ❌ Frontend TypeScript errors found" -ForegroundColor Red
}

Write-Host "   Checking backend..." -ForegroundColor Cyan
Push-Location backend
$backendTSC = npx tsc --noEmit 2>&1
Pop-Location
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Backend TypeScript: No errors" -ForegroundColor Green
} else {
    Write-Host "   ❌ Backend TypeScript errors found" -ForegroundColor Red
}

# Feature Status
Write-Host "`n7. FEATURE IMPLEMENTATION STATUS:" -ForegroundColor Yellow
Write-Host "   ✅ Landing Page with Spline 3D" -ForegroundColor Green
Write-Host "   ✅ Authentication (Login/Register/Anonymous)" -ForegroundColor Green
Write-Host "   ✅ Dashboard with stats and recommendations" -ForegroundColor Green
Write-Host "   ✅ PHQ-9 Depression Assessment" -ForegroundColor Green
Write-Host "   ✅ GAD-7 Anxiety Assessment" -ForegroundColor Green
Write-Host "   ✅ Mood Tracker with emoji selection" -ForegroundColor Green
Write-Host "   ⚠️  Big Five Personality Test (Placeholder)" -ForegroundColor Yellow
Write-Host "   ⚠️  Burnout Assessment (Placeholder)" -ForegroundColor Yellow
Write-Host "   ⚠️  Sleep Assessment (Placeholder)" -ForegroundColor Yellow
Write-Host "   ⚠️  Mental Health Games (Placeholder)" -ForegroundColor Yellow
Write-Host "   ⚠️  Daily Tasks (Placeholder)" -ForegroundColor Yellow

# PWA Status
Write-Host "`n8. PWA CONFIGURATION:" -ForegroundColor Yellow
if (Test-Path "public\manifest.json") {
    Write-Host "   ✅ PWA manifest.json configured" -ForegroundColor Green
} else {
    Write-Host "   ❌ PWA manifest.json missing" -ForegroundColor Red
}

# Summary
Write-Host "`n==========================================`n" -ForegroundColor Cyan
Write-Host "QUICK START COMMANDS:" -ForegroundColor Green
Write-Host ""
Write-Host "Option 1 - Use the startup script:" -ForegroundColor Yellow
Write-Host "   .\start-app.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Option 2 - Manual start:" -ForegroundColor Yellow
Write-Host "   Terminal 1: cd backend; npm run dev" -ForegroundColor White
Write-Host "   Terminal 2: npm start" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "==========================================`n" -ForegroundColor Cyan
