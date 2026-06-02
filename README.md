# Magazin-Inventar

A browser-based inventory management app for vintage fashion magazines, with AI-powered cover scanning and Shopify export.

## Features

- **AI Cover Scan** — photograph a magazine cover and Claude automatically fills in title, issue, date, price suggestion, description, tags and SEO fields
- **Inventory management** — table and card view, search, filtering, CSV/Excel export
- **Shopify export** — generates a ready-to-import Shopify product CSV with metafields

## Setup

1. Open the app in your browser
2. Click ⚙ → enter your [Claude API key](https://console.anthropic.com/settings/keys) and your shop name
3. Add magazines — use "Cover mit KI scannen" to auto-fill fields from a cover photo
4. Export → "Shopify-Import CSV" to import products into Shopify

## Tech

React · Vite · Dexie (IndexedDB) · Tailwind CSS · Claude API (vision)

All data is stored locally in the browser. The Claude API key is stored only in `localStorage` and never sent anywhere except directly to Anthropic's API.
