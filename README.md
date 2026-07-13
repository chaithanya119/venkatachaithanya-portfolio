# KV Portfolio

Personal portfolio for Kokurla Venkata Chaithanya — Generative AI Engineer & Python Backend Developer.

Built with React + Vite. No Tailwind/build-step CSS framework — styling is inline, using a small
shared token palette (ink navy + signal orange, matching the Face Recognition Attendance System's
Ignitz branding) defined at the top of `src/App.jsx`.

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

Outputs a static `dist/` folder — deploy it to Vercel, Netlify, GitHub Pages, or any static host.

## Project structure

```
kv-portfolio/
├── index.html          # HTML shell + meta tags
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React entry point
    ├── App.jsx          # The entire portfolio (nav, hero, sections)
    └── index.css        # Global reset + scrollbar styling
```

## Customizing content

Everything lives in `src/App.jsx`:
- Personal info / links → `Hero()` and `Contact()`
- Experience bullets → `Experience()`
- Project case studies → the `PROJECTS` array near the bottom
- Skills → the `groups` array inside `Skills()`
- Colors/fonts → the `C` object at the top of the file

## Notes

- GitHub stats aren't live-fetched (avoids CORS/rate-limit issues client-side) — the GitHub link
  in Contact just points to https://github.com/chaithanya119. Wire up a real fetch if you add a
  small backend/proxy.
- Icons via `lucide-react`. Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts at runtime.
