# Development Roadmap

## Phase 0 — Playable foundation (current base)

- [x] Vite + React + TypeScript project.
- [x] Top-down grid movement and wall collision.
- [x] Five connected maps.
- [x] NPC interaction and sequential dialogue.
- [x] Starter quest and a world pickup.
- [x] Inventory, quest panel, journal and route list.
- [x] Browser localStorage save/load.
- [x] Narrative bible and technical boundaries.
- [ ] Run browser playtest and add automated engine tests.
- [ ] Replace emoji stand-ins with original pixel-art sprites.

**Exit criteria:** a new player can start in Safe Haven, talk to Sarah, travel to Old Road, collect the key, return and complete the quest, transition maps and reload a save without losing progress.

## Phase 1 — RPG systems separated from UI

- Add `GameStore` / reducer-style state transitions and remove hardcoded progression conditions from `App.tsx`.
- Add map metadata, spawn points, collision layers and object events.
- Add data-driven dialogue nodes, speaker portraits, choice menus and conditional branches.
- Create a quest engine with prerequisite checks, objective progress, rewards, failure/expiry and journal updates.
- Add explicit story flags and save schema migration (`version` increments plus migrations).
- Add tests for collision, map exits, pickup idempotency, quest rewards and save/load.

## Phase 2 — Chapter 1 vertical slice

- Finish Old Road → Abandoned Town → Ward Zero Hospital route.
- Add 3–5 side quests and one companion quest.
- Add interactions with evidence objects, locked doors and environmental clues.
- Add original tile set, Karin/Kai sprites, walking animation, interaction indicators and portraits.
- Write a complete chapter script and test with a route/state matrix.

## Phase 3 — Relationships and companions

- Track `bond`, `honesty`, `respect`, companion trust and faction reputation independently.
- Add party state (active, waiting, missing/left temporarily) and companion reactions.
- Add relationship scenes that require specific context, not just score thresholds.
- Add accessibility options, text speed, dialogue history and reduced-animation mode.

## Phase 4 — Combat and survival

Recommended direction: menu-driven, turn-based encounters that fit the browser and let narrative choices matter. Avoid making every infected encounter mandatory.

- Define stats and damage rules in pure engine functions.
- Add initiative, skills, status effects, equipment and item use.
- Introduce stealth, distraction and retreat as alternatives to combat.
- Tie combat to encounter data and companion roles rather than embedding it in maps.
- Balance resource scarcity without making one missed pickup block the main story.

## Phase 5 — Production narrative

- Build chapter state diagrams and story-flag dictionary.
- Add faction-specific paths and delayed consequences.
- Implement companion quest arcs and three main endings plus a gated hidden ending.
- Add localization pipeline (Vietnamese first; English-ready strings).
- Add content-validation tooling for missing dialogue targets, invalid item IDs, unreachable exits and cyclic quest dependencies.

## Phase 6 — Backend (only when needed)

- FastAPI or another typed API, with SQL database.
- User accounts and cloud save after single-player save data is stable.
- Server-side validation for inventory, quest completion and any future multiplayer state.
- Backups, migrations, observability, rate limiting and auth/session security.
- Keep single-player playable without an account or network connection.

## Phase 7 — AI layer (after fixed game rules are stable)

1. **Telemetry/ML:** collect opt-in aggregate gameplay events, then model where players stall or abandon quests. Avoid personal profiling.
2. **CV:** optional external image-based zombie scanner prototype; not required to play the game.
3. **LLM NPC dialogue:** retrieval from approved character memories and lore; output is constrained by quest state and character knowledge.
4. **Agents:** tool calls must be allow-listed and validated by deterministic engine rules. An agent may suggest dialogue or a bounded action; it cannot grant arbitrary items, rewrite a save or bypass quest prerequisites.
5. **Evaluation:** regression tests for lore consistency, abusive output, repeatability, latency and cost. Provide a non-AI fallback for every required interaction.

## Recommended first sprint

1. Install frontend dependencies and run the existing prototype locally.
2. Play through The Old Key twice: once normally and once after save/load.
3. Fix any movement, interaction or progress bugs uncovered by the browser test.
4. Move quest state transitions to a reducer/service and add Vitest unit tests.
5. Only then add more content. A small, tested story slice is worth more than ten empty maps.


## Version 0.3.0 — Anime story-art pass

- [x] Replace emoji profile placeholders for Karin/Kai with original anime portrait crops.
- [x] Add a relationship scene banner and six companion portraits.
- [x] Add the first Kai trust choice, affecting the bond score and journal.
- [x] Restyle the interface to a night-blue, visual-novel palette.
- [ ] Replace remaining tile placeholders with consistent original pixel-art map tiles and animated sprites.
- [ ] Expand trust choices into chapter-level romance routes and distinct endings.
