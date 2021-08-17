@echo off
echo **
powershell -Command "(gc SOURCE.SQL) -replace '\*\*', '1' | Out-File FILE1"
echo ,,
powershell -Command "(gc FILE1) -replace ',,', ',NULL,' | Out-File FILE2"
del FILE1
echo ,,
powershell -Command "(gc FILE2) -replace ',,', ',NULL,' | Out-File FILE3"
del FILE2
echo ,\)
powershell -Command "(gc FILE3) -replace ',\)', ',0)' | Out-File IMPORT.SQL"
DEL FILE3
