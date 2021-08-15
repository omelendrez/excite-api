@echo off
set file_name=%EXCITE_DATABASE%_%DATE:~6,4%%DATE:~0,2%%DATE:~3,2%%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%.sql
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" -h %EXCITE_SERVER% -u %EXCITE_USER% --routines --column-statistics=0 --password=%EXCITE_PASSWORD% --databases %EXCITE_DATABASE% > %file_name%
pause
