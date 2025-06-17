@echo off
echo MySQL 데이터베이스 설정을 시작합니다...

REM MySQL Shell 실행
"C:\Program Files\MySQL\MySQL Shell 8.0\bin\mysqlsh.exe" --file=setup-mysql.js

echo.
echo 설정이 완료되었습니다.
echo.
pause 