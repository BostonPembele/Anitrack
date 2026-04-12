# AniTrack

AniTrack is a Progressive Web Application built for anime fans who want to keep track of what they are watching, what they have completed, and what they plan to watch next. Instead of relying on external websites or trying to remember everything yourself, AniTrack gives you a personal anime manager that lives on your device and works across both mobile and desktop.

The app pulls live data from the Jikan API, which is powered by MyAnimeList — one of the largest anime databases in the world. This means you have access to thousands of titles, accurate scores, episode counts, genre tags, character information and more, all without needing to create an account or pay for anything.

---

## What the App Does

AniTrack is built around four core ideas:

**Discover** — The home screen shows you the top ranked anime of all time and lets you search for any title instantly. Whether you are looking for a classic like Fullmetal Alchemist or something currently airing, you can find it within seconds.

**Learn** — Tapping into any anime brings up a full detail page with the synopsis, episode count, score, rating, genres and the main characters. Everything you need to decide whether something is worth watching.

**Track** — Every anime you find can be added to your personal watchlist with a status. You choose whether it goes into Watching, Plan to Watch or Completed. You can update or remove entries at any time.

**Review** — The profile page gives you a summary of your watching habits. You can see how many shows you have watched, how many episodes that adds up to, and a breakdown across your three status categories.

---

## Features

### Home Page
- Displays the top 25 anime of all time on launch, pulled live from the Jikan API
- Search bar with a 500ms debounce so results update as you type without spamming the API
- Results display in a two column grid showing the cover image, title and score
- Tapping any card navigates to the full detail page for that anime

### Detail Page
- Large hero banner with the anime cover image and an overlay showing the title, score, type and airing status
- Add to Watchlist button with a dropdown to select your status before saving
- If the anime is already in your watchlist the button switches to Remove from Watchlist
- Info grid showing episode count, episode duration, age rating and rank
- Full synopsis section
- Genre tags displayed as coloured badges
- Character section showing the top 6 characters with their portrait and name

### Watchlist Page
- Displays all anime you have saved, filterable by Watching, Plan to Watch and Completed
- Each entry shows the cover image, title, score and your chosen status
- Tap any entry to go back to its detail page
- Swipe or tap to remove entries directly from the list

### Profile Page
- Shows your total number of saved anime
- Breakdown of how many are in each status category
- Total episodes watched calculated from your Completed entries
- Clean stats card layout

### Native Plugin
- Uses the Capacitor Share plugin on the detail page so you can share any anime directly to WhatsApp, Instagram, or any other app on your device
- Works on both mobile and Windows desktop

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Ionic 7 | UI components and mobile layout |
| Angular 17 | Framework, standalone components, routing |
| Jikan API | Live anime data source |
| HttpClient + Observables | Fetching data from the API |
| IonicStorageModule | Persisting the watchlist locally |
| Angular Router | Navigation between pages |
| Capacitor Share | Native share functionality |

---

## Project Structure

```
src/
  app/
    home/
      home.page.ts        # Top anime + search logic
      home.page.html      # Home page template
      home.page.scss      # Home page styles
    pages/
      detail/
        detail.page.ts    # Anime detail + watchlist toggle logic
        detail.page.html  # Detail page template
        detail.page.scss  # Detail page styles
      watchlist/
        watchlist.page.ts    # Watchlist display + filtering logic
        watchlist.page.html  # Watchlist template
        watchlist.page.scss  # Watchlist styles
      profile/
        profile.page.ts    # Stats calculation logic
        profile.page.html  # Profile template
        profile.page.scss  # Profile styles
    services/
      anime.service.ts     # All Jikan API calls using HttpClient
      storage.service.ts   # All IonicStorage read/write operations
```

---

## API Reference

This app uses the [Jikan API v4](https://jikan.moe/) — a free, open source unofficial MyAnimeList API. No API key or account is required.

| Method | Endpoint | Used For |
|---|---|---|
| GET | `/top/anime` | Home page top anime grid |
| GET | `/anime?q={query}&limit=20` | Search results |
| GET | `/anime/{id}/full` | Detail page information |
| GET | `/anime/{id}/characters` | Detail page character section |
| GET | `/seasons/now` | Currently airing anime |

> Note: Jikan enforces a rate limit of 3 requests per second. The search bar uses a 500ms debounce to stay within this limit.

---

## Installation

### Requirements
- Node.js v18 or higher
- Ionic CLI v7 or higher

### Steps

Install the Ionic CLI globally if you do not have it:
```bash
npm install -g @ionic/cli
```

Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/anitrack.git
cd anitrack
```

Install dependencies:
```bash
npm install
```

Run the app:
```bash
ionic serve
```

The app will open at `http://localhost:8100`

---

## User Guide

### Browsing Top Anime

When you open AniTrack you will land on the Home page. The app automatically loads the top ranked anime from MyAnimeList and displays them in a grid. Each card shows the cover image, the title and the score out of 10. Scroll down to browse through all of them.

---

### Searching for an Anime

1. Tap the search bar at the top of the Home page
2. Start typing the name of the anime you are looking for
3. Results will appear automatically after a short pause
4. Tap any result card to open the detail page

> If you clear the search bar the top anime grid will come back automatically.

---

### Viewing Anime Details

Tap any anime card on the Home page or Watchlist page to open the Detail page. Here you will find:

- The full title and hero image
- Score, type and current airing status
- Episode count and duration per episode
- Age rating and global rank
- Full synopsis
- Genre tags
- Top characters with their portraits

---

### Adding an Anime to Your Watchlist

1. Open the Detail page for any anime
2. Use the Status dropdown to choose one of the following:
   - **Plan to Watch** — for anime you want to watch later
   - **Watching** — for anime you are currently watching
   - **Completed** — for anime you have finished
3. Tap **Add to Watchlist**
4. The button will change to **Remove from Watchlist** confirming it has been saved

Your watchlist is saved to your device and will still be there the next time you open the app.

---

### Viewing Your Watchlist

1. Tap **Watchlist** in the bottom navigation bar
2. Your saved anime will appear grouped by status
3. Use the filter tabs at the top to switch between Watching, Plan to Watch and Completed
4. Tap any entry to go back to its detail page

---

### Removing an Anime from Your Watchlist

**Option 1 — From the Detail page:**
1. Open the anime you want to remove
2. Tap the **Remove from Watchlist** button

**Option 2 — From the Watchlist page:**
1. Swipe left on any entry
2. Tap the Remove button that appears

---

### Sharing an Anime

1. Open the Detail page for any anime
2. Tap the **Share** button
3. Your device's native share sheet will open
4. Choose any app to share to such as WhatsApp, Instagram or Messages

---

### Viewing Your Stats

Tap **Profile** in the bottom navigation bar to see:

- Total anime saved across all statuses
- Number of shows currently Watching
- Number of shows marked as Completed
- Number of shows in Plan to Watch
- Total episodes watched based on your Completed entries

---

## Commit History Convention

All commits in this project follow the Conventional Commits standard:

| Prefix | Meaning |
|---|---|
| `feat:` | A new feature was added |
| `fix:` | A bug was fixed |
| `style:` | UI or styling changes only |
| `refactor:` | Code was restructured without changing behaviour |
| `docs:` | Documentation was updated |

---

## License

MIT
