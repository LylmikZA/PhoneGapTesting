@ECHO OFF
set MSG=%DATE% %TIME%
echo %MSG%
git add .
git commit -m "%MSG%"