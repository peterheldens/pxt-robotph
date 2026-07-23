# Robot face

A MakeCode extension for the micro:bit to control a robot face made of a
NeoPixel ring (16 LEDs by default). The blocks are localized and follow the
editor language (English, Dutch, German, French and Spanish).

## ~ hint

Add this extension in MakeCode via the gear icon -> **Extensions**, then paste
the URL of this repository and click the `Robot` tile.

## ~

## Basic usage

Initialize the robot face, set the brightness and show an expression:

```blocks
robot.initialize(DigitalPin.P8, 16)
robot.setBrightness(60)
robot.showExpression(RobotExpression.Happy, NeoPixelColors.Yellow)
```

Use ``||robot.setColor||`` to color a single part of the face, and
``||robot.clear||`` to turn a part off:

```blocks
robot.initialize(DigitalPin.P8, 16)
robot.setColor(RobotPart.Eyes, NeoPixelColors.Green)
robot.setColor(RobotPart.Lips, NeoPixelColors.Red)
robot.clear(RobotPart.Nose)
```

## ~ hint

**Simulator:** due to a bug in the micro:bit simulator, NeoPixels on double-digit
pins (P10–P16) are not shown correctly. Use a pin P0–P9 (such as **P8**) if you
want to see the strip in the simulator. On real hardware any pin works.

## ~

## Hardware

* micro:bit
* NeoPixel ring with 16 LEDs, data pin defaults to **P8**
* Kitronik servo board with three servo outputs

## ~ hint

**Wiring:** the extension uses the servo board.
* Connect the **NeoPixel** face to **Servo1** on the servo board, because Servo1 is wired to pin **P8** (the default data pin).
* The **arm** is driven by **Servo2** (pin P15).
* The knob (potentiometer) for ``||robot.turnServoWithKnob||`` is read from an analog pin (P0, P1 or P2).

## ~

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

* ``||robot.initialize||`` - set the data pin and number of LEDs.
* ``||robot.setBrightness||`` - brightness from 0 to 255.
* ``||robot.setColor||`` - color a part (eyes, left eye, right eye, nose, lips, upper lip, lower lip, tinkywinki or the whole face).
* ``||robot.clear||`` - turn a part off.
* ``||robot.showExpression||`` - show an expression (happy, angry, sad, surprised).
* ``||robot.mirrorToScreen||`` - also mirror the expression on the 5x5 LED screen.
* ``||robot.turnServoToPosition||`` - turn servo2 or servo3 to a position (high, middle or low).
* ``||robot.turnServoWithKnob||`` - turn servo2 or servo3 with a knob (potentiometer) connected to analog pin P0, P1 or P2.

## Supported targets

* for PXT/microbit

## License

MIT

