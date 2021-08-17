@echo off
set src_folder=C:\$sistemaNuevo
set dst_folder=*.*
for /f "tokens=*" %%i in (files-list.txt) DO (
    xcopy "%src_folder%\%%i" "%dst_folder%"
)