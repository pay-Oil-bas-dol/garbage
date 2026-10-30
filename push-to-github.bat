@echo off
title Push Clean & Earn to GitHub
color 0A
echo ========================================================
echo   Pushing All 6 Commits to GitHub...
echo   Repository: https://github.com/pay-Oil-bas-dol/garbage.git
echo ========================================================
echo.
cd /d "%~dp0"

echo 1. Current Branch & 6 Milestone Commits:
git log --oneline -n 6
echo.

echo 2. Uploading code to GitHub now...
echo.
echo NOTE: If a GitHub login window or browser tab opens,
echo please click "Sign in with your browser" (or authorize Git).
echo.

git push -u origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! All 6 commits uploaded to GitHub!
    echo   Check your repo: https://github.com/pay-Oil-bas-dol/garbage
    echo ========================================================
) else (
    echo ========================================================
    echo   If browser sign-in failed, you can enter a Personal Access Token below:
    echo ========================================================
    set /p token="Paste GitHub Personal Access Token (or press Enter to exit): "
    if not "%token%"=="" (
        echo Pushing with Token...
        git push https://pay-Oil-bas-dol:%token%@github.com/pay-Oil-bas-dol/garbage.git main --force
    )
)

echo.
pause
