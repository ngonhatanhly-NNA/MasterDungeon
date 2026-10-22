# Zombie RPG — Echoes of the Dead

A story-driven, top-down 2D zombie RPG starter with a polished anime visual-novel art pass. The intended experience combines environmental exploration, chapter-based storytelling, relationship arcs, quest chains, faction choices, and mysteries that are revealed gradually.

**Design principle:** game first, AI later. The MVP is intentionally playable without a backend or AI service. React + TypeScript + Vite runs the prototype in the browser; `localStorage` handles local save/load.

## Quick start

Requirements: Node.js 20+ and npm.

```bash
npm install --prefix frontend
npm run dev
```

Open the local URL printed by Vite. To verify the production build:

```bash
npm run build
```

## Controls

- `W A S D` or arrow keys: move Karin.
- `E`, `Enter`, or `Space`: interact with a nearby NPC / continue dialogue.
- Move onto the bright exit tile to transition between maps.
- Step on an item to collect it.
- **Save / Load** use this browser's `localStorage`; they do not sync across devices.

## Current prototype

- Top-down tile maps: Safe Haven, Old Road, Abandoned Town, St. Oran Hospital, Greybridge City.
- Player movement and wall collision.
- NPC proximity interactions and dialogue.
- One starter quest: **The Old Key**.
- Item pickups, inventory, quest log, journal and map route panel.
- Map transitions and browser save/load.
- Original anime portrait assets for Karin, Kai and six companions, plus a Karin × Kai relationship art panel.
- A working first-meeting choice with Kai that changes their bond score and writes to the journal.
- A companion roster panel and a dark navy / blue-gray visual-novel UI.

Combat, a full companion party system, audio playback, production spritesheets and AI are **not yet implemented**. Branching dialogue currently covers the first Kai trust decision; this is a foundation for a larger route/relationship system, not yet a full romance route.

## Project structure

```text
zombie-rpg-v2/
├── frontend/
│   ├── public/assets/
│   └── src/
│       ├── game/
│       │   ├── engine/       # collision, movement and interaction rules
│       │   ├── maps/         # map registry
│       │   ├── entities/     # player entity/profile
│       │   ├── npcs/         # character profiles
│       │   ├── quests/       # quest types and progression
│       │   ├── dialogue/     # dialogue data types
│       │   └── save/         # local save/load
│       ├── data/             # map, NPC, quest and item data
│       ├── App.tsx
│       ├── types.ts
│       └── styles.css
├── backend/                  # future API and account design
├── ai/                       # future ML/CV/LLM integration plans
└── docs/                     # game design bible and roadmap
```

## Story direction

This is an original setting with the high-level *design* influence of long-form, chapter-led RPGs: an expanding cast, optional character arcs, a central mystery, side quests with consequences, and later route variations. It does not use Pokémon, Rejuvenation characters, locations, factions or plot events.

Read:
- [`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md) — story bible, cast, factions, chapter outline, relationship design and endings.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — incremental build plan from MVP to combat, companion systems and AI.
- [`backend/README.md`](backend/README.md) — future backend boundary.
- [`ai/README.md`](ai/README.md) — future AI/ML/CV layer.

## Architecture guardrails

1. Narrative content belongs in data files, not React view markup.
2. Game rules belong in `game/engine`; UI components display state and dispatch actions.
3. `localStorage` is a prototype persistence layer, not an account database.
4. NPC AI must never author irreversible quest outcomes without deterministic validation by the game engine.
5. Save data must be versioned and migrated when its schema changes.
6. Keep the core playable when the AI layer or backend is offline.

## License / assets

Character profile art is supplied as optimized WebP crops under `frontend/public/assets/characters/`. The map still uses tile-based placeholder environments and item emojis; replace these with original animated sprites, music and sound effects before a public release. Do not redistribute assets from other games.
