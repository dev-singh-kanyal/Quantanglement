@echo off
echo Changing directory...
cd /d "%~dp0"
:: This will change the directory to the one where batch file is located
echo Running key.py script...
powershell -Command "python ./key.py"
pause

@REM We tried various method but encountered some errors here and there and finally came up with above method

@REM @echo off
@REM echo Current directory:
@REM cd
@REM echo Storing the current directory in a variable...
@REM for /f "tokens=*" %%i in ('cd') do set pwd_path_var=%%i
@REM echo Changing directory...
@REM cd /d "%pwd_path_var%"
@REM echo Running Python script...
@REM powershell -Command "python ./key.py"
@REM pause

@REM @echo off
@REM echo Changing directory...
@REM cd /d "E:\fyq\priya\Quantum-Archive\qcrypto\client"
@REM echo Running Python script...
@REM powershell -Command "python ./key.py"
@REM pause
