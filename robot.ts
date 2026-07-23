/**
 * Control a robot face made of a NeoPixel ring (16 LEDs by default).
 */

enum RobotPart {
    //% block="eyes"
    Eyes,
    //% block="left eye"
    LeftEye,
    //% block="right eye"
    RightEye,
    //% block="nose"
    Nose,
    //% block="lips"
    Lips,
    //% block="upper lip"
    UpperLip,
    //% block="lower lip"
    LowerLip,
    //% block="tinkywinki"
    Tinkywinki,
    //% block="face"
    Face
}

enum RobotExpression {
    //% block="happy"
    Happy,
    //% block="angry"
    Angry,
    //% block="sad"
    Sad,
    //% block="surprised"
    Surprised
}

//% color=#2699BF icon="\uf110" block="Robot"
//% groups='["Setup", "Colors", "Expressions"]'
namespace robot {

    let LED_PIN: DigitalPin = DigitalPin.P8;
    let LED_COUNT: number = 16;
    let LED_MODE: NeoPixelMode = NeoPixelMode.RGB;
    let gezicht: neopixel.Strip;
    let spiegelNaarScherm: boolean = true;

    // Parts of the face, expressed as ranges on the LED strip.
    let tinkywinki: neopixel.Strip;
    let ogen: neopixel.Strip;
    let neus: neopixel.Strip;
    let lippen: neopixel.Strip;
    let lip_boven: neopixel.Strip;
    let lip_onder: neopixel.Strip;
    let oog_links: neopixel.Strip;
    let oog_rechts: neopixel.Strip;

    /**
     * Initialize the robot face on the given data pin.
     * @param pin the pin the NeoPixel strip is connected to
     * @param count the number of LEDs in the strip
     * @param mode the color format of the NeoPixels
     */
    //% blockId="robot_init"
    //% block="initialize robot on pin %pin with %count LEDs as %mode"
    //% pin.defl=DigitalPin.P8
    //% count.defl=16 count.min=1 count.max=64
    //% mode.defl=NeoPixelMode.RGB
    //% weight=100
    //% group="Setup"
    //% parts="robotface" trackArgs=0,2
    export function initialize(pin: DigitalPin, count: number, mode: NeoPixelMode = NeoPixelMode.RGB): void {
        LED_PIN = pin;
        LED_COUNT = Math.max(1, count);
        LED_MODE = mode;
        gezicht = null;
        initGezicht();
    }

    /**
     * Set the overall brightness of the robot face (0-255).
     * @param brightness brightness from 0 (off) to 255 (full)
     */
    //% blockId="robot_brightness"
    //% block="set brightness to %brightness"
    //% brightness.min=0 brightness.max=255 brightness.defl=40
    //% weight=95
    //% group="Setup"
    //% parts="robotface"
    export function setBrightness(brightness: number): void {
        initGezicht();
        gezicht.setBrightness(Math.clamp(0, 255, brightness));
        gezicht.show();
    }

    /**
     * Set the color of a part of the face.
     * @param part the part of the face to color
     * @param color the color to use
     */
    //% blockId="robot_set_color"
    //% block="set %part to color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=90
    //% group="Colors"
    //% parts="robotface"
    export function setColor(part: RobotPart, color: number): void {
        initGezicht();
        vulOnderdeel(part, color);
        gezicht.show();
    }

    /**
     * Turn off a part of the face.
     * @param part the part of the face to clear
     */
    //% blockId="robot_clear"
    //% block="clear %part"
    //% weight=80
    //% group="Colors"
    //% parts="robotface"
    export function clear(part: RobotPart): void {
        initGezicht();
        vulOnderdeel(part, NeoPixelColors.Black);
        gezicht.show();
    }

    /**
     * Show an expression on the robot face.
     * @param expression the expression to show
     * @param color the color to use
     */
    //% blockId="robot_expression"
    //% block="show expression %expression with color %color"
    //% color.shadow="colorNumberPicker"
    //% weight=70
    //% group="Expressions"
    //% parts="robotface"
    export function showExpression(expression: RobotExpression, color: number): void {
        initGezicht();
        gezicht.clear();
        vul(ogen, color);
        switch (expression) {
            case RobotExpression.Happy:
                // Smile: only the lower lip curves up.
                vul(lip_onder, color);
                break;
            case RobotExpression.Angry:
                // Pressed lips with a wrinkled nose.
                vul(lip_boven, color);
                vul(lip_onder, color);
                vul(neus, color);
                break;
            case RobotExpression.Sad:
                // Frown: only the upper lip.
                vul(lip_boven, color);
                break;
            case RobotExpression.Surprised:
                // Open mouth with a lit-up tinkywinki.
                vul(lippen, color);
                vul(tinkywinki, color);
                break;
        }
        gezicht.show();
        tekenOpScherm(expression);
    }

    /**
     * Also mirror the expression on the micro:bit's 5x5 LED screen.
     * @param on true to also show the face on the screen
     */
    //% blockId="robot_screen_mirror"
    //% block="also show face on micro:bit screen %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% weight=65
    //% group="Expressions"
    export function mirrorToScreen(on: boolean): void {
        spiegelNaarScherm = on;
        if (!on) basic.clearScreen();
    }

    function tekenOpScherm(expression: RobotExpression): void {
        if (!spiegelNaarScherm) return;
        switch (expression) {
            case RobotExpression.Happy:
                basic.showLeds(`
                    . # . # .
                    . # . # .
                    . . . . .
                    # . . . #
                    . # # # .
                `);
                break;
            case RobotExpression.Angry:
                basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                break;
            case RobotExpression.Sad:
                basic.showLeds(`
                    . # . # .
                    . # . # .
                    . . . . .
                    . # # # .
                    # . . . #
                `);
                break;
            case RobotExpression.Surprised:
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

        // Translate the parts to LED numbers using ranges.
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

    function vulOnderdeel(part: RobotPart, color: number): void {
        switch (part) {
            case RobotPart.Eyes:
                vul(ogen, color);
                break;
            case RobotPart.LeftEye:
                vul(oog_links, color);
                break;
            case RobotPart.RightEye:
                vul(oog_rechts, color);
                break;
            case RobotPart.Nose:
                vul(neus, color);
                break;
            case RobotPart.Lips:
                vul(lippen, color);
                break;
            case RobotPart.UpperLip:
                vul(lip_boven, color);
                break;
            case RobotPart.LowerLip:
                vul(lip_onder, color);
                break;
            case RobotPart.Tinkywinki:
                vul(tinkywinki, color);
                break;
            case RobotPart.Face:
                vul(gezicht, color);
                break;
        }
    }

    function vul(deel: neopixel.Strip, color: number): void {
        for (let i = 0; i < deel.length(); i++) {
            deel.setPixelColor(i, color);
        }
    }
}
