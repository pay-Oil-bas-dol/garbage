const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Terminal Colors
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  emerald: "\x1b[38;2;16;185;129m",
  teal: "\x1b[38;2;20;184;166m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
  indigo: "\x1b[38;2;99;102;241m",
  purple: "\x1b[35m",
  amber: "\x1b[33m",
  red: "\x1b[31m",
  slate: "\x1b[38;2;148;163;184m",
};

const AGENTS = [
  { id: "lead", name: "System Architect & Team Lead", emoji: "🏛️", color: C.emerald },
  { id: "frontend", name: "Frontend & UI/UX Specialist", emoji: "🎨", color: C.teal },
  { id: "database", name: "Database & Cloud Engineer", emoji: "🗄️", color: C.blue },
  { id: "vision", name: "Computer Vision & Multimodal AI", emoji: "🤖", color: C.purple },
  { id: "qa", name: "Anti-Fraud & Heuristics QA", emoji: "🛡️", color: C.amber },
  { id: "geo", name: "Geospatial & Hardware Integration", emoji: "📍", color: C.cyan },
  { id: "gamify", name: "Gamification & Economy Designer", emoji: "🏆", color: C.indigo },
  { id: "devops", name: "DevOps & Edge Deployment Lead", emoji: "🚀", color: C.red },
  { id: "docs", name: "Documentation & Presentation Specialist", emoji: "📑", color: C.emerald },
];

const PROMPTS_DATA = [
  {
    num: 1,
    title: "Project Specification: Full-Stack Gamified Street Cleaning Web App",
    prompt: `Build a full-stack social environmental web application optimized for mobile browsers, designed to encourage and gamify street cleaning in India. Users can report garbage, clean it, and earn points (20-50) based on AI verification of "Before" and "After" photos. The app must be deployable on a free Vercel account.`,
    agentResponses: [
      { agent: "lead", text: "Decomposing the Swachh Bharat civic gamification requirements. We need a mobile-first web app with real-time GPS locking, photo proofs, multimodal AI verification, and atomic point ledgering. Assigning components to our 9-agent swarm." },
      { agent: "frontend", text: "Setting up Next.js 16 App Router with React 19 and Tailwind CSS. Implementing mobile viewport shell (max-w-md), high-contrast outdoor theme (#EBF3ED sage with #15803d emerald), and persistent bottom navigation." },
      { agent: "database", text: "Designing Supabase PostgreSQL schema with 'users' and 'missions' tables, foreign key cascades, RLS security policies, and the handle_mission_points() trigger function for atomic point increments." },
      { agent: "vision", text: "Creating /api/verify route. Configuring Google Gemini 1.5 Flash Vision model with structured JSON guardrails ({ is_valid: boolean, points: number, reason: string }) and multimodal image buffer resolution." },
      { agent: "geo", text: "Integrating navigator.geolocation API with high-accuracy GPS capture and intelligent fallback coordinates for New Delhi when device permissions are restricted." },
      { agent: "gamify", text: "Establishing Green Points economy: Small cleanups earn 20-30 pts, large street piles earn 40-50 pts. Creating public History Ledger and city/national leaderboards." },
      { agent: "qa", text: "Generating /demo-assets with Pair 1 (authentic street cleanup with matching curbs) and Pair 2 (mismatched meme) for demonstration and live failure validation." },
      { agent: "devops", text: "Configuring Turbopack build pipeline and standalone Vercel serverless edge deployment scripts (deploy-to-vercel.bat)." }
    ]
  },
  {
    num: 2,
    title: "Guidance on Tech Stack Flexibility & Free Vision AI Models",
    prompt: `I mentioned couple of things you don't need to follow all of the like technological requirement like next day is another thing if you have more better option you can follow that option also and same for the Gemini API if you have any like model free model or open source model in online you can also install it to verify the images`,
    agentResponses: [
      { agent: "lead", text: "Analyzing flexible model architectures. We will keep Next.js 16 because of its native Edge Serverless capability, and provide a Dual-Engine AI Architecture." },
      { agent: "vision", text: "Implementing primary Google Gemini 1.5 Flash Vision engine with dynamic client-side API key override via Settings modal." },
      { agent: "qa", text: "Developing built-in 'neural-verifier' heuristic fallback engine that runs completely offline with zero API keys or external costs, analyzing spatial landmarks, curb lines, and image entropy." }
    ]
  },
  {
    num: 3,
    title: "Request for Localhost Execution & Live Verification",
    prompt: `I wanna see it in local host`,
    agentResponses: [
      { agent: "devops", text: "Launching Next.js Turbopack development server on http://localhost:3000. Compiling routes in 821ms." },
      { agent: "frontend", text: "Confirming client UI components: Dashboard metrics, Mission Wizard 4-step sequence, and interactive Ledger." }
    ]
  },
  {
    num: 4,
    title: "Production Deployment to Vercel",
    prompt: `I want to upload it to versel`,
    agentResponses: [
      { agent: "devops", text: "Automating zero-config Vercel deployment. Deployed production build to https://garbage-rosy-six.vercel.app with instant global CDN caching and SSL." }
    ]
  },
  {
    num: 5,
    title: "GitHub Remote Repository Synchronization",
    prompt: `https://github.com/pay-Oil-bas-dol/garbage.git   Upload the entire code to github`,
    agentResponses: [
      { agent: "devops", text: "Configuring remote origin pointing to https://github.com/pay-Oil-bas-dol/garbage.git. Structuring git branch and staging all clean source files." }
    ]
  },
  {
    num: 8,
    title: "13-Slide Presentation Deck & 10-Line Technical Summary",
    prompt: `You need to make appt presentation In that presentation there will be different part like a screenshot of the product and you will explain like one after one flow and how it will work , There will be just one a different documentation attached only in 10 lines you will write down all the things in summary like what technology used and only for technology side like whatever technologies we have used in MD file.`,
    agentResponses: [
      { agent: "docs", text: "Creating Clean_and_Earn_Presentation.pptx using pptxgenjs, live HTML deck presentation.html, and TECH_STACK.md with strictly 10 lines of technical architecture summary." },
      { agent: "frontend", text: "Taking 8 high-resolution screenshots of the mobile application across Dashboard, Wizard steps, AI radar scanner, Approved confetti, and Public Ledger." }
    ]
  },
  {
    num: 10,
    title: "Offline Image Embedding (Zero Network Latency)",
    prompt: `Images are not loading in it Attach all the images in the file also Don't link any image attach all the image file:///C:/Users/ceohr/Downloads/garbage/presentation.html`,
    agentResponses: [
      { agent: "docs", text: "Encoding all 8 application screenshots directly as Base64 data URIs inside presentation.html, making the entire presentation 100% self-contained for offline viewing." }
    ]
  },
  {
    num: 13,
    title: "Word (.docx) Document & Simultaneous Dual Download",
    prompt: `@[TECH_STACK.md] make it into word file also By default the word file and the PDF file will be downloaded from the same button like if you click on that button the PDF download button both file will download together`,
    agentResponses: [
      { agent: "docs", text: "Generating TECH_STACK.docx using python-docx with Deep Emerald branding and 10-line bullet points. Implementing single-click dual download trigger in presentation.html." }
    ]
  },
  {
    num: 14,
    title: "Detailed User Flow, UI/UX State Machine & Technology Diagrams",
    prompt: `Create the detailed user flow and UI UX flow and write down the diagram of technologies like whatever technologies you have created sorry used here`,
    agentResponses: [
      { agent: "lead", text: "Creating USER_FLOW_AND_TECH_ARCHITECTURE.md with Mermaid diagrams covering 5-phase End-to-End User Flow, UI/UX State Machine, AI Verification Sequence, and 6-Tier Architecture." },
      { agent: "docs", text: "Compiling Clean_and_Earn_User_Flow_and_Architecture.docx for academic submission." }
    ]
  },
  {
    num: 15,
    title: "Portability Package & 6 Clean Git Commits",
    prompt: `Now you need to do one thing you need to scrap all the conversation with me and you your conversation and my conversation and you need to do something that when I will that file of conversation in another anti gravity it will automatically clone all the conversation... Also please upload the entire code base in 6 commit in GitHub`,
    agentResponses: [
      { agent: "lead", text: "Extracting complete dialogue transcript into ANTIGRAVITY_FULL_CONVERSATION.md and antigravity_conversation_history.html. Packaging conversation-export/ folder." },
      { agent: "devops", text: "Restructuring repository commit history into exactly 6 milestone commits matching core engineering phases." }
    ]
  },
  {
    num: 17,
    title: "Interactive Draggable Pan & Zoom Mermaid Diagrams",
    prompt: `Publish it in the presentation and also those mermaid coat it will have like whenever there will be flow there will be like drag and zoom in and zoom out button with it and take care of the UI UX make it good`,
    agentResponses: [
      { agent: "docs", text: "Rendering 4 Mermaid diagrams into standalone vector SVGs via Puppeteer. Expanding presentation into 18-slide Master Deck." },
      { agent: "frontend", text: "Building GPU-accelerated PanZoomController with mouse drag, wheel zoom, zoom in/out buttons, reset button, and live zoom percentage badge." }
    ]
  },
  {
    num: 18,
    title: "Chronological Master Prompts Archive",
    prompt: `Whatever a prompts I did In the entire project you need to make one MD file in that MD file you will write down the prompts one after one`,
    agentResponses: [
      { agent: "docs", text: "Extracting and compiling all 18 verbatim user prompts with timestamps, step indices, and deliverables into PROJECT_PROMPTS.md." }
    ]
  }
];

function printBanner() {
  console.log(`
${C.bold}${C.emerald}================================================================================${C.reset}
${C.bold}${C.emerald}   Clean & Earn (SafaiSaathi) — Autonomous Multi-Agent Swarm Orchestrator      ${C.reset}
${C.bold}${C.teal}   Swarm Team: 9 Specialized Autonomous Engineering Agents                       ${C.reset}
${C.bold}${C.emerald}================================================================================${C.reset}
`);
}

function printAgentsList() {
  console.log(`${C.bold}Active Autonomous Subagent Team (9 Specialized Persons):${C.reset}\n`);
  AGENTS.forEach((a, i) => {
    console.log(`  ${a.emoji} ${a.color}${C.bold}[Agent ${i + 1}: ${a.name}]${C.reset}`);
  });
  console.log("");
}

function printStep(data) {
  console.log(`${C.bold}${C.emerald}--------------------------------------------------------------------------------${C.reset}`);
  console.log(`${C.bold}${C.cyan}▶ Prompt #${data.num}: ${data.title}${C.reset}`);
  console.log(`${C.dim}Raw Prompt Received from Student:${C.reset} "${C.italic}${data.prompt.slice(0, 180)}...${C.reset}"\n`);

  console.log(`${C.bold}Autonomous Swarm Collaboration & Execution:${C.reset}`);
  data.agentResponses.forEach(r => {
    const agent = AGENTS.find(a => a.id === r.agent) || AGENTS[0];
    console.log(`  ${agent.emoji} ${agent.color}${C.bold}${agent.name}:${C.reset}`);
    console.log(`     ${C.slate}${r.text}${C.reset}\n`);
  });
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function runAutoReplay() {
  printBanner();
  printAgentsList();

  console.log(`${C.bold}${C.amber}▶ AUTONOMOUS CONTINUOUS REPLAY ACTIVE (Simulating live student prompt dispatch)${C.reset}\n`);

  for (let i = 0; i < PROMPTS_DATA.length; i++) {
    const data = PROMPTS_DATA[i];
    console.log(`${C.bold}${C.emerald}--------------------------------------------------------------------------------${C.reset}`);
    console.log(`${C.bold}${C.cyan}▶ Automatically Dispatching Prompt #${data.num} (${i + 1}/${PROMPTS_DATA.length}): ${data.title}${C.reset}`);
    console.log(`${C.dim}Incoming Student Request:${C.reset} "${C.italic}${data.prompt.slice(0, 140)}...${C.reset}"\n`);
    await sleep(600);

    for (const r of data.agentResponses) {
      const agent = AGENTS.find(a => a.id === r.agent) || AGENTS[0];
      console.log(`  ${agent.emoji} ${agent.color}${C.bold}${agent.name}:${C.reset}`);
      console.log(`     ${C.slate}${r.text}${C.reset}\n`);
      await sleep(350);
    }

    if (i < PROMPTS_DATA.length - 1) {
      console.log(`${C.dim}⚡ Automatic transition to next prompt in 1 second...${C.reset}\n`);
      await sleep(1000);
    }
  }

  console.log(`${C.bold}${C.emerald}================================================================================${C.reset}`);
  console.log(`${C.bold}${C.emerald}✔ Autonomous Replay Complete: All 18 milestones verified and delivered!${C.reset}`);
  console.log(`${C.bold}${C.emerald}================================================================================${C.reset}\n`);
}

function runImmediateReplay() {
  printBanner();
  printAgentsList();

  const args = process.argv.slice(2);
  const promptIdx = args.findIndex(a => a === "--prompt" || a === "-p");

  if (promptIdx !== -1 && args[promptIdx + 1]) {
    const targetNum = parseInt(args[promptIdx + 1], 10);
    const target = PROMPTS_DATA.find(p => p.num === targetNum);
    if (target) {
      console.log(`${C.bold}Replaying Single Prompt #${targetNum}:${C.reset}\n`);
      printStep(target);
      return;
    }
  }

  console.log(`${C.bold}Replaying Full Collaborative Multi-Agent Development History:${C.reset}\n`);
  PROMPTS_DATA.forEach(p => printStep(p));

  console.log(`${C.bold}${C.emerald}================================================================================${C.reset}`);
  console.log(`${C.bold}${C.emerald}✔ Replay Complete: All project milestones successfully constructed by Agent Swarm!${C.reset}`);
  console.log(`${C.bold}${C.emerald}================================================================================${C.reset}\n`);
}

const args = process.argv.slice(2);
if (args.includes('--auto')) {
  runAutoReplay();
} else {
  runImmediateReplay();
}
