# Run the portfolio

```sh
npm ci
npm run dev
```

Create and preview the production build:

```sh
npm run build
npm run preview
```

The production output is in `dist/`. If a dev server was running before the
redesign, restart it so it reloads the updated PostCSS configuration. The active
portfolio uses custom CSS in `src/index.css`; it does not require Tailwind's
PostCSS plugin.

## Updating content

- Contact and social URLs: `src/constants/profile.js`.
- Projects and their destinations: `src/components/Works.jsx`.
- Scholar Hub preview source: `src/assets/projects/scholar-hub.png`; responsive
  WebP variants live beside it.
- Downloadable résumé: `src/assets/Resume.pdf`.
- EmailJS configuration: `src/components/Contact.jsx` (existing service retained).
- Interactive hero geometry and captions: `src/components/DataLab.jsx`.
- Lab and project showcase styling: `src/refinements.css`.

The YouTube footer link points to the confirmed @noisedecoded channel. Scholar
Hub's repository is private, so its GitHub action is intentionally labeled “GitHub
profile.”

## Verification

The redesign was checked at 320, 390, 768, 1024, and 1440 pixels, including section
anchors, mobile navigation, project details, images, PDF download, and reduced
motion. Contact success and failure states were checked with intercepted network
responses. Direct delivery is currently blocked by the expired Gmail grant noted
below. LinkedIn restricts automated checks; the link uses the owner's confirmed
URL.

The optimized production build scored 99 Performance, 100 Accessibility, and 100
Best Practices in a throttled mobile Lighthouse run. It transferred about 194 KiB,
with 1.5 s First Contentful Paint, 2.0 s Largest Contentful Paint, 30 ms Total
Blocking Time, and zero measured layout shift.

On October 15, 2026, EmailJS returned `412 Gmail_API: Invalid grant`. Reconnect the
Gmail service in EmailJS under Email Services to restore direct delivery. Until
then, failed submissions retain the visitor's text and offer a pre-filled email
app fallback.

The interactive lab was checked for distinct geometry in all three modes,
keyboard controls, pause/play, and live reduced-motion changes. The canvas stops
animating outside the viewport or when the browser tab is hidden. Copy-email and
the project hover cursor were also checked in the browser.
