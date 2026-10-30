const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function exportConversation() {
  const brainDir = 'C:/Users/ceohr/.gemini/antigravity/brain/677e380f-3df7-4240-a4b9-ec8cce555efc';
  const transcriptPath = path.join(brainDir, '.system_generated', 'logs', 'transcript_full.jsonl');
  const projectDir = path.resolve(__dirname, '..');

  if (!fs.existsSync(transcriptPath)) {
    console.error('Transcript not found at:', transcriptPath);
    return;
  }

  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const conversationEvents = [];

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const entry = JSON.parse(line);
      if (entry.type === 'USER_INPUT') {
        let content = entry.content || '';
        // Extract content between <USER_REQUEST> tags if present
        const match = content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
        const cleanContent = match ? match[1].trim() : content.trim();

        if (cleanContent) {
          conversationEvents.push({
            type: 'user',
            step: entry.step_index,
            time: entry.created_at,
            content: cleanContent,
          });
        }
      } else if (entry.type === 'PLANNER_RESPONSE') {
        const textContent = entry.content ? entry.content.trim() : '';
        const toolNames = entry.tool_calls ? entry.tool_calls.map((t) => t.name || t.toolName || 'tool') : [];

        if (textContent || toolNames.length > 0) {
          conversationEvents.push({
            type: 'assistant',
            step: entry.step_index,
            time: entry.created_at,
            content: textContent,
            tools: toolNames,
          });
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  console.log(`Parsed ${conversationEvents.length} dialogue steps.`);

  // 1. Generate Markdown Log
  let md = `# Clean & Earn (SafaiSaathi) — Antigravity Full Conversation & Development Log\n\n`;
  md += `**Project:** Clean & Earn (SafaiSaathi / सफ़ाई साथी)\n`;
  md += `**Platform:** Antigravity Pair-Programming Assistant\n`;
  md += `**Conversation ID:** \`677e380f-3df7-4240-a4b9-ec8cce555efc\`\n`;
  md += `**Export Timestamp:** ${new Date().toISOString()}\n\n`;
  md += `---\n\n`;

  conversationEvents.forEach((ev, idx) => {
    if (ev.type === 'user') {
      md += `### 👤 USER PROMPT [Step ${ev.step}] — ${ev.time || ''}\n\n`;
      md += `${ev.content}\n\n`;
      md += `---\n\n`;
    } else {
      md += `### 🤖 ANTIGRAVITY ASSISTANT [Step ${ev.step}] — ${ev.time || ''}\n\n`;
      if (ev.tools && ev.tools.length > 0) {
        md += `*Tools Executed:* \`${ev.tools.join('`, `')}\`\n\n`;
      }
      md += `${ev.content}\n\n`;
      md += `---\n\n`;
    }
  });

  const mdPath = path.join(projectDir, 'ANTIGRAVITY_FULL_CONVERSATION.md');
  fs.writeFileSync(mdPath, md, 'utf8');
  console.log(`Saved Markdown log to: ${mdPath}`);

  // 2. Generate Interactive Self-Contained HTML Viewer
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clean & Earn - Antigravity Development Session Transcript</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    pre, code { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
  <!-- Header -->
  <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-emerald-950/50">
        ✨
      </div>
      <div>
        <h1 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
          Antigravity Session Transcript
          <span class="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-mono font-medium border border-emerald-500/30">Verified</span>
        </h1>
        <p class="text-xs text-slate-400 font-mono">
          Conversation: 677e380f-3df7-4240-a4b9-ec8cce555efc • Clean & Earn (SafaiSaathi)
        </p>
      </div>
    </div>
    <div class="flex items-center space-x-3 text-xs">
      <span class="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
        ${conversationEvents.length} Dialogue Steps
      </span>
      <a href="https://garbage-rosy-six.vercel.app" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3.5 py-1.5 rounded-lg transition-colors">
        Live Web App ↗
      </a>
    </div>
  </header>

  <!-- Main Chat Flow -->
  <main class="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
`;

  conversationEvents.forEach((ev) => {
    if (ev.type === 'user') {
      const escaped = ev.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      html += `
    <!-- User Message -->
    <div class="flex items-start justify-end space-x-3">
      <div class="max-w-2xl bg-emerald-950/80 border border-emerald-700/60 rounded-2xl rounded-tr-sm p-4 text-emerald-50 shadow-lg">
        <div class="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-emerald-800/50">
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400">👤 User (Step ${ev.step})</span>
          <span class="text-[10px] text-emerald-300/60 font-mono">${ev.time ? ev.time.replace('T', ' ').slice(0, 19) : ''}</span>
        </div>
        <div class="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">${escaped}</div>
      </div>
      <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-md">
        U
      </div>
    </div>
`;
    } else {
      const escaped = ev.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const toolsBadge = (ev.tools && ev.tools.length > 0)
        ? `<div class="mb-3 flex flex-wrap gap-1.5">
            ${ev.tools.map((t) => `<span class="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">⚡ ${t}</span>`).join('')}
           </div>`
        : '';
      html += `
    <!-- Assistant Message -->
    <div class="flex items-start space-x-3">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-700 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-md">
        AG
      </div>
      <div class="max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-slate-200 shadow-xl w-full">
        <div class="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-slate-800">
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400">🤖 Antigravity Assistant (Step ${ev.step})</span>
          <span class="text-[10px] text-slate-500 font-mono">${ev.time ? ev.time.replace('T', ' ').slice(0, 19) : ''}</span>
        </div>
        ${toolsBadge}
        <div class="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-300 font-sans">${escaped}</div>
      </div>
    </div>
`;
    }
  });

  html += `
  </main>

  <!-- Footer -->
  <footer class="bg-slate-900 border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500 font-mono">
    Clean & Earn (SafaiSaathi) • Complete Antigravity Session Log • Exported for Academic & Project Review
  </footer>
</body>
</html>
`;

  const htmlPath = path.join(projectDir, 'antigravity_conversation_history.html');
  const pubHtmlPath = path.join(projectDir, 'public', 'antigravity_conversation_history.html');
  fs.writeFileSync(htmlPath, html, 'utf8');
  fs.writeFileSync(pubHtmlPath, html, 'utf8');
  console.log(`Saved HTML transcript viewer to: ${htmlPath} and ${pubHtmlPath}`);

  // 3. Package raw conversation brain directory for another computer
  const exportDir = path.join(projectDir, 'conversation-export');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Copy transcript.jsonl and transcript_full.jsonl
  fs.copyFileSync(path.join(brainDir, '.system_generated', 'logs', 'transcript.jsonl'), path.join(exportDir, 'transcript.jsonl'));
  fs.copyFileSync(transcriptPath, path.join(exportDir, 'transcript_full.jsonl'));

  // Create an automatic Windows import script
  const importBat = `@echo off
title Import Clean and Earn Antigravity Conversation
color 0A
echo ========================================================
echo   Antigravity Conversation Importer
echo   Target ID: 677e380f-3df7-4240-a4b9-ec8cce555efc
echo ========================================================
echo.
set "DEST=%USERPROFILE%\\.gemini\\antigravity\\brain\\677e380f-3df7-4240-a4b9-ec8cce555efc"

echo 1. Creating Antigravity brain directory on this computer...
if not exist "%DEST%\\.system_generated\\logs" mkdir "%DEST%\\.system_generated\\logs"

echo 2. Copying transcript files...
copy /Y "%~dp0transcript.jsonl" "%DEST%\\.system_generated\\logs\\transcript.jsonl"
copy /Y "%~dp0transcript_full.jsonl" "%DEST%\\.system_generated\\logs\\transcript_full.jsonl"

echo.
echo ========================================================
echo   SUCCESS! The conversation has been imported into Antigravity!
echo   When you open Antigravity on this computer, the session
echo   history and development steps will be fully visible.
echo ========================================================
echo.
pause
`;
  fs.writeFileSync(path.join(exportDir, 'import-conversation.bat'), importBat, 'utf8');
  console.log(`Conversation export package created in: ${exportDir}`);
}

exportConversation();
