# Verion Studios

A single-page video editing and digital services studio website, built with React and the Sites Vinext starter.

## Update content

Edit `app/studio.ts` to change the service copy, logo path, and contact email addresses. `public/verion-logo.svg` frames the original supplied JPEG artwork without redrawing it; update the configuration path to replace it. The editing graphic uses simple layout shapes and an illustrative timeline.

## Development

Run `npm run dev` for the local preview and `npm run build` for a production build. Motion can be paused on the page and automatically stops when reduced motion is preferred.

## Hosting configuration

Hosting settings live in `.hosting/hosting.json`. The build emits the deployment provider’s required metadata inside ignored `dist/` output. For Sites publishing tools that require the old path, create an ignored local alias with `ln -s .hosting .openai`; the alias is not part of the repository.

## Vercel

Import `akshatpathak7/VerionStudios` into Vercel with the repository root as the project directory. `vercel.json` selects Next.js and its native build, while the existing local preview and Sites build scripts remain available. No environment variables are required for this landing page.

## Private reviews

The homepage review form submits to `POST /api/reviews`. Name and affiliation are optional; service and review text are required. No endpoint lists reviews publicly. Each submission is saved as `reviews/<submission-id>.json` in the private Vercel Blob store `verionstudios-reviews`. The project is connected to this store for development, preview, and production. `BLOB_READ_WRITE_TOKEN` is a server-only environment variable. Never prefix it with `NEXT_PUBLIC_`.

To refresh local credentials, run `npx vercel env pull .env.local --scope team-akshat7`. Do not commit this file. Without the token, submission returns an unavailable response and never reports a successful save.

Owners can view and download records in the Vercel Storage dashboard for this project. `publicationConsent`, `consentVersion`, `moderationStatus: pending`, and `featured: false` are saved for a future reviewed selection process. Future public display must require publication permission and manual approval; this feature does not display any submitted reviews. Store the submission reference with any correction or deletion request.

Requests have field and body-size limits and a hidden bot-trap field. UUID-based receipts prevent duplicate writes when a visitor retries. This is basic spam protection; enable Vercel Firewall rate limiting if the public form attracts abuse.

Run `node --experimental-strip-types --test tests/review-validation.test.mjs` to check the submission contract, and `npx next build` to validate the Vercel build.
