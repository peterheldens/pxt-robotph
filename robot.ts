/**
 * Bestuur een robotgezicht met een NeoPixel-ring (standaard 16 LEDs).
 */
//% color=#2699BF icon="\uf110" block="robotph"
//% groups='["Instellen", "Kleuren", "Expressies"]'
namespace robotph {

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
    let gezicht: neopixel.Strip;

    //% blockId="robotph_init"
    //% block="initialiseer robot op pin %pin met %aantal LEDs"
    //% pin.defl=DigitalPin.P16
    //% aantal.defl=16 aantal.min=1 aantal.max=64
    //% weight=100
    //% group="Instellen"
    export function initialiseer(pin: DigitalPin, aantal: number): void {
        LED_PIN = pin;
        LED_COUNT = Math.max(1, aantal);
        gezicht = null;
        initGezicht();
    }

    //% blockId="robotph_helderheid"
    //% block="zet helderheid op %helderheid"
    //% helderheid.min=0 helderheid.max=255 helderheid.defl=40
    //% weight=95
    //% group="Instellen"
    export function helderheid(helderheid: number): void {
        initGezicht();
        gezicht.setBrightness(Math.clamp(0, 255, helderheid));
        gezicht.show();
    }

    //% blockId="robotph_set_kleur"
    //% block="zet %onderdeel op kleur %kleur"
    //% kleur.shadow="colorNumberPicker"
    //% weight=90
    //% group="Kleuren"
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

    //% blockId="robotph_wis"
    //% block="wis %onderdeel"
    //% weight=80
    //% group="Kleuren"
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

    //% blockId="robotph_expressie"
    //% block="toon expressie %expressie met kleur %kleur"
    //% kleur.shadow="colorNumberPicker"
    //% weight=70
    //% group="Expressies"
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
    }

    function initGezicht(): void {
        if (gezicht) return;
        gezicht = neopixel.create(LED_PIN, LED_COUNT, NeoPixelMode.RGB);
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
