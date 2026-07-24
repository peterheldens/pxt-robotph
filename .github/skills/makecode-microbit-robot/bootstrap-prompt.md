# Bootstrap prompt — teach an agent (Microsoft Scout, Copilot, …) this repo

Paste the block below as a message to your agent. It makes the agent pull the
robot/MakeCode knowledge from this repository, read the right files, and install
this skill into the current project so it auto-loads in future sessions.

> Run your agent **in the project where you want the skill installed** (for
> example your MakeCode Copilot agent repo), then paste the prompt. If the agent
> already runs inside `pxt-robotph`, the skill auto-loads anyway and the prompt
> simply makes it read in and confirm.

---

```text
Bootstrap yourself as a MakeCode micro:bit expert for Peter Heldens' robot by
pulling everything from this GitHub repository:

  https://github.com/peterheldens/pxt-robotph

STEP 1 — READ (fetch these raw files and treat them as ground truth):
  - Skill:        https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/.github/skills/makecode-microbit-robot/SKILL.md
  - Skill README: https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/.github/skills/makecode-microbit-robot/README.md
  - Robot facts:  https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/AGENTS.md
  - Block API:    https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/robot.ts
  - System prompt:https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/makecode-agent-system-prompt.md
  - Contributing: https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/CONTRIBUTING.md
  - Prompts:      https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/.github/prompts/new-tutorial.prompt.md
                  https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/.github/prompts/add-block.prompt.md
                  https://raw.githubusercontent.com/peterheldens/pxt-robotph/main/.github/prompts/validate.prompt.md

STEP 2 — INSTALL THE SKILL into the current project so you auto-load it in future
sessions:
  - Create the folder .github/skills/makecode-microbit-robot/ if it does not exist.
  - Write into it a copy of SKILL.md and README.md fetched in STEP 1 (verbatim).
  - Confirm the skill is discovered (its name is "makecode-microbit-robot").

STEP 3 — CONFIRM back to me:
  - The robot's authoritative facts you extracted (micro:bit version; the pins for
    the NeoPixel face, the arms servo, the dashboard servo, the knob; how the
    left-hand button reads).
  - That the skill is installed under .github/skills/ and will auto-load next time.
  - How you will validate any code you generate for this robot.

RULES: never invent blocks or pins — robot.ts is the definitive block list and
AGENTS.md the definitive hardware. Write MakeCode Static TypeScript only. When you
generate robot code, validate it with `npx makecode build -j` (drop it into
test.ts). Explain before you code, and disclose the simulator-vs-hardware gap.
```

---

## Notes

- The prompt references files by their **raw GitHub URLs**, so it works even when
  the agent runs in a different repository and has no local copy.
- If you fork or rename the repo, update the URLs above (base:
  `https://raw.githubusercontent.com/<owner>/<repo>/main/`).
