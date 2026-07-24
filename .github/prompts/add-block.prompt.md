---
name: add-block
description: 'Add a new block to the robot extension, with locales, docs and a version bump'
mode: agent
argument-hint: "Describe the new block's purpose, name and parameters"
---

# Add a new block to the robot extension

Add a new block to `robot.ts` following the existing conventions, then keep the
whole repo consistent.

Steps:
1. Read `robot.ts` and `AGENTS.md` first to match style, enums, groups and the
   pin map. Reuse the number value-socket pattern for any servo parameter.
2. Implement the block in `robot.ts` with a `//% block="..."` annotation, a
   `//% group=...` from the existing groups, sensible `.defl` defaults and
   min/max where relevant.
3. Add the block text and JSDoc to **all five** `_locales/{en,nl,de,fr,es}/`
   folders (`*-strings.json` and `*-jsdoc-strings.json`).
4. Document the new block in `AGENTS.md` §4 (signature, parameters, behavior) and,
   if user-facing, in `README.md`.
5. Add coverage in `test.ts`.
6. Bump the version in `pxt.json` (patch for additive, major for a breaking enum
   change) and run `npx makecode` — expect `Build OK`.
7. Update the "last verified" stamp in `AGENTS.md`.

Do **not** add the new file(s) or docs to any place that ships in the package
beyond what already belongs there. Commit message in English describing what the
block functionally does.

The new block: ${input}
