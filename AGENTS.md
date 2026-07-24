# AGENTS.md — Programming Peter Heldens' micro:bit Robot

> **Purpose of this file.** This document is written for **AI coding agents**
> (for example a GitHub Copilot / GPT agent) that are asked to write MakeCode
> programs for **Peter Heldens' classroom robot ("microbitrobot")**. It contains
> every fact an agent needs to generate correct code and tutorials **without
> having to ask the user follow‑up questions**: the exact hardware, the pin map,
> the sensors, and the complete block API of the `robot` extension in this
> repository.
>
> If you are an agent and you were given the URL of this repository, **read this
> whole file first**, then generate code. Treat the "Authoritative hardware
> facts" and "Block API reference" sections as ground truth.

---

## 1. What this robot is

**microbitrobot** is a **wooden classroom robot** built around a **BBC
micro:bit**. It "pulls faces" using a ring of **16 NeoPixels** that form a
colorful face (eyes, nose, mouth and lips), it has **moving arms** and a
**dashboard with an analog meter**, and it doubles as a **blackboard**: children
in the class can plug in their own micro:bit (physically) or drive the robot
wirelessly with a **remote controller** over micro:bit **radio**.

All of the robot's behavior is exposed through the **`robot` MakeCode
extension** in this repository. The extension drives the servo and NeoPixel pins
**directly** — there is **no dependency on any Kitronik software extension**,
even though the hardware is wired through a Kitronik servo board.

- **Editor:** MakeCode for micro:bit — `https://makecode.microbit.org`
- **Add the extension:** Extensions → paste this repo URL →
  `https://github.com/peterheldens/pxt-robotph` → pick the **Robot** tile.
- **Extension dependencies:** `core`, `radio`, and
  `github:microsoft/pxt-neopixel`.

---

## 2. Authoritative hardware facts (answers to the usual questions)

An agent should **not ask** the user about these; assume the values below unless
the user explicitly overrides them.

| Question | Authoritative answer |
|---|---|
| Which robot model? | **microbitrobot**, the wooden classroom robot by **Peter Heldens**. |
| micro:bit version? | **micro:bit V2** (needed for the built‑in microphone / clap detection). |
| How many servos drive the arms? | **One servo drives BOTH arms together** = **servo2**. There is *not* one servo per arm. |
| What is servo3 for? | The **dashboard / analog meter** (needle/gauge). |
| Servo pins? | **servo2 (arms) → pin P15**, **servo3 (dashboard/meter) → pin P16**. These are the defaults; they are set by `robot.showServos(...)`. |
| NeoPixel type & wiring? | A **single 16‑LED NeoPixel ring** (WS2812‑style, `NeoPixelMode.RGB`) on data pin **P8**. The nose, eyes, lips etc. are **ranges on that one ring**, not separate strips. |
| Is the nose a separate NeoPixel? | **No.** The nose is **LED index 3** of the same ring. The eyes are indexes **1 and 2**. See the face layout table. |
| Which sound sensor for the clap? | The **micro:bit V2 on‑board microphone**. Use core block `input.onSound(DetectedSound.Loud, ...)`. No extra wiring or pin is needed. (There is no sound block in this extension.) |
| Knob / potentiometer pin? | Signal to an analog pin **P0, P1 or P2** (**default P2**), used by `robot.turnServoWithKnob`. Wiring: **red → 3V, black → GND, blue (signal) → P0/P1/P2**. |
| Push button (left hand)? | The button in the robot's **left hand** is wired to the servo board's separate **pin A** and **GND**, so pressing it registers as **micro:bit Button A**. In code use `input.onButtonPressed(Button.A, ...)`. |
| Vibrating spiral? | Present on the physical robot but **not exposed by this extension**. Use core micro:bit blocks if needed. |
| How are things wired? | Through the **Kitronik Simple Servo Control Board for BBC micro:bit**: **Servo1 → P8** (NeoPixel face data), **Servo2 → P15** (arms), **Servo3 → P16** (dashboard/meter). The board also breaks out a separate **pin A** (for the left‑hand button). |
| Remote controller link? | micro:bit **radio** (`radio` package). See `robot.radioSendValue` (controller side) and `robot.onRadioReceived` (robot side). |

### Default pin map (copy‑paste ready)

```
NeoPixel face data ...... P8   (DigitalPin.P8)   — 16 LEDs, RGB — board port "Servo1"
Arms servo (servo2) ..... P15  (AnalogPin.P15)                  — board port "Servo2"
Dashboard servo (servo3)  P16  (AnalogPin.P16)                  — board port "Servo3"
Knob / potentiometer .... P2   (AnalogPin.P2, default; or P0/P1) — blue = signal
   knob power ........... red → 3V, black → GND
Left-hand button ........ board "pin A" + GND  → registers as micro:bit Button A
Clap / sound ............ micro:bit V2 microphone (no pin)
```

### 2.1 Wiring & how to draw a pin diagram

Everything connects through the **Kitronik Simple Servo Control Board for BBC
micro:bit**, which the micro:bit plugs into. Use this component → connector → pin
mapping whenever you explain the wiring or draw a pin diagram:

| Component | Connects to | micro:bit pin | Extra wiring |
|---|---|---|---|
| NeoPixel face (16‑LED ring) | board port **Servo1** | **P8** | signal only (VCC/GND from the board) |
| Arms servo (servo2) | board port **Servo2** | **P15** | 3‑wire servo (signal / VCC / GND) |
| Dashboard/meter servo (servo3) | board port **Servo3** | **P16** | 3‑wire servo (signal / VCC / GND) |
| Left‑hand button | board **pin A** ↔ **GND** | reads as **Button A** | 2 wires; pressing = `Button.A` |
| Potentiometer (knob) | analog **P0 / P1 / P2** (default **P2**) | P2 | **red → 3V, black → GND, blue (signal) → P2** |
| Clap detection | — | on‑board mic (V2) | none |

**Board port locations (physical layout of the servo board):**

- **Servo1 — top‑left of the board.** Goes to the **NeoPixel** ring; the NeoPixel
  data **input starts at LED 0 = Tinkywinki** (the antenna), then eyes, nose,
  lips around the ring.
- **Servo2 — top‑right of the board.** Goes to the servo **in the middle of the
  robot** that drives the **arms**. **One servo moves both arms**, so the two
  arms always go up or down **together**.
- **Servo3 — bottom‑right of the board.** Goes to the servo **in the robot's
  hand** (the robot's **right** hand = your **left** hand when you face the
  robot) that drives the **dashboard meter**.

**How to draw the pin diagram (for agents):** when the user asks for a wiring or
pin diagram, produce a clear component‑to‑pin diagram based on the table above.
A simple, reliable format is an ASCII block like this (include only the parts the
program actually uses):

```
                  ┌────────────────────────────┐
   Servo1  P8 ────┤ NeoPixel ring (16 LEDs)     │
   Servo2  P15 ───┤ Arms servo (servo2)         │
   Servo3  P16 ───┤ Dashboard/meter (servo3)    │
   pin A + GND ───┤ Button in left hand → A     │
   P2  (blue) ────┤ Potentiometer signal        │
   3V  (red) ─────┤ Potentiometer +             │
   GND (black) ───┤ Potentiometer -             │
   (V2 mic) ──────┤ Clap / loud sound           │
                  └────────────────────────────┘
```

Keep the micro:bit pin numbers exactly as in the table; **do not invent pins**.
If a component is not used by the program, leave it out of the diagram.

---

## 3. The face: NeoPixel layout

The face is a single 16‑LED ring. Parts are ranges of LED indexes:

| Part (`RobotPart`) | LED index(es) |
|---|---|
| `Tinkywinki` (antenna) | 0 |
| `Eyes` | 1, 2 |
| `LeftEye` | 1 |
| `RightEye` | 2 |
| `Nose` | 3 |
| `Lips` | 4 … 15 |
| `UpperLip` | 4 … 9 |
| `LowerLip` | 10 … 15 |
| `Face` | 0 … 15 (whole ring) |

---

## 4. Block API reference (the robot extension)

All blocks live in the **`robot`** namespace. Signatures are shown as
TypeScript, which is exactly what the MakeCode blocks compile to. Parameters that
are servos accept `RobotServo.Servo2` / `RobotServo.Servo3` **or** a dropped
variable (the servo input is a droppable numeric value slot).

### 4.1 Setup

```typescript
robot.initialize(pin?: DigitalPin, count?: number, mode?: NeoPixelMode): void
// Defaults: pin = DigitalPin.P8, count = 16, mode = NeoPixelMode.RGB
// Call this ONCE on start before any other robot block.

robot.setBrightness(brightness: number): void
// brightness 0–255, default 40.

robot.showServos(servo2pin?: AnalogPin, servo3pin?: AnalogPin): void
// Defaults: servo2pin = AnalogPin.P15, servo3pin = AnalogPin.P16
// Sets the servo pins AND makes the two servos appear + move in the SIMULATOR.
// Place it once (e.g. on start) if you want servo animation in the simulator.
```

### 4.2 Colors

```typescript
robot.setColor(part: RobotPart, color: number): void
// Color one part of the face. `color` is a color (NeoPixelColors.* or a
// colorNumberPicker value).

robot.clear(part: RobotPart): void
// Turn one part off (black).
```

### 4.3 Expressions

```typescript
robot.showExpression(expression: RobotExpression, color: number): void
// Draw a whole expression on the face. It ALSO (by default) mirrors to the 5x5
// LED screen and moves the arms (servo2) to match — see the table below.

robot.mirrorToScreen(on: boolean): void   // default true
// Also show the face on the micro:bit 5x5 LED screen. Turning it off clears it.

robot.mirrorToArms(on: boolean): void      // default true
// Also move the arms (servo2) when showing an expression.
```

### 4.4 Arms & servos

```typescript
robot.turnServoToPosition(servo: RobotServo, position: ArmPosition): void
// position = High (180°), Middle (90°) or Low (0°).

robot.turnServoToValue(servo: RobotServo, value: number): void
// value = angle 0–180 (default 90). Clamped to 0–180.

robot.turnServoWithKnob(servo: RobotServo, knob: KnobPin): void
// Read a potentiometer on KnobPin.P0/P1/P2 (default P2) and drive the servo
// (0–180). Use `servo3` here to drive the dashboard meter live from a knob.

robot.reverseServo(servo: RobotServo, on: boolean): void         // default on = true
// Reverse the direction: 0↔180, 30↔150, etc.

robot.limitServoRange(servo: RobotServo, start: number, end: number): void
// Constrain the servo to [start..end] (0–180, default 0..180). start must be < end.
```

### 4.5 Radio (robot ↔ remote controller)

```typescript
// ON THE ROBOT — react to a value sent over radio. The received name is
// translated to a servo, so `naam` can be dropped straight into a servo block.
robot.onRadioReceived(function (naam, waarde) {
    robot.turnServoToValue(naam, waarde)
})

// ON THE CONTROLLER — send a value tagged with a servo (servo2 or servo3).
robot.radioSendValue(naam: RobotServo, waarde: number): void
// Internally sends radio.sendValue("servo2"|"servo3", waarde).
```

> **Radio note:** the robot and the controller must be on the **same radio
> group** (`radio.setGroup(n)` on both). `robot.onRadioReceived` listens for the
> value events produced by `robot.radioSendValue`.

---

## 5. Enums

```typescript
enum RobotPart { Eyes, LeftEye, RightEye, Nose, Lips, UpperLip, LowerLip, Tinkywinki, Face }
enum RobotExpression { Happy, Angry, Sad, Surprised }
enum ArmPosition { High, Middle, Low }        // 180°, 90°, 0°
enum RobotServo { Servo2, Servo3 }            // Servo2 = arms (P15), Servo3 = dashboard (P16)
enum KnobPin { P0, P1, P2 }                   // analog knob input pins
```

---

## 6. Expression behavior (what `showExpression` does)

When `mirrorToArms` is on (default), each expression also moves the **arms
(servo2)**:

| Expression | Face LEDs lit | Arms (servo2) |
|---|---|---|
| `Happy` | eyes + lower lip (smile) | **180° (up high)** |
| `Surprised` | eyes + lips + tinkywinki (open mouth) | **150° (flung up)** |
| `Angry` | eyes + upper & lower lip + nose | **90° (straight out)** |
| `Sad` | eyes + upper lip (frown) | **20° (hanging low)** |

Each expression also draws a matching 5×5 icon on the micro:bit screen when
`mirrorToScreen` is on (default).

---

## 7. How an agent should program this robot (conventions & gotchas)

1. **Always start with `robot.initialize(...)`** in `on start`, before any other
   robot block. Use `DigitalPin.P8`, `16`, `NeoPixelMode.RGB` unless told
   otherwise.
2. **Add `robot.showServos(AnalogPin.P15, AnalogPin.P16)`** in `on start` if the
   program uses the arms/dashboard and you want them to be **visible and animated
   in the simulator**. On real hardware it also just sets the pins.
3. **Arms up / down:** arms are **servo2**. Up ≈ `180`, straight ≈ `90`,
   down ≈ `0`. Use `robot.turnServoToValue(RobotServo.Servo2, angle)` or
   `robot.turnServoToPosition(RobotServo.Servo2, ArmPosition.High/Low)`.
4. **Dashboard / meter:** it is **servo3** on P16. Drive it with
   `robot.turnServoToValue(RobotServo.Servo3, angle)` or live from a knob with
   `robot.turnServoWithKnob(RobotServo.Servo3, KnobPin.P2)` (the potentiometer
   signal is on **P2** by default; red → 3V, black → GND, blue → P2).
5. **Left‑hand button = Button A.** The button in the robot's left hand is wired
   to the board's **pin A + GND**, so use `input.onButtonPressed(Button.A, ...)`
   to react to it.
6. **Clap detection = micro:bit V2 microphone.** Use
   `input.onSound(DetectedSound.Loud, () => { ... })`. This requires a
   **micro:bit V2**.
7. **Colors:** use `NeoPixelColors.*` (e.g. `NeoPixelColors.Red`,
   `NeoPixelColors.Blue`) or a custom color. Light a part with
   `robot.setColor(part, color)`, turn it off with `robot.clear(part)` or clear
   everything with `robot.clear(RobotPart.Face)`.
8. **Simulator NeoPixel bug:** the micro:bit simulator does not correctly show
   NeoPixels on double‑digit pins (P10–P16). Keep the face data pin on **P8** for
   simulator visibility. On real hardware any pin works.
9. **Remote controller:** put `robot.radioSendValue(...)` on the controller
   micro:bit and `robot.onRadioReceived(...)` on the robot micro:bit; set the
   same `radio.setGroup(n)` on both.
10. **Don't invent extra blocks or pins.** The extension exposes exactly the
   blocks in section 4. For anything else (buttons, sound, timing) use standard
   core micro:bit blocks (`input.*`, `basic.*`, `control.*`).

---

## 8. Worked example — "react to a clap"

This is a complete, correct program for the common request: *"when I clap, the
nose turns red and the eyes blue and the arms go up; a bit later the lights go
off and the arms go back down."* It uses the micro:bit V2 microphone for the
clap.

```typescript
// on start
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.showServos(AnalogPin.P15, AnalogPin.P16)   // arms P15, dashboard P16
robot.setBrightness(60)
robot.turnServoToValue(RobotServo.Servo2, 0)     // start with arms down

// Clap = a loud sound on the micro:bit V2 microphone
input.onSound(DetectedSound.Loud, function () {
    // Light the face and raise the arms
    robot.setColor(RobotPart.Nose, NeoPixelColors.Red)
    robot.setColor(RobotPart.Eyes, NeoPixelColors.Blue)
    robot.turnServoToValue(RobotServo.Servo2, 180)   // arms up

    basic.pause(2000)                                 // wait 2 seconds

    // Turn the lights off and lower the arms again
    robot.clear(RobotPart.Face)
    robot.turnServoToValue(RobotServo.Servo2, 0)      // arms down
})
```

**Step‑by‑step explanation (for a tutorial):**
1. **Initialize** the face on pin **P8** with **16** RGB NeoPixels.
2. **Show the servos** so the arms (P15) and dashboard (P16) work and are visible
   in the simulator; set the brightness and start with the **arms down**.
3. Use **`input.onSound(Loud)`** so a **clap** (loud sound on the V2 mic)
   triggers the reaction.
4. On a clap: color the **nose red** and the **eyes blue**, then move the **arms
   up** to `180°`.
5. **Wait** 2 seconds.
6. **Clear the whole face** (lights off) and move the **arms back down** to `0°`.

---

## 9. Example — robot + remote controller over radio

```typescript
// ---- ROBOT micro:bit ----
radio.setGroup(1)
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.showServos(AnalogPin.P15, AnalogPin.P16)
robot.onRadioReceived(function (naam, waarde) {
    robot.turnServoToValue(naam, waarde)   // drive the servo named in the message
})

// ---- CONTROLLER micro:bit ----
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    robot.radioSendValue(RobotServo.Servo2, 180)  // raise the robot's arms
})
input.onButtonPressed(Button.B, function () {
    robot.radioSendValue(RobotServo.Servo2, 0)    // lower the robot's arms
})
```

---

## 10. Quick checklist for the agent

- [ ] `robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)` in `on start`.
- [ ] `robot.showServos(AnalogPin.P15, AnalogPin.P16)` if arms/dashboard are used.
- [ ] Arms = **servo2 (P15)**, dashboard/meter = **servo3 (P16)**.
- [ ] Clap = **micro:bit V2** `input.onSound(DetectedSound.Loud, ...)`.
- [ ] Left‑hand button = **Button A** (`input.onButtonPressed(Button.A, ...)`).
- [ ] Knob/potentiometer signal on **P2** (default); red → 3V, black → GND.
- [ ] Face parts colored with `robot.setColor` / cleared with `robot.clear`.
- [ ] Only use the blocks in section 4; use core blocks for everything else.
- [ ] For a controller, use radio + matching `radio.setGroup` on both sides.

---

## 11. Validate the generated code (and the simulator gap)

**Compile‑check before trusting code.** This repository builds headlessly with the
MakeCode CLI. From the repo root:

```bash
npx makecode build -j     # JavaScript mode = fast full type‑check, no ARM native
```

Exit code `0` means the program type‑checks; otherwise fix the reported
`file.ts(line,col): ERROR …` and rebuild. `test.ts` is already in `pxt.json`'s
`testFiles`, so an agent can drop candidate code there and build to verify every
`robot.*` call compiles. This is the surest guard against a hallucinated API or a
wrong signature — always prefer a real build over "it looks right".

For the full local setup (watch mode, the `makecode serve` simulator, flashing to
a device, the dev container and CI), see [`CONTRIBUTING.md`](CONTRIBUTING.md).

**Simulator vs. real hardware.** Tell the user to test in the MakeCode simulator
first, then on a real **micro:bit V2**:

- Keep the NeoPixels on **P8** — the simulator does **not** render NeoPixels
  correctly on P10–P16 (see §7).
- The microphone/clap (`input.onSound`) only works on **V2** hardware.
- The simulator does not reproduce servo backlash, sensor noise, or exact timing.

---

## 12. Sync contract (keep agent docs and code consistent)

These files share facts and must be updated together:

- When **`robot.ts`** changes (new/changed blocks, pins, enums) → update this
  file's §2 (facts/pin map) and §4 (block API), `README.md`,
  `makecode-agent-system-prompt.md` §5–6, and bump the version in `pxt.json`.
- When **this file** changes → verify the "Hard facts" in
  `.github/copilot-instructions.md` still match.
- Never change the pin map without also updating the ASCII diagram in §2.1.

---

*This file documents the public API and hardware of the `robot` extension in this
repository. When the extension changes (new blocks, changed pins), update this
file so agents keep generating correct code.*
<!-- last verified: 2026-07-24, pxt.json v1.0.53 -->

