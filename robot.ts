/**
 * Bestuur een robotgezicht met een NeoPixel-ring (standaard 16 LEDs).
 */
//% color=#2699BF icon="\uf110" block="Robot"
//% groups='["Instellen", "Kleuren", "Expressies"]'
namespace robot {

    export enum RobotOnderdeel {
        //% block="ogen"
        Ogen,
        //% block="linkeroog"
        OogLinks,
        //% block="rechteroog"
        OogRechts,
        //% block="neus"
        Neus,
        //% block="lippen"
        Lippen,
        //% block="bovenlip"
        LipBoven,
        //% block="onderlip"
        LipOnder,
        //% block="tinkywinki"
        Tinkywinki,
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

    let LED_PIN: DigitalPin = DigitalPin.P8;
    let LED_COUNT: number = 16;
    let LED_MODE: NeoPixelMode = NeoPixelMode.RGB;
    let gezicht: neopixel.Strip;
    let spiegelNaarScherm: boolean = true;

    // Onderdelen van het gezicht, uitgedrukt als ranges op de LED-strip.
    let tinkywinki: neopixel.Strip;
    let ogen: neopixel.Strip;
    let neus: neopixel.Strip;
    let lippen: neopixel.Strip;
    let lip_boven: neopixel.Strip;
    let lip_onder: neopixel.Strip;
    let oog_links: neopixel.Strip;
    let oog_rechts: neopixel.Strip;

    //% blockId="robot_init"
    //% block="initialiseer robot op pin %pin met %aantal LEDs als %mode"
    //% pin.defl=DigitalPin.P8
    //% aantal.defl=16 aantal.min=1 aantal.max=64
    //% mode.defl=NeoPixelMode.RGB
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
        vulOnderdeel(onderdeel, kleur);
        gezicht.show();
    }

    //% blockId="robot_wis"
    //% block="wis %onderdeel"
    //% weight=80
    //% group="Kleuren"
    //% parts="robotface"
    export function wis(onderdeel: RobotOnderdeel): void {
        initGezicht();
        vulOnderdeel(onderdeel, NeoPixelColors.Black);
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
        vul(ogen, kleur);
        switch (expressie) {
            case RobotExpressie.Blij:
                // Glimlach: alleen de onderlip krult omhoog.
                vul(lip_onder, kleur);
                break;
            case RobotExpressie.Boos:
                // Samengeperste mond met gerimpelde neus.
                vul(lip_boven, kleur);
                vul(lip_onder, kleur);
                vul(neus, kleur);
                break;
            case RobotExpressie.Verdrietig:
                // Frons: alleen de bovenlip.
                vul(lip_boven, kleur);
                break;
            case RobotExpressie.Verrast:
                // Open mond met oplichtende tinkywinki.
                vul(lippen, kleur);
                vul(tinkywinki, kleur);
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

        // Vertaal de onderdelen naar LED-nummers via ranges.
        tinkywinki = gezicht.range(0, 1);
        ogen = gezicht.range(1, 2);
        neus = gezicht.range(3, 1);
        lippen = gezicht.range(4, 12);
        lip_boven = lippen.range(0, 6);
        lip_onder = lippen.range(6, 6);
        oog_links = ogen.range(0, 1);
        oog_rechts = ogen.range(1, 1);

        gezicht.clear();
        gezicht.show();
    }

    function vulOnderdeel(onderdeel: RobotOnderdeel, kleur: number): void {
        switch (onderdeel) {
            case RobotOnderdeel.Ogen:
                vul(ogen, kleur);
                break;
            case RobotOnderdeel.OogLinks:
                vul(oog_links, kleur);
                break;
            case RobotOnderdeel.OogRechts:
                vul(oog_rechts, kleur);
                break;
            case RobotOnderdeel.Neus:
                vul(neus, kleur);
                break;
            case RobotOnderdeel.Lippen:
                vul(lippen, kleur);
                break;
            case RobotOnderdeel.LipBoven:
                vul(lip_boven, kleur);
                break;
            case RobotOnderdeel.LipOnder:
                vul(lip_onder, kleur);
                break;
            case RobotOnderdeel.Tinkywinki:
                vul(tinkywinki, kleur);
                break;
            case RobotOnderdeel.Gezicht:
                vul(gezicht, kleur);
                break;
        }
    }

    function vul(deel: neopixel.Strip, kleur: number): void {
        for (let i = 0; i < deel.length(); i++) {
            deel.setPixelColor(i, kleur);
        }
    }
}
