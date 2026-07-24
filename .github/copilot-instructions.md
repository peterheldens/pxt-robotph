# Copilot instructions for `pxt-robotph`

These instructions apply to GitHub Copilot (and other AI agents) working **inside
this repository**. They are separate from `makecode-agent-system-prompt.md`, which
is a ready‑to‑paste system prompt for an *external* MakeCode assistant.

## What this repo is

A **MakeCode for micro:bit extension** (`robot`) for Peter Heldens' wooden
classroom robot: a 16‑LED NeoPixel face, servo‑driven arms and a dashboard meter,
a left‑hand button, a potentiometer knob, and radio remote control.

- Extension source: **`robot.ts`** (the single source of truth for the block API).
- Agent‑facing hardware/API guide: **`AGENTS.md`** (authoritative facts, pin map,
  wiring/pin diagrams, worked examples).
- External assistant system prompt: **`makecode-agent-system-prompt.md`**.
- Localized block text: **`_locales/{en,nl,de,fr,es}/`** (all five must stay in
  sync when block text changes).
- Local compile test: **`test.ts`**. Package manifest: **`pxt.json`**.

## Hard facts — never contradict these

- Target is **micro:bit V2** (microphone/clap).
- NeoPixel face: **16 LEDs on P8**, `NeoPixelMode.RGB`.
- Arms: **servo2 on P15** (one servo moves both arms together).
- Dashboard/meter: **servo3 on P16**.
- Knob/potentiometer: analog **P2** by default (P0/P1 also allowed).
- Left‑hand button → board **pin A + GND** → reads as **`Button.A`**.
- Wired via the **Kitronik Simple Servo Control Board for BBC micro:bit**.

If you change any of these in `robot.ts`, update `AGENTS.md`, `README.md`, and
`makecode-agent-system-prompt.md` to match.

## Conventions

- **Language:** all commit messages and code comments in **English**. Each commit
  message describes what the change functionally does.
- **Commit trailers:** include the `Co-authored-by:` and `Copilot-Session:`
  trailers when present in the session.
- **Comments:** only comment code that genuinely needs clarification.
- **Localization:** any change to block text (`//% block=...`) must be reflected in
  all five `_locales` folders.

## Build, test and release

- Build/compile check: **`npx makecode`** (expect `Build OK`).
- A **code change** (`robot.ts`) requires a **version bump in `pxt.json`** and a
  matching GitHub release/tag `vX.Y.Z`.
- **Docs‑only changes** (`AGENTS.md`, `makecode-agent-system-prompt.md`,
  `README.md` text, this file) do **not** need a version bump or release.
- `AGENTS.md` and `makecode-agent-system-prompt.md` are intentionally **not** in
  the `pxt.json` `files` array — they live on GitHub only and must stay out of the
  shipped package.

## Do / don't

- **Do** keep `robot.ts` as the source of truth; treat `AGENTS.md` as its mirror.
- **Do** run `npx makecode` after editing `robot.ts` before committing.
- **Don't** invent blocks or pins; only expose what the hardware actually has.
- **Don't** add new tooling directly onto an `integration/*` branch (use a
  dedicated feature branch and merge via PR).
