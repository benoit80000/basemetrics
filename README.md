# Base Metrics – Mini‑App Manifest Pack

This pack provides:
- `public/.well-known/farcaster.json` – your Mini‑App manifest
- `public/icon.png`, `public/splash.png`, `public/hero.png` – corporate placeholders

## How to use
1. Drop the `public/` folder at the **root** of your Next.js project (merge if it exists).
2. Commit & push – Vercel will redeploy.
3. Verify the manifest is served at:
   https://basemetrics.vercel.app/.well-known/farcaster.json

## Required updates
- Replace `accountAssociation.header/payload/signature` with values from the Base/Farcaster association flow.
- If your app uses a different domain, update all URLs in `farcaster.json` (`homeUrl`, `iconUrl`, etc.).
- Make sure `/api/og` returns an image (used by `ogImageUrl`).

## Quick checks
- `curl -i https://basemetrics.vercel.app/.well-known/farcaster.json` should return `HTTP/2 200` and `content-type: application/json`.
- No trailing commas in JSON, no comments.
