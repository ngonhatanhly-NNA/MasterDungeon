# AI Layer (future)

AI is a later extension to the RPG, not a dependency of the core game. The maps, dialogue, quest rules, combat and saves must keep working when every AI service is unavailable.

## Possible modules

- **ML / telemetry:** identify aggregate quest friction and support manual balancing.
- **CV:** optional scanner that classifies screenshots or external camera images; this is an experimental side feature, not a core mechanic.
- **LLM NPC dialogue:** generate bounded variations using approved character sheets, world facts and the current story state.
- **Agents:** orchestrate only allow-listed game actions, with all state changes revalidated by deterministic RPG code.

## NPC context contract

An NPC prompt/context should include:

- stable character profile and current goals;
- memories the NPC legitimately witnessed or was told;
- approved lore entries and faction beliefs;
- current location, active quest flags and relationship values;
- actions/dialogue topics that are allowed at this point in the chapter.

It must **not** include secret future plot reveals unless the character knows them. The model must not invent items, complete quests, change relationship state or reveal private player data. Any proposed state change is a structured suggestion checked by the game engine.

## Safety, reliability and cost

- Use deterministic dialogue as fallback.
- Cache or constrain responses; set latency and token budgets.
- Test for lore contradiction, harassment, prompt injection inside retrieved notes and invalid action requests.
- Keep player telemetry opt-in and minimize collection.
- Treat model output as untrusted content and render it as text, not executable HTML.
