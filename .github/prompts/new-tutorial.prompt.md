---
name: new-tutorial
description: 'Scaffold a step-by-step MakeCode micro:bit tutorial for the robot'
mode: agent
argument-hint: "Describe the tutorial goal, e.g. 'clap makes the robot happy and raises its arms'"
---

# Create a MakeCode robot tutorial

Create a MakeCode micro:bit tutorial for Peter Heldens' robot ("microbitrobot").

Before writing anything:
1. Read `AGENTS.md` (hardware facts, pin map, full `robot.*` block API) and
   `robot.ts`. Treat them as ground truth — never invent blocks or pins.
2. Follow the tutorial format in `makecode-agent-system-prompt.md` §4.

Then produce:
- A tutorial Markdown file where `#` is the title and each `##` is one small step,
  with ` ```blocks ` snippets that build up the program one concept at a time. Use
  `## Introduction @showdialog` for the first step and a "Try it yourself" final
  step.
- Start the program with `robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)`
  in `on start`, and `robot.showServos(AnalogPin.P15, AnalogPin.P16)` if the arms
  or dashboard are used.
- A short plain-language walk-through of what each step teaches.
- The shareable link:
  `https://makecode.microbit.org/#tutorial:https://github.com/peterheldens/pxt-robotph/<file>.md`
- A note to test in the simulator first (NeoPixels on P8), then on a micro:bit V2.

Validate any TypeScript you generate with `npx makecode build -j` if you can.

The tutorial goal: ${input}
