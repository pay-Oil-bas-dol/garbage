@echo off
title Deploy SafaiSaathi to Vercel
color 0B
echo ========================================================
echo   SafaiSaathi - Deploying Directly to Vercel
echo ========================================================
echo.
cd /d "%~dp0"

echo Deploying production build to Vercel...
echo.
call npx vercel --prod

echo.
echo ========================================================
echo   Deployment finished!
echo ========================================================
pause
