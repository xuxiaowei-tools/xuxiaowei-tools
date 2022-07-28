@echo off

REM cd /d %~dp0

if not exist src (
   echo "不存在文件夹" 
   exit
)

set dateTime=%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%
REM echo %dateTime%

(echo {"date":"%dateTime%"}) > ./src/release_date.json

exit