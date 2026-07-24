# makecode-microbit-robot (Agent Skill)

An **Agent Skill** (SKILL.md format, compatible with Microsoft Scout CLI,
`microsoft/skills`, GitHub Copilot CLI, and other agents that read
`.github/skills/`) that gives an AI agent expert knowledge of **MakeCode for the
BBC micro:bit** and of **Peter Heldens' classroom robot** (`microbitrobot`), so it
can write MakeCode (Static TypeScript) programs and step-by-step tutorials that
actually compile and respect the real hardware.

The skill points at this repository's live files
([`AGENTS.md`](../../../AGENTS.md), [`robot.ts`](../../../robot.ts),
[`makecode-agent-system-prompt.md`](../../../makecode-agent-system-prompt.md)) as
the single source of truth, with an offline fallback cheat-sheet, so it stays
correct as the extension evolves.

## Where it lives

This folder is under **`.github/skills/`**, so agents that follow the
[agentskills.io](https://agentskills.io) convention — including **Microsoft Scout
CLI** and **GitHub Copilot** — discover it **automatically** when they work inside
this repository. No manual step is needed here.

## Install into another project / agent

**Option A — copy the folder manually:**

```bash
# Copy the skill into the target project's skills directory
cp -r .github/skills/makecode-microbit-robot /path/to/your-project/.github/skills/
# (Scout / Copilot discover skills under .github/skills/ automatically)
```

On Windows PowerShell:

```powershell
Copy-Item -Recurse .github\skills\makecode-microbit-robot "$HOME\your-project\.github\skills\"
```

**Option B — with the skills CLI (if the skill is published in a catalog):**

```bash
npx skills add peterheldens/pxt-robotph --skill makecode-microbit-robot
```

After installing, start a new session in Scout; the skill is matched by its
`description` and activates when you ask about MakeCode micro:bit or this robot.

## What it does

- Knows MakeCode + Static TypeScript rules and the core micro:bit namespaces.
- Knows this robot's hardware, pin map, and full `robot.*` block API.
- Knows how to author MakeCode **tutorials** (`##` = steps, ` ```blocks ` fences,
  `@showdialog`, `#tutorial:` links).
- Teaches with an "explain → show → try" workflow and discloses the
  simulator-vs-hardware gap.

## Keeping it current

The skill fetches this repo's raw files at use time, so updating `AGENTS.md` /
`robot.ts` keeps the skill accurate. The embedded cheat-sheet is a fallback; if
you change the pin map, update both `AGENTS.md` and the cheat-sheet in `SKILL.md`.
