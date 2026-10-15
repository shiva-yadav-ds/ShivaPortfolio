# Resume source and maintenance

`Shiva-Yadav-Resume.md` is the editable source for the one-page Data Science / Machine Learning internship resume. The PDF is generated with selectable text and embedded Liberation Sans fonts (11 pt body, 10.5 pt section headings, 24 pt name) on A4 with 45 pt side margins and 39 pt top/bottom margins. Contact details are in the document body. There are no columns, tables, photos, icons, skill ratings, or text boxes.

Build with Python 3 and ReportLab installed:

```bash
python3 scripts/build_resume.py
npm run build
```

The script writes the single final PDF to `src/assets/Resume.pdf`, which is used by both portfolio download buttons. The Markdown file is editable source content, not a second résumé and not something to upload to job portals.

## Content decisions

- Target: Data Science / Machine Learning internships, confirmed by Shiva.
- Program: BS in Data Science, confirmed by Shiva. Start date is retained from the uploaded resume; an unconfirmed expected graduation date is omitted.
- Removed the hospital collaboration claim after Shiva confirmed it was false.
- Removed all unsupported accuracy, adoption, uptime, speed, engagement, satisfaction, and diagnostic-impact metrics, including the conflicting 0%, 9%, 92%, and 96% figures.
- Focused projects on the clinical ML application and IITM Scholar Hub already featured in the portfolio. Omitted the less-substantiated fake-news project, rather than assuming its dataset and evaluation results.
- Omitted school marks, student ID, interests, and the broad cloud/database/deep-learning keyword list to prioritize relevant project experience.
- Internship and training descriptions use existing resume/portfolio information. Review these against your actual work before applying.
- On 2026-10-15, reviewed the public clinical project's three training notebooks and `app.py`. Verified linear SVM classifiers, stratified 80/20 splits, StandardScaler fitted on the training partition, held-out accuracy calculations, and reuse of saved models/scalers in Streamlit. These concrete implementation details replace the generic clinical project bullets. No evaluation score was added, and the training notebooks were not rerun. Removed the earlier imputation claim because this review did not substantiate it. IITM Scholar Hub's private code was not audited.
- Clinical project evidence: [training notebooks](https://github.com/shiva-yadav-ds/Prediction-of-Disease-Outbreaks/tree/main/training_models) and [application](https://github.com/shiva-yadav-ds/Prediction-of-Disease-Outbreaks/blob/main/app.py).

## Before applying

Tailor the summary, skill order, and relevant bullets to the specific job description, using only skills and work you can explain. Add a metric only when you can describe its dataset or measurement method. For model evaluation, specify the held-out dataset or split, metric, and baseline rather than a standalone accuracy percentage. Follow the employer's requested file format.

PDF extraction and layout checks do not establish an ATS ranking or guarantee a shortlist. No proprietary ATS scoring service was used.

Formatting references:
- [Greenhouse: unsuccessful resume parsing](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse)
- [Harvard: creating a strong resume](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/)
