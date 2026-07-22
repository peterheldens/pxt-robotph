//% color=#2699BF icon="\uf110" block="robotph"
namespace robotph {
    //% blockId="robotph_init"
    //% block="initialiseer robot op pin %pin met %aantal LEDs"
    //% pin.defl=DigitalPin.P16
    //% aantal.defl=16
    //% weight=100
    export function initialiseer(pin: DigitalPin, aantal: number): void {
        LED_PIN = pin;
        LED_COUNT = aantal;
        initGezicht();
    }

    //% blockId="robotph_set_kleur"
    //% block="zet %onderdeel op kleur %kleur"
    //% weight=90
    export function setKleur(onderdeel: RobotOnderdeel, kleur: NeoPixelColors): void {
        if (!gezicht) initGezicht();
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
    export function wis(onderdeel: RobotOnderdeel): void {
        if (!gezicht) initGezicht();
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

    //% blockId="robotph_helderheid"
    //% block="zet helderheid op %helderheid"
    //% helderheid.min=0 helderheid.max=255
    //% weight=70
    export function helderheid(helderheid: number): void {
        if (!gezicht) initGezicht();
        gezicht.setBrightness(helderheid);
        gezicht.show();
    }

    let LED_PIN: DigitalPin = DigitalPin.P16;
    let LED_COUNT: number = 16;
    let gezicht: neopixel.Strip;

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

enum RobotOnderdeel {
    //% block="ogen"
    Ogen,
    //% block="mond"
    Mond,
    //% block="wenkbrauwen"
    Wenkbrauwen,
    //% block="gezicht"
    Gezicht
}
