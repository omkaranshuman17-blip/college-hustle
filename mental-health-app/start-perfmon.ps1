# Start Mental Health App with Performance Monitoring
Write-Host "🚀 Starting Mental Health App with Navigation Performance Monitoring..." -ForegroundColor Green
Write-Host ""
Write-Host "Features included:" -ForegroundColor Cyan
Write-Host "  ✅ Navigation performance monitoring hook" -ForegroundColor White
Write-Host "  ✅ Real-time performance dashboard" -ForegroundColor White
Write-Host "  ✅ Electric beam navigation effects" -ForegroundColor White
Write-Host "  ✅ Route change timing" -ForegroundColor White
Write-Host "  ✅ Component render timing" -ForegroundColor White
Write-Host "  ✅ User interaction response timing" -ForegroundColor White
Write-Host "  ✅ Web Vitals integration (LCP, CLS)" -ForegroundColor White
Write-Host ""
Write-Host "Performance Dashboard:" -ForegroundColor Yellow
Write-Host "  • Click the blue chart icon (bottom-right) to open the performance dashboard" -ForegroundColor White
Write-Host "  • Monitor navigation metrics in real-time" -ForegroundColor White
Write-Host "  • Get performance recommendations" -ForegroundColor White
Write-Host ""

# Set environment variable for development
$env:NODE_ENV = "development"

# Start the app
npm start
