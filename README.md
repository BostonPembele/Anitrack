# AniTrack

AniTrack is a simple anime tracker app built with Ionic and Angular.  
It helps users discover anime, track what they are watching, and save what they want to watch later.

The app uses the Jikan API (MyAnimeList data) to load real anime information like ratings, episodes, genres, and characters.

---

## What it does

AniTrack has 4 main features:

### Discover
- Shows top anime on the home page
- Search any anime instantly

### View Details
- See full anime info (score, episodes, synopsis, genres, characters)

### Track
- Add anime to a watchlist
- Set status: Watching / Plan to Watch / Completed
- Remove anime anytime

### Profile
- Shows stats like:
  - Total anime saved
  - Episodes watched
  - Breakdown by status

---

## Features

### Home Page
- Top anime list from API
- Search bar with live results (debounced)
- Grid layout of anime cards

### Detail Page
- Large anime banner
- Full anime info (score, type, status, episodes)
- Watchlist button (add/remove)
- Genres and character list

### Watchlist Page
- Saved anime list
- Filter by status
- Tap to reopen details
- Remove items easily

### Profile Page
- Simple stats dashboard
- Shows progress across your watchlist

---

## Tech Stack

- Ionic 7 (UI)
- Angular 17 (logic & routing)
- Jikan API (anime data)
- HttpClient (API calls)
- Ionic Storage (saving watchlist)
- Capacitor Share (native sharing)

---

## Link to App

Please refresh after clicking the link.
https://anitrack-c819b.web.app/home

## How to run it

```bash
npm install
ionic serve


