# MySQL 설치 스크립트
$mysqlVersion = "8.0.36"
$mysqlInstaller = "mysql-installer-community-$mysqlVersion.msi"
$downloadUrl = "https://dev.mysql.com/get/Downloads/MySQLInstaller/$mysqlInstaller"
$installerPath = Join-Path $env:TEMP $mysqlInstaller

Write-Host "MySQL 설치 프로그램 다운로드 중..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

Write-Host "MySQL 설치 중..."
Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait

Write-Host "MySQL 설치가 완료되었습니다." 