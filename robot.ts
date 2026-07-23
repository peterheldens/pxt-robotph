/**
 * Bestuur een robotgezicht met een NeoPixel-ring (standaard 16 LEDs).
 */
//% color=#2699BF icon="\uf17b" block="Robot"
//% groups='["Instellen", "Kleuren", "Expressies"]'
namespace robot {

    export enum RobotOnderdeel {
        //% block="ogen"
        Ogen,
        //% block="mond"
        Mond,
        //% block="wenkbrauwen"
        Wenkbrauwen,
        //% block="gezicht"
        Gezicht
    }

    export enum RobotExpressie {
        //% block="blij"
        Blij,
        //% block="boos"
        Boos,
        //% block="verdrietig"
        Verdrietig,
        //% block="verrast"
        Verrast
    }

    let LED_PIN: DigitalPin = DigitalPin.P16;
    let LED_COUNT: number = 16;
    let LED_MODE: NeoPixelMode = NeoPixelMode.RGB;
    let gezicht: neopixel.Strip;
    let spiegelNaarScherm: boolean = true;

    //% blockId="robot_init"
    //% block="initialiseer robot op pin %pin met %aantal LEDs"
    //% pin.defl=DigitalPin.P16
    //% aantal.defl=16 aantal.min=1 aantal.max=64
    //% weight=100
    //% group="Instellen"
    //% parts="robotface" trackArgs=0,2
    export function initialiseer(pin: DigitalPin, aantal: number, mode: NeoPixelMode = NeoPixelMode.RGB): void {
        LED_PIN = pin;
        LED_COUNT = Math.max(1, aantal);
        LED_MODE = mode;
        gezicht = null;
        initGezicht();
    }

    //% blockId="robot_helderheid"
    //% block="zet helderheid op %helderheid"
    //% helderheid.min=0 helderheid.max=255 helderheid.defl=40
    //% weight=95
    //% group="Instellen"
    //% parts="robotface"
    export function helderheid(helderheid: number): void {
        initGezicht();
        gezicht.setBrightness(Math.clamp(0, 255, helderheid));
        gezicht.show();
    }

    //% blockId="robot_set_kleur"
    //% block="zet %onderdeel op kleur %kleur"
    //% kleur.shadow="colorNumberPicker"
    //% weight=90
    //% group="Kleuren"
    //% parts="robotface"
    export function setKleur(onderdeel: RobotOnderdeel, kleur: number): void {
        initGezicht();
        switch (onderdeel) {
            case RobotOnderdeel.Ogen:
                kleurOgen(kleur);
                break;
            case RobotOnderdeel.Mond:
                kleurMond(kleur);
                break;
            case RobotOnderdeel.Wenkbrauwen:
                kleurWenkbrauwen(kleur);
                break;
            case RobotOnderdeel.Gezicht:
                kleurGezicht(kleur);
                break;
        }
        gezicht.show();
    }

    //% blockId="robot_wis"
    //% block="wis %onderdeel"
    //% weight=80
    //% group="Kleuren"
    //% parts="robotface"
    export function wis(onderdeel: RobotOnderdeel): void {
        initGezicht();
        switch (onderdeel) {
            case RobotOnderdeel.Ogen:
                kleurOgen(NeoPixelColors.Black);
                break;
            case RobotOnderdeel.Mond:
                kleurMond(NeoPixelColors.Black);
                break;
            case RobotOnderdeel.Wenkbrauwen:
                kleurWenkbrauwen(NeoPixelColors.Black);
                break;
            case RobotOnderdeel.Gezicht:
                gezicht.clear();
                break;
        }
        gezicht.show();
    }

    //% blockId="robot_expressie"
    //% block="toon expressie %expressie met kleur %kleur"
    //% kleur.shadow="colorNumberPicker"
    //% weight=70
    //% group="Expressies"
    //% parts="robotface"
    export function toonExpressie(expressie: RobotExpressie, kleur: number): void {
        initGezicht();
        gezicht.clear();
        kleurOgen(kleur);
        switch (expressie) {
            case RobotExpressie.Blij:
                kleurMond(kleur);
                break;
            case RobotExpressie.Boos:
                kleurWenkbrauwen(kleur);
                kleurMond(kleur);
                break;
            case RobotExpressie.Verdrietig:
                kleurWenkbrauwen(kleur);
                break;
            case RobotExpressie.Verrast:
                kleurMond(kleur);
                break;
        }
        gezicht.show();
        tekenOpScherm(expressie);
    }

    //% blockId="robot_scherm_spiegel"
    //% block="toon gezicht ook op micro:bit-scherm %aan"
    //% aan.shadow="toggleOnOff" aan.defl=true
    //% weight=65
    //% group="Expressies"
    export function schermSpiegeling(aan: boolean): void {
        spiegelNaarScherm = aan;
        if (!aan) basic.clearScreen();
    }

    function tekenOpScherm(expressie: RobotExpressie): void {
        if (!spiegelNaarScherm) return;
        switch (expressie) {
            case RobotExpressie.Blij:
                basic.showLeds(`
                    . # . # .
                    . # . # .
                    . . . . .
                    # . . . #
                    . # # # .
                `);
                break;
            case RobotExpressie.Boos:
                basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                break;
            case RobotExpressie.Verdrietig:
                basic.showLeds(`
                    . # . # .
                    . # . # .
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                break;
            case RobotExpressie.Verrast:
                basic.showLeds(`
                    . # . # .
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                `);
                break;
        }
    }

    function initGezicht(): void {
        if (gezicht) return;
        gezicht = neopixel.create(LED_PIN, LED_COUNT, LED_MODE);
        gezicht.setBrightness(40);
        gezicht.clear();
        gezicht.show();
    }

    function kleurOgen(kleur: number): void {
        gezicht.setPixelColor(0, kleur);
        gezicht.setPixelColor(1, kleur);
        gezicht.setPixelColor(6, kleur);
        gezicht.setPixelColor(7, kleur);
    }

    function kleurMond(kleur: number): void {
        gezicht.setPixelColor(2, kleur);
        gezicht.setPixelColor(3, kleur);
        gezicht.setPixelColor(4, kleur);
        gezicht.setPixelColor(5, kleur);
    }

    function kleurWenkbrauwen(kleur: number): void {
        gezicht.setPixelColor(8, kleur);
        gezicht.setPixelColor(9, kleur);
        gezicht.setPixelColor(14, kleur);
        gezicht.setPixelColor(15, kleur);
    }

    function kleurGezicht(kleur: number): void {
        for (let i = 0; i < LED_COUNT; i++) {
            gezicht.setPixelColor(i, kleur);
        }
    }
}
