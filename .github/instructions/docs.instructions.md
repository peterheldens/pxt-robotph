---
description: 'Rules for editing the Markdown documentation and agent guides'
applyTo: '**/*.md'
---

# Documentation & agent-guide rules

These Markdown files describe the robot and instruct AI agents. Several of them
repeat the same hardware facts, so keep them consistent.

- `AGENTS.md` and `robot.ts` are the ground truth. When `AGENTS.md` changes,
  verify the "Hard facts" in `.github/copilot-instructions.md` and §5–6 of
  `makecode-agent-system-prompt.md` still match.
- Never change the pin map without also updating the ASCII diagram in
  `AGENTS.md` §2.1 and the "last verified" stamp at the bottom of `AGENTS.md`.
- Do not add external links without a short inline description or a fallback, since
  agents may not follow links.
- Commit messages are in **English** and describe what the change functionally
  does.
- Documentation-only changes do **not** need a `pxt.json` version bump or a
  release (unlike changes to `robot.ts`).
- `AGENTS.md`, `makecode-agent-system-prompt.md`, `CLAUDE.md` and everything under
  `.github/` must stay **out** of the `pxt.json` `files` array — they live on
  GitHub only and must not ship in the MakeCode package.
