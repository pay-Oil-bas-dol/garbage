@echo off
title Import Clean and Earn Antigravity Conversation
color 0A
echo ========================================================
echo   Antigravity Conversation Importer
echo   Target ID: 677e380f-3df7-4240-a4b9-ec8cce555efc
echo ========================================================
echo.
set "DEST=%USERPROFILE%\.gemini\antigravity\brain\677e380f-3df7-4240-a4b9-ec8cce555efc"

echo 1. Creating Antigravity brain directory on this computer...
if not exist "%DEST%\.system_generated\logs" mkdir "%DEST%\.system_generated\logs"

echo 2. Copying transcript files...
copy /Y "%~dp0transcript.jsonl" "%DEST%\.system_generated\logs\transcript.jsonl"
copy /Y "%~dp0transcript_full.jsonl" "%DEST%\.system_generated\logs\transcript_full.jsonl"

echo.
echo ========================================================
echo   SUCCESS! The conversation has been imported into Antigravity!
echo   When you open Antigravity on this computer, the session
echo   history and development steps will be fully visible.
echo ========================================================
echo.
pause
