@ECHO OFF
set MSG=%DATE% %TIME%
git add .
git commit -m "%MSG%"