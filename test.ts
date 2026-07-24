// Test file for the robot extension
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.setBrightness(60)
robot.mirrorToScreen(true)
robot.showServos(AnalogPin.P15, AnalogPin.P16)

robot.onRadioReceived(function (naam, waarde) {
    robot.turnServoToValue(naam, waarde)
})

input.onButtonPressed(Button.A, function () {
    robot.radioSendValue(RobotServo.Servo2, 90)
})

input.onButtonPressed(Button.B, function () {
    robot.limitServoRange(RobotServo.Servo3, 10, 170)
    robot.reverseServo(RobotServo.Servo3, true)
    robot.turnServoToValue(RobotServo.Servo3, 120)
    robot.turnServoWithKnob(RobotServo.Servo3, KnobPin.P0)
})

basic.forever(function () {
    robot.turnServoToPosition(RobotServo.Servo2, ArmPosition.High)
    basic.pause(500)
    robot.setColor(RobotPart.Eyes, NeoPixelColors.Red)
    basic.pause(500)
    robot.clear(RobotPart.Eyes)

    robot.setColor(RobotPart.Lips, NeoPixelColors.Green)
    basic.pause(500)
    robot.clear(RobotPart.Lips)

    robot.setColor(RobotPart.Nose, NeoPixelColors.Blue)
    basic.pause(500)
    robot.clear(RobotPart.Nose)

    robot.setColor(RobotPart.Tinkywinki, NeoPixelColors.Purple)
    basic.pause(500)
    robot.clear(RobotPart.Tinkywinki)

    robot.showExpression(RobotExpression.Happy, NeoPixelColors.Yellow)
    basic.pause(500)

    robot.showExpression(RobotExpression.Angry, NeoPixelColors.Red)
    basic.pause(500)

    robot.clear(RobotPart.Face)
})
