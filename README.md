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
* NeoPixel-ring met 16 LEDs, datapin standaard op **P16**

De LED-indeling van het gezicht (index in de ring):

| Onderdeel    | LED-indexen   |
|--------------|---------------|
| Ogen         | 0, 1, 6, 7    |
| Mond         | 2, 3, 4, 5    |
| Wenkbrauwen  | 8, 9, 14, 15  |

## Blokken

* **initialiseer robot op pin ... met ... LEDs** - stel de datapin en het aantal LEDs in.
* **zet helderheid op ...** - helderheid van 0 tot 255.
* **zet ... op kleur ...** - kleur een onderdeel (ogen, mond, wenkbrauwen of het hele gezicht).
* **wis ...** - zet een onderdeel uit.
* **toon expressie ... met kleur ...** - toon een expressie (blij, boos, verdrietig, verrast).

## Voorbeeld

```typescript
robot.initialiseer(DigitalPin.P16, 16)
robot.helderheid(60)
robot.toonExpressie(robot.RobotExpressie.Blij, NeoPixelColors.Yellow)
```

## Supported targets

* for PXT/microbit

## License

MIT

