"""Build the portfolio resume from Markdown. Requires: pip install reportlab."""

from pathlib import Path
import html
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "resume/Shiva-Yadav-Resume.md"
OUTPUT = ROOT / "src/assets/Resume.pdf"
FONT_DIR = Path("/usr/share/fonts/truetype/liberation")
if not FONT_DIR.exists():
    FONT_DIR = Path("/usr/share/fonts/truetype/liberation2")
for name, filename in (("ResumeSans", "LiberationSans-Regular.ttf"),
                       ("ResumeSans-Bold", "LiberationSans-Bold.ttf")):
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / filename)))
pdfmetrics.registerFontFamily("ResumeSans", normal="ResumeSans", bold="ResumeSans-Bold")

INK = colors.HexColor("#18212b")
base = ParagraphStyle("body", fontName="ResumeSans", fontSize=11, leading=14,
                      textColor=INK, alignment=TA_LEFT, spaceAfter=3)
styles = {
    "body": base,
    "name": ParagraphStyle("name", parent=base, fontName="ResumeSans-Bold",
                           fontSize=24, leading=28, spaceAfter=3),
    "subtitle": ParagraphStyle("subtitle", parent=base, fontSize=11, leading=14,
                               spaceAfter=6),
    "contact": ParagraphStyle("contact", parent=base, fontSize=9.5, leading=12.5,
                              spaceAfter=1),
    "section": ParagraphStyle("section", parent=base, fontName="ResumeSans-Bold",
                              fontSize=10.5, leading=13, spaceBefore=10, spaceAfter=6,
                              keepWithNext=True, borderWidth=0,
                              borderPadding=0),
    "entry": ParagraphStyle("entry", parent=base, fontName="ResumeSans-Bold",
                            spaceBefore=3, spaceAfter=2, keepWithNext=True),
    "bullet": ParagraphStyle("bullet", parent=base, leftIndent=10, firstLineIndent=0,
                             bulletIndent=0, bulletFontName="ResumeSans", bulletFontSize=11,
                             spaceAfter=3),
    "link": ParagraphStyle("link", parent=base, fontSize=9.5, leading=12.5,
                           spaceAfter=4, keepWithNext=True),
}


def markup(text):
    text = html.escape(text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)",
                  r'<link href="\2" color="#18212b">\1</link>', text)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)


story = []
in_header = True
for line in SOURCE.read_text().splitlines():
    if not line.strip():
        continue
    bullet = None
    if line.startswith("# "):
        kind, text = "name", line[2:]
    elif line.startswith("## "):
        in_header = False
        kind, text = "section", line[3:]
    elif line.startswith("### "):
        kind, text = "entry", line[4:]
    elif line.startswith("- "):
        kind, text, bullet = "bullet", line[2:], "\u2022"
    elif in_header:
        kind = "subtitle" if line.startswith("Data Science &") else "contact"
        text = line
    else:
        kind, text = ("link" if line.startswith("Live:") else "body"), line
    story.append(Paragraph(markup(text), styles[kind], bulletText=bullet))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=45, leftMargin=45,
                        topMargin=39, bottomMargin=39,
                        title="Shiva Yadav - Data Science and Machine Learning Resume",
                        author="Shiva Yadav", subject="Data Science / Machine Learning internships")
doc.build(story)
if doc.page != 1:
    raise RuntimeError(f"Resume must fit one page; generated {doc.page}. Adjust content or spacing.")
print(f"Built {OUTPUT} ({OUTPUT.stat().st_size:,} bytes).")
