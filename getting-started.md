# Get started with the robot

```package
robot=github:peterheldens/pxt-robotph
```

## Introduction @showdialog

Let's bring your robot face to life! Follow the steps to set it up, make it
smile and move its arms.

## Step 1 @fullscreen

First, set up the robot face. Drag the ``||robot:initialize robot||`` block into
the ``||basic:on start||`` block. This connects the NeoPixel on pin **P8**
(Servo1 on the servo board), with **16** LEDs in **RGB** mode.

```blocks
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
```

## Step 2

Set how bright the LEDs are with the ``||robot:set brightness||`` block.

```blocks
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.setBrightness(60)
```

## Step 3

Now make the robot show a happy face with the ``||robot:show expression||``
block. The arms (servo2) move up at the same time.

```blocks
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.setBrightness(60)
robot.showExpression(RobotExpression.Happy, NeoPixelColors.Yellow)
```

## Step 4

Try moving an arm yourself. Use the ``||robot:turn to position||`` block to turn
servo2 to the high position.

```blocks
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.setBrightness(60)
robot.showExpression(RobotExpression.Happy, NeoPixelColors.Yellow)
robot.turnServoToPosition(RobotServo.Servo2, ArmPosition.High)
```

## Step 5 @fullscreen

Great job! Your robot is set up and smiling. Press **Done** and keep building
your own robot program!
