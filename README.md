# RedZone Sports — GitHub Pages Template

A responsive, ESPN-inspired sports portal built with plain HTML, CSS and JavaScript. No build step or package installation is required.

## Features
- Sports directory covering football, NFL, NCAAF, basketball, baseball, hockey, tennis, cricket, boxing, MMA, motorsport, volleyball, rugby, golf and horse racing.
- Dedicated schedule filtering by sport and date.
- Sports news listing, category filter, search and article detail pages.
- Manual content via JSON files.
- Optional automatic ESPN public scoreboard feed for supported leagues.
- Responsive layout and GitHub Pages compatible static hosting.

## Publish on GitHub Pages
1. Create a new GitHub repository.
2. Upload **all files and folders** from this project. `index.html` must be in the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish your site.

## Add manual matches
Edit `data/matches.json` and add objects to the `matches` array:

```json
{
  "id": "unique-match-id",
  "sport": "football",
  "home": "Home Team",
  "away": "Away Team",
  "date": "2026-12-01T18:30:00Z",
  "status": "UPCOMING"
}
```

Use one of these `sport` IDs:
`football`, `nfl`, `ncaaf`, `basketball`, `baseball`, `hockey`, `tennis`, `cricket`, `boxing`, `mma`, `motorsport`, `volleyball`, `rugby`, `golf`, `horse-racing`.

Dates should be ISO 8601. `Z` means UTC. The browser displays the time in the visitor's local timezone.

## Add manual news
Edit `data/news.json` and add objects to the `articles` array:

```json
{
  "id": "my-story",
  "sport": "football",
  "category": "Football News",
  "title": "Your headline",
  "excerpt": "A short summary.",
  "body": "First paragraph.\\n\\nSecond paragraph.",
  "date": "2026-12-01",
  "art": "FOOTBALL"
}
```

The `id` must be unique. Article content is plain text and is safely escaped before display. To use images, extend the news card renderer with a trusted image URL and add suitable CSS.

## Automatic data mode
Open **Settings** on the website and enable **Automatic ESPN data**. Choose a supported feed:
- Football: soccer / eng.1
- NFL: football / nfl
- NCAAF: football / college-football
- Basketball: basketball / nba
- Baseball: baseball / mlb
- Hockey: hockey / nhl

The browser requests ESPN's public site API directly. This is an unofficial integration, not an ESPN partnership. ESPN may change, restrict, or CORS-block these endpoints; availability, coverage and event timing are not guaranteed. If the feed fails, the site continues to show manual JSON fixtures. Automatic feed currently applies to the selected sport only; manual fixtures remain visible alongside it.

## Important notes
- This is a static front-end project. Settings are stored in the visitor's browser using localStorage.
- There is no admin dashboard or database. Edit JSON files and push commits to update the published site.
- Sample fixtures and articles are demonstration content. Replace them before publishing.
- GitHub Pages does not run Python, PHP or server-side code.
