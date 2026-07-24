# Contributing / Local development

This is a **MakeCode (PXT) extension for the BBC micro:bit**. You do not need the
online editor to build or test it — the official `makecode` CLI (`mkc`) downloads
the compiler and runs it locally in Node.js.

> These instructions are for people (and AI agents such as Microsoft Scout)
> working on the extension. None of the files mentioned here ship to
> makecode.microbit.org — only the files listed in `pxt.json`'s `files` array are
> included when the extension is imported.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS, v18+).
- Optionally a real **micro:bit V2** (needed for the microphone/clap and to test
  real servo movement).

## Install the MakeCode CLI

```bash
npm install -g makecode
```

The tool is invoked as `makecode` or `mkc`. **Do not** install the unrelated npm
package `mkc`. The first build downloads a copy of the micro:bit editor into
`~/.makecode` (~50 MB, cached); `mkc.json` in this repo pins the target to
`https://makecode.microbit.org` so everyone builds against the same editor.

## Everyday commands

Run these from the repository root (the folder with `pxt.json`):

| Command | What it does |
|---------|--------------|
| `makecode install` | Download extension sources so VS Code gives full IntelliSense |
| `makecode build -j` | Fast **JavaScript** build = full Static TypeScript type-check (no ARM native). Exit `0` = clean. **Use this to validate generated code.** |
| `makecode build` | Full native build, produces a `.uf2` in `built/` |
| `makecode -w` | Watch mode: rebuild automatically on save |
| `makecode serve` | Start a local server with the **simulator** at <http://127.0.0.1:7001> |
| `makecode build -d` | Build and **deploy** (flash) to a connected micro:bit |
| `makecode bump --patch` | Bump the version in `pxt.json` (do this only for `robot.ts` code changes) |

To validate a snippet, drop it into `test.ts` (already in `pxt.json`'s
`testFiles`, so it compiles as a top-level program) and run `makecode build -j`.

## VS Code

```bash
makecode install   # once, for IntelliSense
code .
```

Edit `robot.ts` with full TypeScript IntelliSense, run `makecode -w` in a terminal
for continuous type-checking, and `makecode serve` for the simulator.

> Note: `makecode serve` gives the **simulator + watch build**, not the full
> drag-and-drop block toolbox. For the block editor, import this repo as an
> extension on <https://makecode.microbit.org>.

## Reproducible environment (Dev Container / Codespaces / Scout)

This repo includes a [`.devcontainer/`](.devcontainer/devcontainer.json) so the
exact same toolchain is available everywhere:

- **VS Code:** "Dev Containers: Reopen in Container".
- **GitHub Codespaces:** create a codespace on the repo.
- **CI / agents (e.g. Microsoft Scout):** any environment with Node can run
  `npx makecode build -j`; the dev container standardizes it and pre-warms the
  `~/.makecode` cache via `postCreateCommand`.

## Continuous integration

[`.github/workflows/build.yml`](.github/workflows/build.yml) runs
`makecode build -j` on every push and pull request, so the extension can never
land on `main` in a state that fails to compile.

## When you change the block API

`robot.ts` is the source of truth. When you add or change a block, a pin, or an
enum, keep the agent docs in sync (see the "Sync contract" in
[`AGENTS.md`](AGENTS.md) §12) and bump the version in `pxt.json`.
