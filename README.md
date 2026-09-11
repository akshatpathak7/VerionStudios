# Verion Studios

A single-page video editing and digital services studio website, built with React and the Sites Vinext starter.

## Update content

Edit `app/studio.ts` to change the service copy, logo path, and contact email addresses. `public/verion-logo.svg` frames the original supplied JPEG artwork without redrawing it; update the configuration path to replace it. The editing graphic uses simple layout shapes and an illustrative timeline.

## Development

Run `npm run dev` for the local preview and `npm run build` for a production build. Motion can be paused on the page and automatically stops when reduced motion is preferred.

## Hosting configuration

Hosting settings live in `.hosting/hosting.json`. The build emits the deployment provider’s required metadata inside ignored `dist/` output. For Sites publishing tools that require the old path, create an ignored local alias with `ln -s .hosting .openai`; the alias is not part of the repository.
