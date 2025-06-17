# XAMPP 설치 스크립트
$downloadUrl = "https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe"
$installerPath = Join-Path $env:TEMP "xampp-installer.exe"

Write-Host "XAMPP 설치 프로그램 다운로드 중..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

Write-Host "XAMPP 설치 중..."
Start-Process -FilePath $installerPath -ArgumentList "--mode unattended" -Wait

Write-Host "XAMPP 설치가 완료되었습니다." 