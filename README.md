# Levcreates — Portfolio

The creative portfolio of **Levi Vandenheede** (Levcreates) — journalism, film,
communication, music and stories in every medium. Built from the "Editorial
Index" design direction (Variation B) handed off from Claude Design.

Cinematic editorial look: burgundy / cream / ink with gold + teal accents,
Cormorant Garamond display, IBM Plex Mono labels, Manrope body.

## Stack

- **React 18** + **Vite** — single-page app, no router (in-page page switching)
- **pdf.js** (CDN) — drives the live PDF flip-sliders (Comms portfolio,
  XXXTENTACION rebrand deck) and the CV preview on the About page
- **YouTube IFrame API** — inline players that play with sound (avoids the
  sandbox "error 153" by setting a valid origin)
- TikTok / Spotify / SoundCloud embeds

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
index.html        # shell: fonts + pdf.js, mounts the app
public/assets/    # all media (photos, video clips, PDFs)
src/
  data.js         # all content: copy, links, section config, media paths
  core.jsx        # design tokens, shared components, the home/cover page
  pages.jsx       # every section page + the VariationB app shell
  main.jsx        # React mount
```

## Editing content

Almost everything the site shows lives in **`src/data.js`** — titles, blurbs,
links, YouTube/TikTok ids, and media file names. Drop new media into
`public/assets/` and point `data.js` at it (paths are root-absolute, e.g.
`/assets/lev-portrait.jpg`).

## Pages

Home (cover + documentary teaser), Music, Journalism, Comms & Marketing, Film &
Video, Freelance & Stories, Abroad, About (with CV download), Contact.

## Notes

- Some embeds (YouTube/TikTok) need their videos kept **public** to play.
- The Noordzeedrones Canva link must stay set to "anyone with the link".
- The Wu-Tang review hero photo is hotlinked from Dansende Beren; it falls back
  to a labelled placeholder if hotlinking is ever blocked.
