# Open Mental Health App in Browser
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   OPENING MENTAL HEALTH APP" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if the app is running
$response = $null
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
} catch {
    # App not running
}

if ($response -and $response.StatusCode -eq 200) {
    Write-Host "✅ App is running!" -ForegroundColor Green
    Write-Host "Opening in your default browser..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000"
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "APP OPENED IN BROWSER!" -ForegroundColor Green
    Write-Host ""
    Write-Host "If the browser didn't open, manually visit:" -ForegroundColor Yellow
    Write-Host "http://localhost:3000" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ App is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start the app, run:" -ForegroundColor Yellow
    Write-Host "  .\start-app.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Or to fix issues and restart:" -ForegroundColor Yellow
    Write-Host "  .\fix-and-restart.ps1" -ForegroundColor White
    Write-Host "========================================`n" -ForegroundColor Cyan
}
