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

def create_flow_document():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    doc = Document()

    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Title
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = title.add_run("Clean & Earn (सफ़ाई साथी)\nUser Flow, UI/UX & Technology Architecture")
    run_title.font.name = "Arial"
    run_title.font.size = Pt(20)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(6, 78, 59)

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = sub.add_run("Detailed Step-by-Step Flows, Screen Interaction States & Full System Architecture")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(11)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(21, 128, 61)

    doc.add_paragraph()

    # Section 1: Executive Summary
    h1 = doc.add_heading(level=1)
    run_h1 = h1.add_run("1. Executive Summary")
    run_h1.font.color.rgb = RGBColor(6, 78, 59)

    p1 = doc.add_paragraph(
        "Clean & Earn is a full-stack, mobile-first environmental action platform that gamifies community cleanliness. "
        "By combining real-time mobile image capture, automated GPS geotagging, Google Gemini Vision AI verification, "
        "and an instant Green Points reward economy, the platform transforms individual cleanup efforts into verifiable civic impact."
    )

    # Section 2: Detailed End-to-End User Flow
    h2 = doc.add_heading(level=1)
    run_h2 = h2.add_run("2. Detailed End-to-End User Flow")
    run_h2.font.color.rgb = RGBColor(6, 78, 59)

    phases = [
        ("Phase 1: Discovery & Onboarding", [
            "User navigates to the web application URL on any mobile device or browser.",
            "Inspects real-time community cleaning impact counter and live Green Points banner.",
            "Session initialization: Automatically loads saved points and city preference (or creates a zero-friction guest profile via LocalStorage)."
        ]),
        ("Phase 2: Mission Initiation & Setup", [
            "User taps the prominent 'Start Clean Mission' floating action button.",
            "Selects waste category: Plastic Waste, Mixed Street Litter, Organic/Wet, Construction, E-Waste, or Hazardous.",
            "High-Accuracy GPS Geotagging: Web Geolocation API captures exact device latitude and longitude coordinates.",
            "Before Photo Capture: Snaps or uploads a high-resolution photo documenting street litter prior to cleaning."
        ]),
        ("Phase 3: Physical Action & Proof Capture", [
            "Citizen performs the physical cleanup activity (sweeping, collecting, segregating into municipal/eco bags).",
            "After Photo Capture: Snaps the cleaned area from the identical physical angle and viewpoint.",
            "Optional 360-degree video upload for enhanced municipal audit compliance.",
            "User submits the pair for automated AI analysis."
        ]),
        ("Phase 4: Multimodal AI Verification", [
            "Next.js serverless route (/api/verify) receives image buffers and metadata.",
            "Dispatches multimodal comparison to Google Gemini 1.5 Flash Vision AI (with fallback to built-in neural-verifier).",
            "Checks landmark correspondence (curb lines, sidewalk cracks, background structures) to detect fraud.",
            "Calculates cleanup thoroughness and assigns 20 to 50 Green Points."
        ]),
        ("Phase 5: Celebration, Ledger & Rewards", [
            "Upon approval, celebratory canvas-confetti bursts across the screen.",
            "Green Points are instantly credited to the user's ledger and persisted via Supabase PostgreSQL triggers.",
            "Before/After transformation card is logged in the public History Ledger with an interactive comparison slider.",
            "User climbs the city and national leaderboards and redeems points for civic rewards and partner vouchers."
        ])
    ]

    for phase_title, steps in phases:
        p_phase = doc.add_paragraph()
        run_p = p_phase.add_run(f"• {phase_title}")
        run_p.bold = True
        run_p.font.color.rgb = RGBColor(4, 120, 87)
        for step in steps:
            p_step = doc.add_paragraph(f"    - {step}")
            p_step.paragraph_format.left_indent = Inches(0.25)

    doc.add_page_break()

    # Section 3: UI / UX Screen State Flow
    h3 = doc.add_heading(level=1)
    run_h3 = h3.add_run("3. UI / UX Screen State Flow")
    run_h3.font.color.rgb = RGBColor(6, 78, 59)

    screens = [
        ("Dashboard (Home)", "Central command hub displaying total earned Green Points, Swachh Bharat motivational quotes, active category badges, recent cleanups, and a 1-tap quick mission launcher."),
        ("Mission Wizard - Step 1", "Setup screen with 6 waste category selection cards, live GPS coordinates acquisition badge, and high-contrast camera capture button for the 'Before' state."),
        ("Mission Wizard - Step 2", "Proof screen showing before preview, side-by-side 'After' camera capture trigger, optional video upload field, and 'Verify Mission with AI' CTA."),
        ("Verification Loader", "Multi-phase interactive progress screen with animated pulsing scanner ('Checking GPS bounds...', 'Scanning spatial landmarks...', 'Evaluating trash reduction volume...')."),
        ("Celebration & Results Modal", "Celebratory confetti burst modal displaying awarded Green Points, AI authenticity score (%), thoroughness rating (%), debris volume level, and detailed AI feedback notes."),
        ("History Ledger", "Interactive public ledger featuring a draggable Before/After image comparison slider, waste category tags, timestamp, and audit details."),
        ("Leaderboard", "Competitive civic rankings with Gold, Silver, and Bronze badges, user profile highlight bar, and toggle switches between City and National tiers.")
    ]

    t_screens = doc.add_table(rows=len(screens) + 1, cols=2)
    t_screens.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_screens.rows[0].cells[0].text = "Screen / State"
    t_screens.rows[0].cells[1].text = "UX Interactions & Visual Layout"
    set_cell_background(t_screens.rows[0].cells[0], "064E3B")
    set_cell_background(t_screens.rows[0].cells[1], "064E3B")
    for cell in t_screens.rows[0].cells:
        for p in cell.paragraphs:
            for r in p.runs:
                r.font.color.rgb = RGBColor(255, 255, 255)
                r.font.bold = True

    for i, (scr, desc) in enumerate(screens):
        row = t_screens.rows[i + 1]
        row.cells[0].text = scr
        row.cells[1].text = desc
        bg = "F0FDF4" if i % 2 == 0 else "FFFFFF"
        set_cell_background(row.cells[0], bg)
        set_cell_background(row.cells[1], bg)

    doc.add_paragraph()

    # Section 4: Technology Architecture Matrix
    h4 = doc.add_heading(level=1)
    run_h4 = h4.add_run("4. Technology Architecture Matrix")
    run_h4.font.color.rgb = RGBColor(6, 78, 59)

    tech_matrix = [
        ("Next.js 16 (React 19, Turbopack)", "Full-Stack Web Framework", "Provides App Router architecture, zero-config serverless API routes (/api/verify), fast refresh, and static pre-rendering."),
        ("Tailwind CSS 3.4", "Design System & UI Styling", "Configured with custom Deep-Emerald and Indian Earth palette, responsive mobile shell container, and dark-mode accents."),
        ("Google Gemini 1.5 Flash Vision", "Multimodal AI Vision", "Performs landmark correlation, fraud detection, cleanup verification, and dynamic Green Points scoring via @google/generative-ai."),
        ("Supabase PostgreSQL", "Relational Database", "Stores persistent user accounts, mission logs, coordinates, and categories under robust Row-Level Security (RLS) policies."),
        ("PostgreSQL Stored Procedures", "Automated Business Logic", "Database triggers (handle_mission_points) that automatically and atomically increment user points upon approved missions."),
        ("Supabase Storage", "Cloud Media Storage", "S3-compatible public bucket (missions) hosting before and after photo evidence with instant CDN delivery."),
        ("HTML5 Geolocation & Camera API", "Hardware Integration", "Native device integration for high-accuracy GPS coordinates and rear camera capture directly from the mobile browser."),
        ("Canvas Confetti", "UX Microinteraction", "Client-side particle physics celebration triggered immediately upon AI verification approval."),
        ("Vercel Edge Network", "Production Cloud Hosting", "Global serverless edge network providing automated HTTPS, instant builds, and 99.99% availability.")
    ]

    t_tech = doc.add_table(rows=len(tech_matrix) + 1, cols=3)
    t_tech.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_tech.rows[0].cells[0].text = "Technology"
    t_tech.rows[0].cells[1].text = "Architecture Layer"
    t_tech.rows[0].cells[2].text = "Key Implementation Details"
    set_cell_background(t_tech.rows[0].cells[0], "064E3B")
    set_cell_background(t_tech.rows[0].cells[1], "064E3B")
    set_cell_background(t_tech.rows[0].cells[2], "064E3B")
    for cell in t_tech.rows[0].cells:
        for p in cell.paragraphs:
            for r in p.runs:
                r.font.color.rgb = RGBColor(255, 255, 255)
                r.font.bold = True

    for i, (tech, layer, details) in enumerate(tech_matrix):
        row = t_tech.rows[i + 1]
        row.cells[0].text = tech
        row.cells[1].text = layer
        row.cells[2].text = details
        bg = "F0FDF4" if i % 2 == 0 else "FFFFFF"
        set_cell_background(row.cells[0], bg)
        set_cell_background(row.cells[1], bg)
        set_cell_background(row.cells[2], bg)

    # Save to root and public
    out_root = os.path.join(base_dir, 'Clean_and_Earn_User_Flow_and_Architecture.docx')
    out_pub = os.path.join(base_dir, 'public', 'Clean_and_Earn_User_Flow_and_Architecture.docx')
    doc.save(out_root)
    doc.save(out_pub)
    print(f"User Flow Word doc generated at {out_root} ({os.path.getsize(out_root)} bytes)")

if __name__ == '__main__':
    create_flow_document()
