// Test file for the robot extension
robot.initialize(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.setBrightness(60)
robot.mirrorToScreen(true)

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
