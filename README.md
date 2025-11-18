# Tweet Organizer

A lightweight React app for planning and tracking tweets throughout the week.

## Features
- Organize tweets by weekday with persistent local storage
- Mark entries as Tweeted, edit, copy, or delete them
- Responsive grid layout that scales to the viewport
- Modern UI with light styling plus dark-mode-ready classes
- Reset modal for clearing the entire week's plan

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm start
   ```
   The app runs at http://localhost:3000/ by default.

## Project Structure
- `src/App.js` – main TweetOrganizer UI
- `src/index.js` – React entry point
- `src/index.css` – Tailwind entry + base styles
- `public/index.html` – Static shell for the SPA

## Styling
Tailwind CSS is used for utility-first styling. Relevant configs:
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css`

## Local Storage Keys
- `weeklyTweets` – serialized array of tweet objects
- `tweet-theme` – stored theme preference (light/dark)

## Scripts
- `npm start` – run dev server
- `npm run build` – production build
- `npm test` – run tests (if added)

Feel free to extend the UI, add authentication, or connect to a scheduler API.
