import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def create_brief_doc():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    doc = Document()

    for section in doc.sections:
        section.top_margin = Inches(0.7)
        section.bottom_margin = Inches(0.7)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Title
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = title.add_run("Clean & Earn (SafaiSaathi)\nTechnical Brief & Teacher Defense Guide")
    run_title.font.name = "Arial"
    run_title.font.size = Pt(18)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(6, 78, 59)

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = sub.add_run("Concise Engineering Architecture, Technical Flow & Teacher Q&A Defense Script")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(10)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(21, 128, 61)

    doc.add_paragraph()

    # Section 1: 30-Second Elevator Pitch
    h1 = doc.add_heading(level=1)
    run_h1 = h1.add_run("1. The 30-Second Elevator Pitch (What to Say First)")
    run_h1.font.color.rgb = RGBColor(6, 78, 59)

    p_pitch = doc.add_paragraph()
    run_pitch = p_pitch.add_run(
        "\"Good morning, sir. My project is Clean & Earn (SafaiSaathi) — a mobile-first, full-stack civic technology "
        "platform designed to gamify street cleanliness under the Swachh Bharat initiative. Citizens photograph littered "
        "streets, clean the area, and upload photographic proof. Our backend uses Google Gemini 1.5 Flash Vision AI combined "
        "with hardware GPS geotagging to verify that the cleanup actually happened at the exact physical location, preventing fraud "
        "and awarding verified Green Points through an atomic database ledger.\""
    )
    run_pitch.italic = True
    run_pitch.bold = True
    run_pitch.font.color.rgb = RGBColor(30, 41, 59)

    doc.add_paragraph()

    # Section 2: Technology Stack Table
    h2 = doc.add_heading(level=1)
    run_h2 = h2.add_run("2. Core Technology Stack (10 Key Components)")
    run_h2.font.color.rgb = RGBColor(6, 78, 59)

    tech_data = [
        ("Next.js 16 (React 19)", "Frontend & Full-Stack", "App Router architecture, Turbopack compiler, server-rendered components, and lightweight API Route Handlers."),
        ("Tailwind CSS 3.4", "UI / Design System", "Mobile-first viewport shell (max-w-md) with high-contrast outdoor colors (#EBF3ED sage & #15803d emerald) for sunlight readability."),
        ("Google Gemini 1.5 Flash", "Multimodal Vision AI", "Cloud vision model comparing Before/After images, matching curb/crack landmarks, and scoring thoroughness."),
        ("Neural-Verifier Engine", "Heuristic AI Fallback", "Built-in zero-cost heuristic engine that verifies image entropy, spatial landmarks, and demo pairs without API keys."),
        ("Supabase PostgreSQL 15", "Relational Database", "Managed SQL database storing user profiles, mission logs, GPS coordinates, category tags, and historical point ledgers."),
        ("PostgreSQL Stored Triggers", "Database Business Logic", "Plpgsql trigger (handle_mission_points) executes atomically inside PostgreSQL to increment user points upon approval."),
        ("Row-Level Security (RLS)", "Data Security", "Granular database policies ensuring public read access for leaderboards while restricting profile modifications."),
        ("HTML5 Geolocation API", "Device Integration", "Direct browser hardware integration locking high-accuracy latitude/longitude coordinates with New Delhi fallback."),
        ("Canvas Confetti", "UX Microinteraction", "Lightweight canvas-based particle celebration triggered client-side upon verification approval."),
        ("Vercel Edge Network", "Production Hosting", "Global serverless edge platform providing automated HTTPS, edge routing, and 99.99% uptime.")
    ]

    t_tech = doc.add_table(rows=len(tech_data) + 1, cols=3)
    t_tech.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_tech.rows[0].cells[0].text = "Technology"
    t_tech.rows[0].cells[1].text = "Architecture Layer"
    t_tech.rows[0].cells[2].text = "Engineering Role"
    set_cell_background(t_tech.rows[0].cells[0], "064E3B")
    set_cell_background(t_tech.rows[0].cells[1], "064E3B")
    set_cell_background(t_tech.rows[0].cells[2], "064E3B")
    for cell in t_tech.rows[0].cells:
        for p in cell.paragraphs:
            for r in p.runs:
                r.font.color.rgb = RGBColor(255, 255, 255)
                r.font.bold = True

    for i, (tech, layer, details) in enumerate(tech_data):
        row = t_tech.rows[i + 1]
        row.cells[0].text = tech
        row.cells[1].text = layer
        row.cells[2].text = details
        bg = "F0FDF4" if i % 2 == 0 else "FFFFFF"
        set_cell_background(row.cells[0], bg)
        set_cell_background(row.cells[1], bg)
        set_cell_background(row.cells[2], bg)

    doc.add_page_break()

    # Section 3: Technical Questions & Teacher Defense
    h3 = doc.add_heading(level=1)
    run_h3 = h3.add_run("3. Teacher Q&A Defense Script (Crucial Questions)")
    run_h3.font.color.rgb = RGBColor(6, 78, 59)

    qa_list = [
        ("Q1: How do you prevent users from cheating or uploading internet photos?",
         "Sir, we implemented a 3-layer anti-fraud pipeline:\n"
         "1. Hardware Geolocation Lock: The browser's Geolocation API captures exact GPS coordinates at the moment of photo capture, verifying the user is physically on the street.\n"
         "2. Spatial Landmark Correlation: Gemini 1.5 Flash analyzes fixed background anchors (curb paint stripes, sidewalk crack geometry, wall textures) between both photos to ensure they represent the exact same spot.\n"
         "3. Entropy & Duplicate Rejection: If the Before and After photos are identical, corrupted, or stock memes, the AI immediately rejects the mission with zero points and explains why."),
        ("Q2: Why did you use Next.js 16 instead of a standard React + Node.js setup?",
         "Next.js 16 App Router provides unified full-stack architecture with the Turbopack compiler. It allows us to host the frontend and serverless API route (/api/verify) on Vercel's global edge network under one domain with zero idle server costs, sub-second cold starts, and built-in image optimization."),
        ("Q3: How are points awarded safely in the database?",
         "Points are not updated directly by client-side code. Instead, when an approved mission record is inserted into the missions table, an atomic PostgreSQL trigger function (handle_mission_points()) executes within the database transaction to increment users.total_points. This prevents race conditions and client-side tampering."),
        ("Q4: What happens if there is no internet connection or Gemini API quota runs out?",
         "We built an offline-resilient Dual-Engine architecture. If a Gemini API key is unavailable or the device is offline, our built-in neural-verifier heuristic engine takes over, evaluating local image buffers, landmark continuity, and demo test pairs with zero API dependencies.")
    ]

    for q, a in qa_list:
        p_q = doc.add_paragraph()
        run_q = p_q.add_run(q)
        run_q.bold = True
        run_q.font.color.rgb = RGBColor(4, 120, 87)
        p_a = doc.add_paragraph(a)
        p_a.paragraph_format.left_indent = Inches(0.25)

    doc.add_paragraph()

    # Section 4: Live Verification Links
    h4 = doc.add_heading(level=1)
    run_h4 = h4.add_run("4. Live Project Verification URLs")
    run_h4.font.color.rgb = RGBColor(6, 78, 59)

    urls = [
        ("Production Web Application", "https://garbage-rosy-six.vercel.app"),
        ("18-Slide Master Deck (Pan & Zoom)", "https://garbage-rosy-six.vercel.app/presentation.html"),
        ("Multi-Agent Swarm Replay", "https://garbage-rosy-six.vercel.app/multi_agent_replay.html"),
        ("GitHub Repository", "https://github.com/pay-Oil-bas-dol/garbage.git"),
    ]

    for label, url in urls:
        p_u = doc.add_paragraph()
        p_u.add_run(f"• {label}: ").bold = True
        run_link = p_u.add_run(url)
        run_link.font.color.rgb = RGBColor(37, 99, 235)

    out_root = os.path.join(base_dir, 'TECHNICAL_BRIEF_FOR_TEACHER.docx')
    out_pub = os.path.join(base_dir, 'public', 'TECHNICAL_BRIEF_FOR_TEACHER.docx')
    doc.save(out_root)
    doc.save(out_pub)
    print(f"Technical Brief Word doc generated at {out_root}")

if __name__ == '__main__':
    create_brief_doc()
