# Robot face

A MakeCode extension for the micro:bit to control a robot face made of a
NeoPixel ring (16 LEDs by default). The blocks are localized and follow the
editor language (English, Dutch, German, French and Spanish).

## About microbitrobot

This is the extension for **microbitrobot**: a combination of a **robot** and a
**blackboard**, designed for use in classrooms. The robot is a self-build kit
made of wood.

Hardware overview:

* A **servo motor** to move the **arms**.
* A **servo motor** to drive the **dashboard**.
* An **analog servo gauge** (meter).
* **NeoPixels** for the **antenna**, **eyes**, **nose**, **mouth** and **lips**.
* A **push button** and a **vibrating spiral**.
* Everything is wired through the **Kitronik servo board**.

The robot also has a **remote controller**. Children in the classroom can plug
their own project, running on their own micro:bit, into the robot blackboard and
control it directly with their own controller.

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
* ``||robot.showExpression||`` - show an expression (happy, angry, sad, surprised). The arms (servo2) also move to match: happy up, surprised high, angry straight out, sad down.
* ``||robot.mirrorToScreen||`` - pass the expression through to the 5x5 LED screen.
* ``||robot.mirrorToArms||`` - pass the expression through to the arms (servo2), on by default.
* ``||robot.turnServoToPosition||`` - turn servo2 or servo3 to a position (high, middle or low).
* ``||robot.turnServoWithKnob||`` - turn servo2 or servo3 with a knob (potentiometer) connected to analog pin P0, P1 or P2.
* ``||robot.reverseServo||`` - reverse the turning direction of servo2 or servo3 (an angle of 180 becomes 0, 30 becomes 150, and so on).

## Other languages

### Nederlands

Dit is de extensie voor **microbitrobot**: een combinatie van een **robot** en
een **schoolbord**, gemaakt voor gebruik in de klas. De robot is een houten
zelfbouwkit. Een servomotor beweegt de **armen**, een servomotor stuurt het
**dashboard**, en er is een **analoge meter**. **NeoPixels** vormen de antenne,
ogen, neus, mond en lippen. Er zijn een **drukknop** en een **bibberspiraal**,
allemaal bedraad via het **Kitronik servo board**. Met de **afstandsbediening**
pluggen kinderen hun eigen micro:bit-project op het robotbord en besturen ze het
direct.

### Deutsch

Dies ist die Erweiterung für **microbitrobot**: eine Kombination aus einem
**Roboter** und einer **Tafel**, für den Einsatz im Klassenzimmer. Der Roboter
ist ein Selbstbausatz aus Holz. Ein Servomotor bewegt die **Arme**, ein
Servomotor steuert das **Dashboard**, und es gibt eine **analoge Anzeige**.
**NeoPixels** bilden Antenne, Augen, Nase, Mund und Lippen. Es gibt einen
**Taster** und eine **Vibrationsspirale**, alles über das
**Kitronik-Servoboard** verkabelt. Mit der **Fernbedienung** stecken Kinder ihr
eigenes micro:bit-Projekt an die Robotertafel und steuern es direkt.

### Français

Ceci est l'extension pour **microbitrobot** : une combinaison d'un **robot** et
d'un **tableau**, conçue pour la classe. Le robot est un kit à construire
soi-même en bois. Un servomoteur actionne les **bras**, un servomoteur pilote le
**tableau de bord**, et il y a une **jauge analogique**. Des **NeoPixels**
forment l'antenne, les yeux, le nez, la bouche et les lèvres. Il y a un **bouton
poussoir** et une **spirale vibrante**, le tout câblé via la **carte servo
Kitronik**. Avec la **télécommande**, les enfants branchent leur propre projet
micro:bit sur le tableau robot et le commandent directement.

### Español

Esta es la extensión para **microbitrobot**: una combinación de un **robot** y
una **pizarra**, diseñada para el aula. El robot es un kit de autoconstrucción
de madera. Un servomotor mueve los **brazos**, un servomotor acciona el
**tablero**, y hay un **medidor analógico**. Los **NeoPixels** forman la antena,
los ojos, la nariz, la boca y los labios. Hay un **botón pulsador** y una
**espiral vibratoria**, todo cableado a través de la **placa de servos
Kitronik**. Con el **mando a distancia**, los niños conectan su propio proyecto
micro:bit a la pizarra robot y lo controlan directamente.

## Supported targets

* for PXT/microbit

## License

MIT

