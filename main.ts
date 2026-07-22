//% color=#2699BF icon="\uf110" block="robot"
namespace robot {
    let LED_PIN: DigitalPin = DigitalPin.P16;
    let LED_COUNT: number = 16;
    let gezicht: neopixel.Strip;
    
    export enum RobotOnderdeel {
        //% block="ogen"
        Ogen = 0,
        //% block="mond"
        Mond = 1,
        //% block="wenkbrauwen"
        Wenkbrauwen = 2,
        //% block="gezicht"
        Gezicht = 3
    }

    function initGezicht(): void {
        if (gezicht) return;
        gezicht = neopixel.create(LED_PIN, LED_COUNT, NeoPixelMode.RGB);
        gezicht.setBrightness(40);
        gezicht.clear();
        gezicht.show();
    }

    /**
     * Stel de kleur in van een onderdeel van de robot.
     * @param onderdeel Het onderdeel van de robot, eg: RobotOnderdeel.Ogen
     * @param kleur De kleur van de NeoPixel, eg: NeoPixelColors.Red
     */
    //% blockId=robot_set_kleur
    //% block="zet %onderdeel kleur %kleur"
    //% weight=100
    export function setKleur(onderdeel: RobotOnderdeel, kleur: number): void {
        initGezicht();
        switch (onderdeel) {
            case RobotOnderdeel.Ogen:
                gezicht.setPixelColor(0, kleur);
                gezicht.setPixelColor(1, kleur);
                gezicht.setPixelColor(4, kleur);
                gezicht.setPixelColor(5, kleur);
                break;
            case RobotOnderdeel.Mond:
                gezicht.setPixelColor(6, kleur);
                gezicht.setPixelColor(7, kleur);
                gezicht.setPixelColor(8, kleur);
                gezicht.setPixelColor(9, kleur);
                gezicht.setPixelColor(10, kleur);
                break;
            case RobotOnderdeel.Wenkbrauwen:
                gezicht.setPixelColor(2, kleur);
                gezicht.setPixelColor(3, kleur);
                break;
            case RobotOnderdeel.Gezicht:
                for (let i = 0; i < LED_COUNT; i++) {
                    gezicht.setPixelColor(i, kleur);
                }
                break;
        }
        gezicht.show();
    }

    /**
     * Wis een onderdeel van de robot.
     * @param onderdeel Het onderdeel van de robot, eg: RobotOnderdeel.Ogen
     */
    //% blockId=robot_wis
    //% block="wis %onderdeel"
    //% weight=90
    export function wis(onderdeel: RobotOnderdeel): void {
        initGezicht();
        switch (onderdeel) {
            case RobotOnderdeel.Ogen:
                gezicht.setPixelColor(0, 0);
                gezicht.setPixelColor(1, 0);
                gezicht.setPixelColor(4, 0);
                gezicht.setPixelColor(5, 0);
                break;
            case RobotOnderdeel.Mond:
                gezicht.setPixelColor(6, 0);
                gezicht.setPixelColor(7, 0);
                gezicht.setPixelColor(8, 0);
                gezicht.setPixelColor(9, 0);
                gezicht.setPixelColor(10, 0);
                break;
            case RobotOnderdeel.Wenkbrauwen:
                gezicht.setPixelColor(2, 0);
                gezicht.setPixelColor(3, 0);
                break;
            case RobotOnderdeel.Gezicht:
                gezicht.clear();
                break;
        }
        gezicht.show();
    }

    /**
     * Stel de helderheid in van de NeoPixels.
     * @param helderheid De helderheid (0-255), eg: 40
     */
    //% blockId=robot_helderheid
    //% block="zet helderheid %helderheid"
    //% helderheid.min=0 helderheid.max=255
    //% weight=80
    export function helderheid(helderheid: number): void {
        initGezicht();
        gezicht.setBrightness(helderheid);
        gezicht.show();
    }
}
