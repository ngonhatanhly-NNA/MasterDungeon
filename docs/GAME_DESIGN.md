# Game Design Bible — Zombie RPG: Echoes of the Dead

**Status:** working concept v0.2  
**Genre:** 2D top-down story-driven survival RPG, mystery/horror, character drama, slow-burn M/M romance  
**Platform target:** browser first; desktop/mobile responsive UI  
**Narrative rule:** the story is original. Pokémon Rejuvenation is a structural/tone reference for a long-form, chapter-based RPG with an evolving cast and layered mystery, not a source of plot, character or world content.

---

## 1. Core fantasy

Explore a quarantined world where the infected repeat fragments of their final memories. Every settlement has a version of the truth. Every faction believes it is saving lives. Karin and Kai must discover what the nightly radio signal is doing before the next transmission changes the infected — and the living — forever.

The player fantasy is not “loot until stronger.” It is:

- enter a new location with unanswered questions;
- talk to people whose testimony conflicts;
- investigate spaces and evidence;
- decide whom to believe and whom to protect;
- see earlier choices change later conversations, routes and companion outcomes;
- slowly uncover the truth behind the outbreak;
- watch Karin and Kai learn to trust one another without losing their own agency.

**Emotional pillars:** dread, tenderness, distrust, found family, memory, moral ambiguity, and the fragile idea of home.

## 2. Story premise

Three years after the first outbreak, the city of Greybridge is divided into isolated survivor settlements. The public explanation is that a contaminated medical supply chain caused the infection. Infected people, called **Echoes**, sometimes repeat a name, a warning or a line from the last hours of their lives. Most survivors treat this as meaningless noise.

At 03:17 every night, a radio broadcast comes from the sealed St. Oran Hospital. It lists evacuation coordinates for places that were supposedly abandoned years ago. Karin, a former emergency-radio technician, recognizes a signal pattern connected to the night his older sister disappeared. Kai, a 24-year-old former rescue worker, recognizes the call sign of the unit whose involvement was removed from every official report.

The first lead is a metal key marked **WARD 0**. It opens no visible door and appears to belong to a ward that does not exist on any hospital plan. Sarah asks Karin to retrieve it from Old Road. Kai insists on joining him, but avoids explaining why the hospital scares him.

The mystery begins as a search for a key and becomes a fight over who gets to control the memories of the dead — and the living.

## 3. The central mystery: the MIRROR Protocol

A research program at St. Oran, known as **MIRROR**, was intended to help patients recover memory after neurological trauma. During the first emergency, an experimental signal-based intervention was used to stabilize patients in a sealed ward. The process interacted disastrously with the infection and left a pattern of synchronized neurological activity among many infected people.

The signal does not simply “control all zombies.” It can amplify, mute or redirect certain behaviors, and different groups have learned fragments of how it works. The repeated voices are fragments of memory-like activity, not reliable proof that a person's full consciousness survives. That uncertainty is ethically important: some survivors want to protect the Echoes; others see them as dangerous imitations; the Meridian Authority wants to weaponize the signal as a containment tool.

**Mystery layers:**
1. Why is St. Oran transmitting at 03:17?
2. What is Ward 0, and why was it removed from the plans?
3. Why does Karin recognize part of the signal?
4. Why did Kai's rescue unit arrive before the public alarm?
5. Who benefited from deleting the incident logs?
6. Is it ethical to use a signal that may preserve fragments of a person's memory but can also alter infected behavior?
7. Can Greybridge be saved without handing control of the signal to another authoritarian group?

Do not explain all of these in the prologue. Each chapter should answer one concrete question and make the bigger mystery more complicated.

## 4. The two leads

### Karin — “The Listener”

- **Age:** 22; **height:** 1.70 m; male.
- **Role:** primary controlled character during the first playable build; radio technician, observer and investigator.
- **Personality:** quick-witted, curious, emotionally perceptive, stubborn when someone tries to make decisions for him. Uses humor to hide abandonment anxiety.
- **Strengths:** recognizes radio patterns, notices inconsistencies, picks locks and finds non-obvious routes.
- **Flaw:** tries to solve pain by collecting facts; can treat people like puzzles when frightened.
- **Personal wound:** his older sister Ina disappeared during the first evacuation. Karin has a partial emergency recording but no reliable account of what happened.
- **Arc:** from believing that enough evidence will make loss understandable to accepting uncertainty without surrendering the right to choose.

### Kai — “The Shield”

- **Age:** 24; **height:** 1.90 m; male.
- **Role:** co-lead, field rescuer, defensive combat specialist once combat is implemented.
- **Personality:** quiet, practical, observant, dryly funny in private. Protective without wanting to appear controlling.
- **Strengths:** first aid, rescue routes, carrying heavy equipment, keeping calm under pressure.
- **Flaw:** withholds information “for someone else's safety,” then calls that silence protection.
- **Personal wound:** his rescue unit received a sealed order to enter St. Oran before the public evacuation alert. The mission went wrong; the official record says the unit was elsewhere.
- **Arc:** from taking responsibility for everyone and confessing almost nothing to learning that care requires honesty, consent and allowing Karin to share risk.

### Karin × Kai — the relationship arc

Their relationship is a **slow-burn central romance**, not a collectible route unlocked by choosing the “correct” flirt lines. Their height difference (1.70 m / 1.90 m) may appear in staging and sprite composition, but it should not reduce either character to a physical stereotype.

**Relationship stages:**
1. **Uneasy partnership:** Kai insists on accompanying Karin; Karin resents being treated as fragile.
2. **Reliability:** small acts of care during exploration; each starts trusting the other's competence.
3. **Fracture:** Karin discovers that Kai concealed the sealed rescue order. The conflict is about honesty and agency, not jealousy.
4. **Mutual choice:** Kai admits what he knows and lets Karin decide whether to continue; Karin recognizes that protecting Kai is also his choice.
5. **Commitment:** a quiet scene after the hospital sequence makes their feelings explicit. They decide what they want together, even if they disagree about the wider world.

**Relationship system rules:**
- Track at least `bond`, `honesty`, and `respect` separately in the full game.
- High bond without honesty can still trigger a fracture scene.
- Give each character boundaries; “always agree with Kai” is not a winning strategy.
- The romance is queer and emotionally sincere. Keep affection character-driven; intimacy level can remain non-explicit.
- In endings, romance status is influenced by both relationship variables and major story choices, not a single score threshold.

## 5. Companion ensemble

Companions must have independent goals and disagreements. A companion should not exist only to explain lore or praise the leads.

| Character | Role | Want | Secret / conflict | Gameplay utility |
|---|---|---|---|---|
| **Sarah Vale**, 29 | doctor and Safe Haven coordinator | keep the settlement alive through winter | approved the use of a restricted triage list and fears the list will be exposed | medicine, recovery, survivor reputation |
| **Mira**, 25 | courier and signal hobbyist | find her missing partner across the old transit network | sold a fragment of the nightly signal to a faction to obtain medicine | shortcuts, radio interception, optional routes |
| **Jun Park**, 23 | mechanic and scavenger | rebuild a working generator and make himself useful | left a trapped friend during the first evacuation; jokes whenever guilt surfaces | repairs, crafting, power-grid puzzles |
| **Dr. Nadiya Vale**, 42 | former MIRROR researcher | prevent a second mass-casualty event | knows the signal's limits but has deliberately destroyed one set of records | scientific clues, antidote/containment research |
| **Rook Alvarez**, 31 | ex-Meridian security officer | get an estranged sibling out of a controlled district | participated in a raid but refused an order to abandon civilians | security access, tactical support, faction diplomacy |
| **Yuna**, 20 | mapmaker and quiet courier | prove her missing mother's evacuation route existed | has an incomplete route map that can expose the official timeline as false | hidden items, rescue requests, secret ending clue |

Companion arcs should support **optional quests**. A missed side quest does not freeze the main story, but it changes later support, available tools, and who appears in the finale.

## 6. Factions

### Safe Haven Council
A local coalition that keeps people fed and walls repaired. It genuinely saves lives but has learned to censor information whenever it fears a panic. Sarah is its medical voice, not its absolute ruler.

### Meridian Authority
A military-administrative zone that offers power, ration cards and predictable rules. It views free access to MIRROR as a security threat. Its members are not all cruel; some believe hard decisions prevent a larger disaster.

### The Lantern Network
Couriers, radio operators and mechanics who move people, medicine and information between settlements. They value freedom but are vulnerable to infiltration and black-market deals.

### The Choir of Echoes
A decentralized group that records the words repeated by infected people and tries to protect selected Echoes. Some members are compassionate researchers; others romanticize the infected and ignore the danger they pose.

Faction reputation is separate from Karin/Kai bond. A choice can improve relations with one faction while damaging another, and companions can disagree with the player's decision.

## 7. Chapter outline

Plan for a long story, but ship one polished chapter at a time. The first release should cover the prologue and the opening Old Road quest only.

### Prologue — **03:17**
**Location:** Safe Haven. Teach movement, collision, talking, quest log, inventory and save/load. Sarah mentions a signal from St. Oran. Karin notices a familiar pattern in the recording; Kai reacts to the hospital name but will not explain why. The player accepts **The Old Key** quest.

**End beat:** a second broadcast repeats a phrase from Karin's sister's old recording.

### Chapter 1 — **The Road That Was Erased**
**Locations:** Old Road, roadside shelter, abandoned checkpoint. Find the key and an evacuation tag. Meet Mira. Discover that the road closure happened hours before the official outbreak timestamp.

**Key choice:** give Mira the signal fragment, keep it for Sarah, or let Kai destroy it because it might draw infected toward Safe Haven.

**End beat:** the key's Ward 0 stamp matches the back of Kai's old unit tag.

### Chapter 2 — **A Town That Won't Sleep**
**Locations:** Abandoned Town, motel, school gym used as an improvised refuge. Infected Echoes repeat ordinary, contradictory fragments of a town's final night. Jun asks for help restarting a generator; optional rescue quests decide which families can leave.

**Question answered:** Echoes can repeat specific fragments, but the fragments do not always explain what happened.

### Chapter 3 — **Ward Zero**
**Locations:** St. Oran Hospital, records wing, sealed sub-basement. Explore patient notes and damaged access logs. Kai's sealed mission is revealed; he knew the unit had been sent in early, but did not know the full reason. Karin and Kai's trust fractures if the player ignored earlier opportunities to discuss the mission.

**Major scene:** the first honest conversation between the two leads. It should allow silence and anger, not resolve everything with one apology.

### Chapter 4 — **The Lantern Network**
**Locations:** subway maintenance tunnels, signal relay, Lantern safehouse. The player chooses which group gets a working radio relay. Mira's earlier deal becomes relevant. Companion quests can open alternative routes and reduce later casualties.

### Chapter 5 — **City Without Sirens**
**Locations:** Greybridge City, ration district, old municipal broadcast station. The city is functioning under Meridian control, but residents hear a different explanation of the outbreak. Social choices can be more important than fights.

**Key choice:** release evidence publicly, trade it for access to the hospital archives, or keep it secret until corroborated.

### Chapter 6 — **The Choir**
**Locations:** flooded archive, quarantine greenhouse, Choir camp. Discover the limits of MIRROR and the ethical uncertainty around Echoes. A companion can leave temporarily if their core belief is directly violated.

**Question answered:** the signal influences some infected behaviors, but memory-like fragments do not prove a full person is still present.

### Chapter 7 — **A Lie That Kept Us Alive**
**Locations:** Safe Haven, clinic basement, Council chamber. Sarah's restricted triage list comes to light. The player must decide whether to expose her actions, protect her while demanding reform, or hand the records to Meridian. Earlier side quests alter who supports the decision.

### Chapter 8 — **The Last Broadcast**
**Locations:** central relay tower and the MIRROR control room. Every faction converges. Choices determine who controls the signal and whether the evidence reaches the remaining settlements.

**Endings (working titles):**
- **Open Sky:** expose the evidence and create a coalition to study a safer containment protocol. This is not a perfect cure; the world remains dangerous, but people can make informed decisions.
- **The Quiet Zone:** use a limited stabilizing pulse to protect Greybridge while keeping parts of the research secret. The city gains short-term stability at the cost of trust and transparency.
- **Cut the Wire:** destroy the main relay to prevent large-scale signal manipulation. Greybridge becomes harder to coordinate, but no faction can use the central network in the same way.
- **Hidden ending — One More Voice:** available only when enough companion arcs are resolved, the original signal logs are recovered, and Karin/Kai's relationship has both trust and honesty. The player finds a safer alternative, but it still requires consent, risk and collective oversight.

Endings are thematic outcomes, not a morality score. Each should contain a cost, a hope and a specific consequence for the leads and at least two companions.

## 8. Quest design

Quest categories:
- **Main:** advances the chapter mystery.
- **Companion:** changes a character arc or later support.
- **Case file:** optional evidence puzzle that reframes a past event.
- **Settlement:** food, medicine, repairs or evacuation logistics.
- **Relationship:** a character scene unlocked by shared choices, not random gift-giving.

Every quest data record should define: prerequisites, objectives, success/failure states where meaningful, rewards, journal entries, impacted flags, companion reactions and whether it expires at a chapter boundary.

Do not make every quest a fetch quest. Mix environment investigation, dialogue evidence, route choices, survival logistics and occasional encounters.

## 9. Gameplay loop

1. Arrive in a new map and establish its mood.
2. Talk with at least two people who see the problem differently.
3. Explore and collect physical evidence or supplies.
4. Complete a main objective and optionally help a companion.
5. Make one decision with a visible short-term result and a delayed consequence.
6. Return to a hub; update relationships, journals and access to future maps.
7. End the chapter on a reveal or an unresolved contradiction.

## 10. MVP scope

### Included now
- Keyboard movement and collision.
- Five connected prototype maps.
- NPC proximity interaction and sequential dialogue.
- A single quest, item pickup, inventory, journal and map route list.
- localStorage save/load.
- Karin/Kai lead cards and a minimal scripted bond update.

### Next playable milestone
- Data-driven dialogue nodes and choices.
- Independent flags for `bond`, `honesty`, `respect`, faction reputation and companion status.
- NPC spritesheets, animation and interaction prompts.
- Multiple quests with prerequisite graphs.
- Save version migration tests.
- Audio cues, settings and keyboard rebinding.

### Later
- Party/companion system, equipment, crafting, turn-based combat, stealth and enemy perception.
- Chapter route variations, companion outcomes, cinematic dialogue scenes and multiple endings.
- Optional AI-generated ambient dialogue behind validated character/memory rules.

## 11. Writing guardrails

- Keep the cast large but legible: a new character should have a want, a fear, a contradiction and a useful relationship to the mystery.
- Do not answer a mystery only by adding another mystery. Resolve at least one concrete question per chapter.
- Avoid “evil for evil's sake” factions; institutions may do harm while individual members still have reasons and lines they will not cross.
- Karin and Kai must each make consequential decisions. Neither exists only to rescue, motivate or reward the other.
- Give quiet scenes space after major revelations. Use exploration and ambient details to carry lore without forcing long exposition.
- Store flags in a named, documented story-state schema. Do not scatter hardcoded story conditions throughout React components.

## 12. Reference boundary

The high-level structural reference is the chapter-led storytelling and side-quest approach described in the [Pokémon Rejuvenation story/chapter guide](https://pokemonrejuvenation.com/story-chapters). The world, premise, cast, factions, mysteries, dialogue and endings in this document are original to Zombie RPG.
