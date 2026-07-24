# CLAUDE.md

This repository is a **MakeCode for micro:bit extension** (`robot`) for Peter
Heldens' wooden classroom robot ("microbitrobot").

For everything you need, see the dedicated agent guides — they are the single
source of truth, so this file just redirects you:

- **`AGENTS.md`** — authoritative hardware facts, pin map, wiring/pin diagrams,
  the full `robot.*` block API, conventions, and a build-validation section. Read
  this before writing any robot code.
- **`robot.ts`** — the extension source (definitive block list; wins over docs if
  they ever disagree).
- **`makecode-agent-system-prompt.md`** — the full system prompt for writing
  MakeCode programs and tutorials for this robot.
- **`.github/copilot-instructions.md`** — repo conventions (English commits,
  localization in all five `_locales`, build/release rules).

Quick facts: micro:bit **V2**; NeoPixel face on **P8**; arms = servo2 on **P15**;
dashboard/meter = servo3 on **P16**; knob on **P2**; left-hand button = **Button A**.
Build/type-check with `npx makecode build -j` (expect `Build OK`). Never invent
blocks or pins.
