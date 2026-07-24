---
name: validate
description: 'Compile-check MakeCode robot code with the headless makecode CLI'
mode: agent
argument-hint: "Paste the MakeCode TypeScript to validate (or leave empty to build the current test.ts)"
---

# Validate MakeCode robot code

Type-check MakeCode micro:bit code for Peter Heldens' robot against the real
compiler, so hallucinated blocks or wrong signatures are caught before the user
runs anything.

Steps:
1. If code was provided in `${input}`, write it into `test.ts` at the repo root
   (this file is already listed in `pxt.json`'s `testFiles`, so it compiles as a
   top-level program). Otherwise, validate the existing `test.ts`.
2. Run the headless build from the repo root:

   ```bash
   npx makecode build -j
   ```

   `-j` builds in JavaScript mode: a fast, full Static TypeScript type-check with
   no ARM native step.
3. Report the result:
   - **Exit code 0 / "Build OK"** → tell the user it compiles cleanly.
   - **Any `file.ts(line,col): ERROR …`** → quote the error, explain the cause
     (usually a non-existent `robot.*` block, a wrong signature, or a Static
     TypeScript restriction), fix it using `AGENTS.md` / `robot.ts` as ground
     truth, and rebuild until it passes.
4. Never claim code "looks correct" without an actual passing build. Prefer the
   compiler over inspection.

If the `makecode` CLI is unavailable in this environment, say so and fall back to
a careful manual check against `robot.ts`, clearly flagging that it was not
compiler-verified.
