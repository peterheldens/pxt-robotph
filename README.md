# pxt-robotph

Een MakeCode-extensie voor de micro:bit om een robotgezicht te besturen met een
NeoPixel-ring (standaard 16 LEDs).

## Toevoegen in MakeCode

1. Open [makecode.microbit.org](https://makecode.microbit.org).
2. Klik op het tandwiel -> **Extensions**.
3. Plak de URL van deze repository en zoek.
4. Klik op de `Robot`-tegel om de blokken toe te voegen.

## Hardware

* micro:bit
* NeoPixel-ring met 16 LEDs, datapin standaard op **P8**

> **Let op (simulator):** door een bug in de micro:bit-simulator worden NeoPixels
> op dubbele-cijfer-pinnen (P10–P16) niet correct getoond. Gebruik een pin P0–P9
> (zoals P8) als je de strip in de simulator wilt zien. Op echte hardware werkt elke pin.

De LED-indeling van het gezicht (index in de ring):

| Onderdeel   | LED-indexen   |
|-------------|---------------|
| tinkywinki  | 0             |
| ogen        | 1, 2          |
| oog_links   | 1             |
| oog_rechts  | 2             |
| neus        | 3             |
| lippen      | 4 t/m 15      |
| lip_boven   | 4 t/m 9       |
| lip_onder   | 10 t/m 15     |

## Blokken

* **initialiseer robot op pin ... met ... LEDs** - stel de datapin en het aantal LEDs in.
* **zet helderheid op ...** - helderheid van 0 tot 255.
* **zet ... op kleur ...** - kleur een onderdeel (ogen, linkeroog, rechteroog, neus, lippen, bovenlip, onderlip, tinkywinki of het hele gezicht).
* **wis ...** - zet een onderdeel uit.
* **toon expressie ... met kleur ...** - toon een expressie (blij, boos, verdrietig, verrast).

## Voorbeeld

```typescript
robot.initialiseer(DigitalPin.P8, 16)
robot.helderheid(60)
robot.toonExpressie(robot.RobotExpressie.Blij, NeoPixelColors.Yellow)
```

## Supported targets

* for PXT/microbit

## License

MIT

