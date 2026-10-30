# Mohit & Supriya — Fun Desi Wedding

A playful Indian wedding website with live countdown, ceremony venues (Google Maps), love-story milestones, cartoon couple facts, family intros, and RSVP.

## Run locally

```bash
# Option A — Python
python -m http.server 5500

# Option B — Node
npx --yes serve -l 5500
```

Open [http://localhost:5500](http://localhost:5500).

## Customize

| What | Where |
|------|--------|
| Wedding date / countdown | `index.html` → `data-wedding` on `.countdown` |
| Venue names & Maps links | Event cards in `#events` |
| Contact / RSVP emails | Footer `#rsvp` |
| Couple facts & inside jokes | `#fun` and `#family` sections |

## Host for free

- **Netlify Drop**: drag this folder to [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: push and enable Pages on `main` / root
- **Cloudflare Pages**: connect the repo or upload the static files

No build step — pure HTML, CSS, and JS.
