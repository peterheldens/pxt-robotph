---
description: 'Rules for editing the robot MakeCode extension source and its localizations'
applyTo: 'robot.ts, test.ts, _locales/**'
---

# Robot extension source rules

`robot.ts` is the single source of truth for the extension's block API. When
changing it, keep the whole repo consistent.

- Every exported block must have a `//% block="..."` annotation and belong to one
  of the declared `//% groups` (Setup, Colors, Expressions, Arms, Radio).
- Pin numbers and defaults must match the pin map in `AGENTS.md` §2
  (face → **P8**, arms/servo2 → **P15**, dashboard/servo3 → **P16**, knob → **P2**,
  left-hand button → **Button A**). Never introduce a pin that the hardware does
  not have.
- Servo parameters use the **number value-socket pattern** (`param: number` with
  `//% param.shadow=robotServoField`), not an enum-typed field — this keeps the
  dropdown droppable and preserves sibling defaults. Do not revert to enum-typed
  servo params.
- Changing an **enum** value (RobotPart, RobotExpression, ArmPosition, RobotServo,
  KnobPin) is a breaking change — bump the **major** version in `pxt.json`.
- Any change to block text (`//% block=...`) or JSDoc must be mirrored in **all
  five** `_locales/{en,nl,de,fr,es}/` folders (both `*-strings.json` and
  `*-jsdoc-strings.json`).
- After editing `robot.ts`, run `npx makecode build -j` and expect `Build OK`.
- A code change to `robot.ts` requires a **version bump in `pxt.json`** and a
  matching GitHub release `vX.Y.Z`.
- Follow the Static TypeScript subset: no `var`, `import`/`require`, `async/await`,
  generators, `for...in`, regex, or function overloads.
- Keep the "Sync contract" in `AGENTS.md` §12 satisfied: update `AGENTS.md`,
  `README.md`, and `makecode-agent-system-prompt.md` when the API changes.
