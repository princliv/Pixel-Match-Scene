## Project architecture

- Keep the game content and progress rules in `src/data/` separate from the route UI so finance material and unlock rules remain editable and testable independently.
- Artwork lives in `public/images/` (WebP). Reference it by path from `src/data/game-content.ts`.
