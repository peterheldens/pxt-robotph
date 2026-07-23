# pxt-robotph

A MakeCode extension for the micro:bit to control a robot face made of a
NeoPixel ring (16 LEDs by default).

## Add in MakeCode

1. Open [makecode.microbit.org](https://makecode.microbit.org).
2. Click the gear icon -> **Extensions**.
3. Paste the URL of this repository and search.
4. Click the `Robot` tile to add the blocks.

## Hardware

* micro:bit
* NeoPixel ring with 16 LEDs, data pin defaults to **P8**

> **Note (simulator):** due to a bug in the micro:bit simulator, NeoPixels on
> double-digit pins (P10–P16) are not shown correctly. Use a pin P0–P9 (such as
> P8) if you want to see the strip in the simulator. On real hardware any pin works.

The LED layout of the face (index in the ring):

| Part        | LED indexes   |
|-------------|---------------|
| tinkywinki  | 0             |
| eyes        | 1, 2          |
| left eye    | 1             |
| right eye   | 2             |
| nose        | 3             |
| lips        | 4 .. 15       |
| upper lip   | 4 .. 9        |
| lower lip   | 10 .. 15      |

## Blocks

* **initialize robot on pin ... with ... LEDs** - set the data pin and number of LEDs.
* **set brightness to ...** - brightness from 0 to 255.
* **set ... to color ...** - color a part (eyes, left eye, right eye, nose, lips, upper lip, lower lip, tinkywinki or the whole face).
* **clear ...** - turn a part off.
* **show expression ... with color ...** - show an expression (happy, angry, sad, surprised).

## Languages

The blocks are localized and follow the editor language. Translations are provided
for English, Dutch, German, French and Spanish.

## Example

```typescript
robot.initialize(DigitalPin.P8, 16)
robot.setBrightness(60)
robot.showExpression(RobotExpression.Happy, NeoPixelColors.Yellow)
```

## Supported targets

* for PXT/microbit

## License

MIT

