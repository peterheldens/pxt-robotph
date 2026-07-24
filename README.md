# Robot face

A MakeCode extension for the micro:bit that brings a **wooden classroom robot**
to life. The robot pulls faces through a ring of **16 NeoPixels** that form a
colorful face with **eyes, a nose, a mouth and lips**, and it has **moving arms**
and a **dashboard**. At the same time it is a **blackboard**: children in the
class can project their own micro:bit onto the robot and control it, either by
plugging in physically or wirelessly with a **remote controller**. The blocks
are localized and follow the editor language (English, Dutch, German, French and
Spanish).

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
* Everything is wired through the **Kitronik Simple Servo Control Board for BBC
  micro:bit**. The extension drives the servo pins directly, so no extra
  servo-board extension is needed.

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
* The **Kitronik Simple Servo Control Board for BBC micro:bit** with three servo outputs: **Servo1 → P8** (NeoPixel face), **Servo2 → P15** (arms) and **Servo3 → P16** (dashboard / analog meter)

## ~ hint

**Wiring:**
* Connect the **NeoPixel** face to **Servo1** on the servo board, because Servo1 is wired to pin **P8** (the default data pin).
* The **arms** are driven by **Servo2** (pin **P15**).
* The **dashboard / analog meter** is driven by **Servo3** (pin **P16**).
* A knob (potentiometer) for ``||robot.turnServoWithKnob||`` is read from an analog pin (**P0**, **P1** or **P2**). You can use this to drive the meter live, for example a knob on P0 moving the dashboard meter on servo3.
* The extension drives the servo pins directly, so no separate servo-board extension is needed. Use ``||robot.showServos||`` if you also want the servos to appear in the simulator.

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
* ``||robot.showServos||`` - make servo2 and servo3 appear and move in the simulator, and set their pins (default servo2 = P15, servo3 = P16).
* ``||robot.setColor||`` - color a part (eyes, left eye, right eye, nose, lips, upper lip, lower lip, tinkywinki or the whole face).
* ``||robot.clear||`` - turn a part off.
* ``||robot.showExpression||`` - show an expression (happy, angry, sad, surprised). The arms (servo2) also move to match: happy up, surprised high, angry straight out, sad down.
* ``||robot.mirrorToScreen||`` - pass the expression through to the 5x5 LED screen.
* ``||robot.mirrorToArms||`` - pass the expression through to the arms (servo2), on by default.
* ``||robot.turnServoToPosition||`` - turn servo2 or servo3 to a position (high, middle or low).
* ``||robot.turnServoToValue||`` - turn servo2 or servo3 to an angle from 0 to 180 degrees.
* ``||robot.turnServoWithKnob||`` - turn servo2 or servo3 with a knob (potentiometer) connected to analog pin P0, P1 or P2. Use servo3 to drive the dashboard meter live.
* ``||robot.reverseServo||`` - reverse the turning direction of servo2 or servo3 (an angle of 180 becomes 0, 30 becomes 150, and so on).
* ``||robot.limitServoRange||`` - limit the range of servo2 or servo3 to a fixed start and end angle (for example from 10 to 170), so that servo can only move within that range.
* ``||robot.radioSendValue||`` - send a value to the robot over radio, tagged with servo2 or servo3 (use this on the remote controller).
* ``||robot.onRadioReceived||`` - run code when the robot receives a name and value over radio; the received name is translated to servo2 or servo3 so it can be dropped straight into a servo block.

## Servos and radio

Show the servos in the simulator and turn an arm to a specific angle:

```blocks
robot.initialize(DigitalPin.P8, 16)
robot.showServos(AnalogPin.P15, AnalogPin.P16)
robot.turnServoToValue(RobotServo.Servo2, 90)
```

On the **robot**, react to values sent over radio. The received name is
translated to servo2 or servo3, so you can drop it straight into a servo block:

```blocks
robot.onRadioReceived(function (naam, waarde) {
    robot.turnServoToValue(naam, waarde)
})
```

On the **remote controller**, send a value tagged with a servo:

```blocks
input.onButtonPressed(Button.A, function () {
    robot.radioSendValue(RobotServo.Servo2, 180)
})
```

## Tutorials

* [Get started with the robot](https://makecode.microbit.org/#tutorial:https://github.com/peterheldens/pxt-robotph/blob/main/getting-started.md) - set up the robot face and make it smile.

## Other languages

### Nederlands

Dit is de extensie voor **microbitrobot**: een **houten robot** die **gezichten
trekt** met een ring van **16 NeoPixels** die een **kleurrijk gezicht** vormen
met **ogen, neus, mond en lippen**. Hij heeft **bewegende armen** en een
**dashboard**, en is tegelijk een **schoolbord**: kinderen in de klas projecteren
hun eigen micro:bit op de robot en besturen hem — fysiek ingeplugd of draadloos
met een **afstandsbediening**. Een servomotor beweegt de armen, een servomotor
stuurt het dashboard en er is een **analoge meter**. Er zijn ook een **drukknop**
en een **bibberspiraal**, allemaal bedraad via het **Kitronik Simple Servo
Control Board for BBC micro:bit**.

### Deutsch

Dies ist die Erweiterung für **microbitrobot**: ein **Holzroboter**, der mit
einem Ring aus **16 NeoPixels** **Gesichter zieht**, die ein **farbenfrohes
Gesicht** mit **Augen, Nase, Mund und Lippen** bilden. Er hat **bewegliche Arme**
und ein **Dashboard** und ist zugleich eine **Tafel**: Kinder im Klassenzimmer
projizieren ihr eigenes micro:bit auf den Roboter und steuern ihn – physisch
eingesteckt oder drahtlos mit einer **Fernbedienung**. Ein Servomotor bewegt die
Arme, ein Servomotor steuert das Dashboard, und es gibt eine **analoge Anzeige**.
Außerdem gibt es einen **Taster** und eine **Vibrationsspirale**, alles über das
**Kitronik Simple Servo Control Board for BBC micro:bit** verkabelt.

### Français

Ceci est l'extension pour **microbitrobot** : un **robot en bois** qui **fait des
grimaces** grâce à un anneau de **16 NeoPixels** formant un **visage coloré** avec
des **yeux, un nez, une bouche et des lèvres**. Il possède des **bras mobiles** et
un **tableau de bord**, et c'est en même temps un **tableau** : les enfants de la
classe projettent leur propre micro:bit sur le robot et le commandent — branché
physiquement ou sans fil avec une **télécommande**. Un servomoteur actionne les
bras, un servomoteur pilote le tableau de bord, et il y a une **jauge analogique**.
Il y a aussi un **bouton poussoir** et une **spirale vibrante**, le tout câblé via
le **Kitronik Simple Servo Control Board for BBC micro:bit**.

### Español

Esta es la extensión para **microbitrobot**: un **robot de madera** que **pone
caras** mediante un anillo de **16 NeoPixels** que forman un **rostro colorido**
con **ojos, nariz, boca y labios**. Tiene **brazos móviles** y un **tablero**, y a
la vez es una **pizarra**: los niños de la clase proyectan su propio micro:bit en
el robot y lo controlan, conectado físicamente o de forma inalámbrica con un
**mando a distancia**. Un servomotor mueve los brazos, un servomotor acciona el
tablero y hay un **medidor analógico**. También hay un **botón pulsador** y una
**espiral vibratoria**, todo cableado a través del **Kitronik Simple Servo
Control Board for BBC micro:bit**.

## Supported targets

* for PXT/microbit

## License

MIT

