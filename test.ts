// Testbestand voor de robot-extensie
robot.initialiseer(DigitalPin.P16, 16, NeoPixelMode.RGB)
robot.helderheid(60)
robot.schermSpiegeling(true)

basic.forever(function () {
    robot.setKleur(robot.RobotOnderdeel.Ogen, NeoPixelColors.Red)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Ogen)

    robot.setKleur(robot.RobotOnderdeel.Mond, NeoPixelColors.Green)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Mond)

    robot.setKleur(robot.RobotOnderdeel.Wenkbrauwen, NeoPixelColors.Blue)
    basic.pause(500)
    robot.wis(robot.RobotOnderdeel.Wenkbrauwen)

    robot.toonExpressie(robot.RobotExpressie.Blij, NeoPixelColors.Yellow)
    basic.pause(500)

    robot.toonExpressie(robot.RobotExpressie.Boos, NeoPixelColors.Red)
    basic.pause(500)

    robot.wis(robot.RobotOnderdeel.Gezicht)
})

