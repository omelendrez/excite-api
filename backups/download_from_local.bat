@echo off
set file_name=local_excite_%DATE:~6,4%%DATE:~0,2%%DATE:~3,2%%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%.sql
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" -h 127.0.0.1  -u %ROOT_USER% --routines --column-statistics=0 --password=%ROOT_PASSWORD% --databases excite > %file_name%
pause