// Testbestand voor de robotph-extensie
robotph.initialiseer(DigitalPin.P16, 16)
robotph.helderheid(60)

basic.forever(function () {
    robotph.setKleur(robotph.RobotOnderdeel.Ogen, NeoPixelColors.Red)
    basic.pause(500)
    robotph.wis(robotph.RobotOnderdeel.Ogen)

    robotph.setKleur(robotph.RobotOnderdeel.Mond, NeoPixelColors.Green)
    basic.pause(500)
    robotph.wis(robotph.RobotOnderdeel.Mond)

    robotph.setKleur(robotph.RobotOnderdeel.Wenkbrauwen, NeoPixelColors.Blue)
    basic.pause(500)
    robotph.wis(robotph.RobotOnderdeel.Wenkbrauwen)

    robotph.toonExpressie(robotph.RobotExpressie.Blij, NeoPixelColors.Yellow)
    basic.pause(500)

    robotph.toonExpressie(robotph.RobotExpressie.Boos, NeoPixelColors.Red)
    basic.pause(500)

    robotph.wis(robotph.RobotOnderdeel.Gezicht)
})
