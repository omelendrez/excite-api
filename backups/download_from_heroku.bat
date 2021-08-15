@echo off
set file_name=heroku_%DATE:~6,4%%DATE:~0,2%%DATE:~3,2%.sql
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" -u %EXCITE_USER% --routines --column-statistics=0 -h %EXCITE_SERVER% --password=%EXCITE_PASSWORD% --databases %EXCITE_DATABASE% > %file_name%
pause
