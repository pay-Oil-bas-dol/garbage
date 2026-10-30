import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def create_word_document():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    tech_stack_md_path = os.path.join(base_dir, 'TECH_STACK.md')

    with open(tech_stack_md_path, 'r', encoding='utf-8') as f:
        tech_lines = [line.strip() for line in f if line.strip()]

    doc = Document()

    # Page Margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Header / Title
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = title.add_run("Clean & Earn (SafaiSaathi)\nTechnology Stack Documentation")
    run_title.font.name = "Arial"
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(6, 78, 59) # Deep Emerald Green

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = sub.add_run("Official Technical Architecture & Implementation Summary\nSwachh Bharat Environmental Gamification Initiative 🇮🇳")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(11)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(21, 128, 61)

    doc.add_paragraph() # Spacer

    # Project Metadata Table
    meta_table = doc.add_table(rows=4, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False

    meta_data = [
        ("Project Name", "Clean & Earn (SafaiSaathi / सफ़ाई साथी)"),
        ("Live Production URL", "https://garbage-rosy-six.vercel.app"),
        ("GitHub Repository", "https://github.com/pay-Oil-bas-dol/garbage.git"),
        ("Deployment Target", "Vercel Edge Platform (Serverless Next.js 16)"),
    ]

    for idx, (label, val) in enumerate(meta_data):
        row = meta_table.rows[idx]
        cell_lbl, cell_val = row.cells[0], row.cells[1]
        cell_lbl.width = Inches(2.2)
        cell_val.width = Inches(4.6)

        p_lbl = cell_lbl.paragraphs[0]
        r_lbl = p_lbl.add_run(label)
        r_lbl.font.bold = True
        r_lbl.font.size = Pt(9.5)
        r_lbl.font.color.rgb = RGBColor(15, 23, 42)

        p_val = cell_val.paragraphs[0]
        r_val = p_val.add_run(val)
        r_val.font.size = Pt(9.5)
        if "http" in val:
            r_val.font.color.rgb = RGBColor(2, 132, 199)
            r_val.font.underline = True

        set_cell_background(cell_lbl, "F1F5F9")
        set_cell_background(cell_val, "F8FAFC")

    doc.add_paragraph()

    # Section Heading: 10-Line Technical Summary
    heading1 = doc.add_paragraph()
    r_h1 = heading1.add_run("10-Line Core Technology Specification")
    r_h1.font.name = "Arial"
    r_h1.font.size = Pt(14)
    r_h1.font.bold = True
    r_h1.font.color.rgb = RGBColor(15, 23, 42)

    intro_p = doc.add_paragraph()
    r_intro = intro_p.add_run("The following 10 specifications define the full-stack architecture, multimodal vision AI pipelines, and cloud database infrastructure powering Clean & Earn:")
    r_intro.font.size = Pt(10)
    r_intro.font.color.rgb = RGBColor(51, 65, 85)

    # 10 Tech Stack Items as structured styled cards
    for line in tech_lines:
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.2)
        p.paragraph_format.space_after = Pt(6)

        # Parse "1. Category: Description"
        if ":" in line:
            parts = line.split(":", 1)
            prefix = parts[0] + ":"
            content = parts[1]

            r_num = p.add_run("✔  ")
            r_num.font.bold = True
            r_num.font.color.rgb = RGBColor(16, 185, 129)

            r_pref = p.add_run(prefix)
            r_pref.font.bold = True
            r_pref.font.size = Pt(10.5)
            r_pref.font.color.rgb = RGBColor(6, 78, 59)

            r_desc = p.add_run(content)
            r_desc.font.size = Pt(10)
            r_desc.font.color.rgb = RGBColor(51, 65, 85)
        else:
            r = p.add_run(f"• {line}")
            r.font.size = Pt(10)

    doc.add_paragraph()

    # Detailed Tech Stack Breakdown Table
    heading2 = doc.add_paragraph()
    r_h2 = heading2.add_run("Architecture & Technology Breakdown Table")
    r_h2.font.name = "Arial"
    r_h2.font.size = Pt(14)
    r_h2.font.bold = True
    r_h2.font.color.rgb = RGBColor(15, 23, 42)

    table = doc.add_table(rows=1, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    headers = ["Component / Layer", "Technology Stack", "Role & Purpose"]
    hdr_row = table.rows[0]
    for i, h in enumerate(headers):
        cell = hdr_row.cells[i]
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "064E3B") # Emerald header

    hdr_row.cells[0].width = Inches(1.8)
    hdr_row.cells[1].width = Inches(2.2)
    hdr_row.cells[2].width = Inches(2.8)

    tech_table_data = [
        ("Frontend Client", "Next.js 16 (App Router), React 19", "Server-side rendering, mobile viewport optimization, zero-flash navigation."),
        ("Design & Styling", "Tailwind CSS v4 & Framer Motion", "Eco light green palette (#15803D), responsive layout, radar scan animations."),
        ("Multimodal Vision AI", "Google Gemini 1.5 Flash Vision API", "Compares Before and After street scenes, detects fraud/memes, grades 20-50 pts."),
        ("Offline AI Verifier", "Built-in Neural Heuristic Engine", "Zero-setup fallback ensuring 100% reliable evaluation during live classroom demos."),
        ("Database & RLS", "Supabase PostgreSQL Database", "Stores users, mission history, GPS coordinates, and triggers automated point updates."),
        ("User Authentication", "Supabase Auth & Demo Switcher", "Email/Password, OAuth, and instant 1-click profiles (Aarav, Priya, Vikram)."),
        ("Proof Storage", "Supabase Edge Storage (S3-compatible)", "Secure bucket storage for high-res before/after photos and optional video clips."),
        ("Geolocation Engine", "HTML5 Browser Geolocation API", "Auto-captures latitude and longitude upon photo capture for landmark verification."),
        ("Gamification Elements", "Canvas Confetti & Lucide React", "Celebratory visual particle effects upon mission approval and intuitive iconography."),
        ("Hosting Platform", "Vercel Serverless Edge Platform", "Production deployment with automated SSL, serverless function scaling, and caching."),
    ]

    for row_idx, (layer, tech, purpose) in enumerate(tech_table_data):
        row = table.add_row()
        row.cells[0].width = Inches(1.8)
        row.cells[1].width = Inches(2.2)
        row.cells[2].width = Inches(2.8)

        for col_idx, text in enumerate([layer, tech, purpose]):
            cell = row.cells[col_idx]
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(9)
            if col_idx == 0:
                r.font.bold = True
                r.font.color.rgb = RGBColor(15, 23, 42)
            elif col_idx == 1:
                r.font.bold = True
                r.font.color.rgb = RGBColor(21, 128, 61)
            else:
                r.font.color.rgb = RGBColor(71, 85, 105)

            # Alternate row backgrounds
            bg = "F8FAFC" if row_idx % 2 == 0 else "FFFFFF"
            set_cell_background(cell, bg)

    doc.add_paragraph()

    # Footer note
    footer_p = doc.add_paragraph()
    footer_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_foot = footer_p.add_run("Clean & Earn (SafaiSaathi) — Verified Environmental Technology Documentation • 2026")
    r_foot.font.size = Pt(8.5)
    r_foot.font.italic = True
    r_foot.font.color.rgb = RGBColor(148, 163, 184)

    # Save to root and public
    root_docx_path = os.path.join(base_dir, 'TECH_STACK.docx')
    pub_docx_path = os.path.join(base_dir, 'public', 'TECH_STACK.docx')
    doc.save(root_docx_path)
    doc.save(pub_docx_path)
    print(f"Created Word document at: {root_docx_path}")
    print(f"Copied to public at: {pub_docx_path}")

    # Also save as Clean_and_Earn_Documentation.docx for convenience
    doc.save(os.path.join(base_dir, 'Clean_and_Earn_Documentation.docx'))
    doc.save(os.path.join(base_dir, 'public', 'Clean_and_Earn_Documentation.docx'))

if __name__ == '__main__':
    create_word_document()
