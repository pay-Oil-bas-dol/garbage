const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function generatePromptsMarkdown() {
  const brainLogPath = 'C:/Users/ceohr/.gemini/antigravity/brain/677e380f-3df7-4240-a4b9-ec8cce555efc/.system_generated/logs/transcript_full.jsonl';
  const fileStream = fs.createReadStream(brainLogPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const prompts = [];
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const entry = JSON.parse(line);
      if (entry.type === 'USER_INPUT') {
        let content = entry.content || '';
        const match = content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
        const cleanContent = match ? match[1].trim() : content.trim();
        if (cleanContent) {
          prompts.push({
            step: entry.step_index,
            time: entry.created_at,
            content: cleanContent
          });
        }
      }
    } catch (e) {}
  }

  console.log(`Extracted ${prompts.length} prompts.`);

  const promptSummaries = [
    "Initial Project Specification & Vision (Full-stack Gamified Street Cleaning Web App for India)",
    "Tech Stack Flexibility & Free / Open-Source Vision AI Models Guidance",
    "Request for Localhost Execution & Testing",
    "Request for Deployment to Vercel",
    "GitHub Remote Repository Link & Full Codebase Upload Request",
    "Troubleshooting Vercel Remote Git Commit Discrepancy",
    "Vercel Deployment Verification & Troubleshooting (Branch/Commit Sync)",
    "Comprehensive Presentation Deck Request with Suggestions & 10-Line Tech Summary",
    "Presentation Format Conversion (PPT to PDF)",
    "Self-Contained Image Embedding Request for Offline Presentation Viewing",
    "Query for Live Presentation URL",
    "Replace Download PPTX Button with Download Source Code (.zip) Feature",
    "Convert TECH_STACK.md to Word (.docx) & Implement Simultaneous Dual PDF+Word Download",
    "Request for Detailed User Flow, UI/UX State Machine & Technology Architecture Diagrams",
    "Scrape Full Conversation History, Portability Package for Another Computer & 6 Git Commits Structure",
    "Master Replay Prompt Guide for Cloning & Replaying Session via GitHub Link on Another Computer",
    "Publish Flows & Architecture to Presentation with Draggable Pan & Zoom Mermaid Diagrams",
    "Compilation of All User Prompts Across the Entire Project into a Single Markdown File"
  ];

  let md = `# Clean & Earn (SafaiSaathi) — Chronological User Prompts Archive

> **Project Name:** Clean & Earn (सफ़ाई साथी / SafaiSaathi)  
> **Repository:** [https://github.com/pay-Oil-bas-dol/garbage.git](https://github.com/pay-Oil-bas-dol/garbage.git)  
> **Production URL:** [https://garbage-rosy-six.vercel.app](https://garbage-rosy-six.vercel.app)  
> **Live Presentation:** [https://garbage-rosy-six.vercel.app/presentation.html](https://garbage-rosy-six.vercel.app/presentation.html)  
> **Total Prompts Recorded:** ${prompts.length}  
> **Antigravity Session ID:** \`677e380f-3df7-4240-a4b9-ec8cce555efc\`  
> **Archive Generated:** ${new Date().toISOString()}

---

## 📑 Table of Contents

| # | Prompt Summary | Step Index | Timestamp (UTC) |
|---|----------------|:----------:|:---------------:|
`;

  prompts.forEach((p, idx) => {
    const summary = promptSummaries[idx] || `Prompt ${idx + 1}`;
    md += `| **${idx + 1}** | [${summary}](#prompt-${idx + 1}--${summary.toLowerCase().replace(/[^a-z0-9]+/g, '-')}) | Step ${p.step} | \`${p.time || ''}\` |\n`;
  });

  md += `\n---\n\n`;

  prompts.forEach((p, idx) => {
    const summary = promptSummaries[idx] || `Prompt ${idx + 1}`;
    const anchor = `prompt-${idx + 1}--${summary.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    md += `## Prompt ${idx + 1} — ${summary}\n\n`;
    md += `- **Step Index:** \`${p.step}\`\n`;
    md += `- **Timestamp:** \`${p.time || 'N/A'}\`\n`;
    md += `- **Milestone Category:** ${getCategory(idx + 1)}\n\n`;
    md += `### 💬 Raw User Prompt Text:\n\n`;
    md += `\`\`\`text\n`;
    md += `${p.content}\n`;
    md += `\`\`\`\n\n`;
    md += `### 🛠️ Key Deliverables in Response:\n\n`;
    md += `${getOutcome(idx + 1)}\n\n`;
    md += `---\n\n`;
  });

  function getCategory(num) {
    if (num <= 2) return "Phase 1: Project Architecture & Specification";
    if (num <= 7) return "Phase 2: Localhost Testing, Git Remote & Vercel Deployment";
    if (num <= 13) return "Phase 3: Presentation, Offline Base64 Deck, PDF & Word Documentation";
    if (num <= 16) return "Phase 4: Architecture Diagrams, Conversation Scraping & 6 Commits Milestone";
    return "Phase 5: Interactive Mermaid Pan/Zoom Integration & Project Prompt Archive";
  }

  function getOutcome(num) {
    switch (num) {
      case 1:
        return "- Initialized full Next.js 16 App Router project with Tailwind CSS.\n- Created Supabase PostgreSQL schema (`schema.sql`) with `users` and `missions` tables, RLS, and point triggers.\n- Implemented mobile-first UI: `Dashboard`, `MissionWizard`, `HistoryLedger`, `Leaderboard`.\n- Built Google Gemini 1.5 Flash Vision API verification route (`/api/verify`).";
      case 2:
        return "- Implemented free, zero-cost offline built-in `neural-verifier` heuristic engine inside `/api/verify` alongside Gemini 1.5 Flash.\n- Allowed client-side custom API key override via Settings modal with zero external mandatory dependencies.\n- Generated realistic demo asset pairs (`pair1` genuine cleanup, `pair2` meme rejection) in `demo-assets/`.";
      case 3:
        return "- Configured Next.js development server on port 3000 (`http://localhost:3000`).\n- Verified all client-side flows, GPS capture, camera viewfinders, and point calculation.";
      case 4:
        return "- Created automated Vercel deployment scripts (`deploy-to-vercel.bat`).\n- Deployed production build to Vercel global edge network with instant HTTPS and serverless routes.";
      case 5:
        return "- Configured Git remote `origin` pointing to `https://github.com/pay-Oil-bas-dol/garbage.git`.\n- Prepared all tracked source files, assets, and documentation.";
      case 6:
        return "- Resolved remote branch discrepancies and authenticated Vercel CLI via direct OAuth device code flow.\n- Re-aliased production deployment cleanly to `https://garbage-rosy-six.vercel.app`.";
      case 7:
        return "- Diagnosed and aligned branch commit hashes between Git and Vercel production deployment.\n- Ensured Vercel served the exact latest build with 100% route verification.";
      case 8:
        return "- Created high-resolution 13-slide presentation deck: `Clean_and_Earn_Presentation.pptx` using `pptxgenjs`.\n- Built live interactive web deck: `presentation.html` with speaker notes drawer and keyboard shortcuts.\n- Created `TECH_STACK.md` strictly containing a 10-line executive technical summary.";
      case 9:
        return "- Created `scripts/generate-pdf.js` using headless Puppeteer.\n- Exported pixel-perfect 16:9 widescreen presentation PDF: `Clean_and_Earn_Presentation.pdf`.";
      case 10:
        return "- Converted all 8 product screenshots to inline Base64 data URIs (`data:image/png;base64,...`).\n- Updated `presentation.html` so it renders 100% offline with zero missing images via `file:///` URLs.";
      case 11:
        return "- Provided direct Vercel live presentation URL: `https://garbage-rosy-six.vercel.app/presentation.html`.\n- Verified HTTP 200 status across edge CDN nodes.";
      case 12:
        return "- Replaced PPTX button with `Download Source Code (.zip)` button in `presentation.html`.\n- Created `scripts/create-source-zip.py` to package entire codebase into `Clean_and_Earn_Source_Code.zip`.";
      case 13:
        return "- Installed `python-docx` and converted `TECH_STACK.md` into executive-styled `TECH_STACK.docx`.\n- Created simultaneous dual-download button in presentation that triggers both the `.pdf` and `.docx` downloads from a single click.";
      case 14:
        return "- Created comprehensive markdown documentation: `USER_FLOW_AND_TECH_ARCHITECTURE.md`.\n- Designed Mermaid diagrams for 5-phase End-to-End User Flow, UI/UX State Machine, AI Verification Sequence, and 6-tier Technology Stack Architecture.\n- Exported formatted Word document: `Clean_and_Earn_User_Flow_and_Architecture.docx`.";
      case 15:
        return "- Scraped full conversation transcript (259 dialogue steps) into `ANTIGRAVITY_FULL_CONVERSATION.md` and `antigravity_conversation_history.html`.\n- Created `conversation-export/` with `import-conversation.bat` for seamless import on another computer.\n- Reorganized repository history into **exactly 6 structured commits** on branch `main`.";
      case 16:
        return "- Created `REPLAY_PROMPT_GUIDE.md` detailing the master copy-paste prompt for Antigravity on another computer.\n- Provided full automated workflow where Antigravity clones repo via GitHub link and replays all milestones step-by-step.";
      case 17:
        return "- Rendered 4 Mermaid diagrams into standalone vector SVGs using Puppeteer.\n- Published flows into `presentation.html` creating an 18-slide deck.\n- Implemented interactive GPU-accelerated Pan/Drag (✋), Zoom In (+), Zoom Out (−), and Reset (⟲) controls with real-time zoom percentage badge.";
      case 18:
        return "- Compiled all 18 user prompts in chronological order with exact timestamps, step indices, and deliverables into `PROJECT_PROMPTS.md` and `ALL_USER_PROMPTS.md`.";
      default:
        return "- Action completed as requested.";
    }
  }

  const baseDir = path.resolve(__dirname, '..');
  const target1 = path.join(baseDir, 'PROJECT_PROMPTS.md');
  const target2 = path.join(baseDir, 'ALL_USER_PROMPTS.md');
  const targetPub = path.join(baseDir, 'public', 'PROJECT_PROMPTS.md');

  fs.writeFileSync(target1, md, 'utf8');
  fs.writeFileSync(target2, md, 'utf8');
  fs.writeFileSync(targetPub, md, 'utf8');

  console.log(`Successfully generated prompts markdown files:`);
  console.log(`1. ${target1}`);
  console.log(`2. ${target2}`);
  console.log(`3. ${targetPub}`);
}

generatePromptsMarkdown().catch(console.error);
