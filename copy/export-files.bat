@echo off
rem set src_folder=C:\Users\Omar\Documents\excite\$sistemaNuevo
set src_folder=C:\Users\Omar\Documents\excite\db
del SOURCE.SQL
for /f "tokens=*" %%i in (files-list.txt) DO (
    "C:\Program Files (x86)\DBF Viewer 2000\dbview.exe" "%src_folder%\%%i.DBF" /EXPORT:"%%i.SQL" /mysql /SKIPD
    echo ALTER TABLE %%i ADD COLUMN ID INT NOT NULL AUTO_INCREMENT FIRST,  ADD PRIMARY KEY (ID^); >> %%i.SQL
    type %%i.SQL >> SOURCE.SQL
    del %%i.SQL
)
type final.SQL >> SOURCE.SQL

powershell -Command "(gc SOURCE.SQL) -replace '\*\*', '1' | Out-File FILE1"
powershell -Command "(gc FILE1) -replace ',,', ',NULL,' | Out-File FILE2"
del FILE1
powershell -Command "(gc FILE2) -replace ',,', ',NULL,' | Out-File FILE3"
del FILE2
powershell -Command "(gc FILE3) -replace ',\)', ',0)' | Out-File IMPORT.SQL"
del FILE3
