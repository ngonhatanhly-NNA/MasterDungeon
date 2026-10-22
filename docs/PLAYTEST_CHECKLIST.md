# MVP Playtest Checklist

Run `npm install --prefix frontend` once, then `npm run dev` from the repository root.

## Core flow

- [ ] New game starts Karin in Safe Haven with Bread ×2 and Water ×2.
- [ ] WASD and arrow keys move the player; wall tiles block movement.
- [ ] Stand next to Sarah and press E to open her dialogue.
- [ ] Continue each dialogue line with E, Enter, Space or the on-screen button.
- [ ] Finish Sarah's first conversation; `THE OLD KEY` becomes active.
- [ ] Walk onto the glowing exit at the east side of Safe Haven to enter Old Road.
- [ ] Step onto the key pickup; Old Key enters inventory and the first quest objective completes.
- [ ] Return to Safe Haven and talk to Sarah; the quest completes and Water increases by one.
- [ ] Enter Abandoned Town, St. Oran Hospital and Greybridge City through the connected exits.
- [ ] Talk to Kai: finish his first lines, make a response choice, then speak to him again to reveal the erased rescue mission.
- [ ] Save, refresh the page, then Load; map, inventory, quest progress, journal, flags and bond should persist.
- [ ] Start a new session using the reset button; verify it does not silently erase the browser's saved slot.

## Edge cases

- [ ] Press E while no NPC is nearby; the game should show a helpful message.
- [ ] Attempt to walk into each wall; Karin should not pass through it.
- [ ] Walk over the same pickup after collecting it; it should not be granted twice.
- [ ] Save with a dialogue open; loading should return to the world, not reopen a half-finished dialogue.
- [ ] Test a browser profile with storage disabled; the game should remain playable and show a save error.

## Known prototype limitations

- The NPCs do not block player movement yet.
- The bond meter is a scripted proof of concept, not a complete route system.
- Dialogue is mostly sequential; the first Kai scene has one two-option trust decision. Broader story branching is not implemented yet.
- The audio button is a visual placeholder; no music is played.
- Main character/NPC portraits use WebP art; map environments are tile-based placeholders and item pickups still use emoji.


## Story art pass (v0.3.0)

- [ ] Karin and Kai anime portrait assets load in the profile cards and dialogue overlay.
- [ ] Karin's first conversation with Kai ends with two response choices.
- [ ] “Tôi tin cậu” increases bond by 2 and logs the response.
- [ ] “Tôi sẽ tự tìm sự thật” decreases bond by 1 and logs the response.
- [ ] Speak with Kai again to reveal his St. Oran mission secret.
- [ ] Confirm companion portraits fit at desktop and narrow mobile widths.
- [ ] Save/load after the choice and confirm relationship flags and bond restore correctly.
