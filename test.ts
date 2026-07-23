// Testbestand voor de robot-extensie
robot.initialiseer(DigitalPin.P8, 16, NeoPixelMode.RGB)
robot.helderheid(60)
robot.schermSpiegeling(true)

basic.forever(function () {
    robot.setKleur(robot.RobotOnderdeel.Ogen, NeoPixelColors.Red)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Ogen)

    robot.setKleur(robot.RobotOnderdeel.Lippen, NeoPixelColors.Green)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Lippen)

    robot.setKleur(robot.RobotOnderdeel.Neus, NeoPixelColors.Blue)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Neus)

    robot.setKleur(robot.RobotOnderdeel.Tinkywinki, NeoPixelColors.Purple)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Tinkywinki)

    robot.toonExpressie(robot.RobotExpressie.Blij, NeoPixelColors.Yellow)
    basic.pause(500)

    robot.toonExpressie(robot.RobotExpressie.Boos, NeoPixelColors.Red)
    basic.pause(500)

    robot.wis(robot.RobotOnderdeel.Gezicht)
})

