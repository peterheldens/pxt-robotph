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

enum ArmPosition {
    //% block="high"
    High,
    //% block="middle"
    Middle,
    //% block="low"
    Low
}

enum RobotServo {
    //% block="servo2"
    Servo2,
    //% block="servo3"
    Servo3
}

enum KnobPin {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

//% color=#2699BF icon="\uf110" block="Robot"
//% groups='["Setup", "Colors", "Expressions", "Arms"]'
namespace robot {

    let LED_PIN: DigitalPin = DigitalPin.P8;
    let LED_COUNT: number = 16;
    let LED_MODE: NeoPixelMode = NeoPixelMode.RGB;
    let gezicht: neopixel.Strip;
    let spiegelNaarScherm: boolean = true;
    let spiegelNaarArmen: boolean = true;
    let omkeerServo2: boolean = false;
    let omkeerServo3: boolean = false;
    let servoMinHoek2: number = 0;
    let servoMaxHoek2: number = 180;
    let servoMinHoek3: number = 0;
    let servoMaxHoek3: number = 180;

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
     * Connect the NeoPixel to Servo1 on the servo board: Servo1 is wired to pin P8.
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
    //% parts="robotface robotservo2"
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
        beweegArmen(expression);
    }

    /**
     * Also mirror the expression on the micro:bit's 5x5 LED screen.
     * @param on true to also show the face on the screen
     */
    //% blockId="robot_screen_mirror"
    //% block="pass expression through to screen %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% weight=65
    //% group="Expressions"
    export function mirrorToScreen(on: boolean): void {
        spiegelNaarScherm = on;
        if (!on) basic.clearScreen();
    }

    /**
     * Also move the arms (servo2) to match the expression.
     * @param on true to also move the arms with the expression
     */
    //% blockId="robot_arms_mirror"
    //% block="pass expression through to arms %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% weight=64
    //% group="Expressions"
    //% parts="robotservo2"
    export function mirrorToArms(on: boolean): void {
        spiegelNaarArmen = on;
    }

    /**
     * Turn a servo to a position (high, middle or low).
     * @param servo the servo to drive: servo2 or servo3
     * @param position the position: high, middle or low
     */
    //% blockId="robot_turn_servo_position"
    //% block="turn %servo to position %position"
    //% parts="robotservo2 robotservo3"
    //% weight=60
    //% group="Arms"
    export function turnServoToPosition(servo: RobotServo, position: ArmPosition): void {
        let degrees = 90;
        switch (position) {
            case ArmPosition.High:
                degrees = 180;
                break;
            case ArmPosition.Middle:
                degrees = 90;
                break;
            case ArmPosition.Low:
                degrees = 0;
                break;
        }
        let servoChoice = servo == RobotServo.Servo3
            ? kitronik_simple_servo.ServoChoice.servo3
            : kitronik_simple_servo.ServoChoice.servo2;
        zetServo(servoChoice, degrees);
    }

    /**
     * Turn a servo to an angle (0-180) from a knob (potentiometer) connected to an analog pin.
     * @param servo the servo to drive: servo2 or servo3
     * @param knob the analog pin the knob is connected to
     */
    //% blockId="robot_turn_servo_knob"
    //% block="turn %servo with knob connected to %knob"
    //% parts="robotservo2 robotservo3"
    //% weight=55
    //% group="Arms"
    export function turnServoWithKnob(servo: RobotServo, knob: KnobPin): void {
        let analogPin = AnalogPin.P0;
        switch (knob) {
            case KnobPin.P0:
                analogPin = AnalogPin.P0;
                break;
            case KnobPin.P1:
                analogPin = AnalogPin.P1;
                break;
            case KnobPin.P2:
                analogPin = AnalogPin.P2;
                break;
        }
        let value = pins.analogReadPin(analogPin);
        let degrees = Math.round(Math.clamp(0, 180, Math.map(value, 0, 1023, 0, 180)));
        let servoChoice = servo == RobotServo.Servo3
            ? kitronik_simple_servo.ServoChoice.servo3
            : kitronik_simple_servo.ServoChoice.servo2;
        zetServo(servoChoice, degrees);
    }

    /**
     * Reverse the turning direction of a servo. When on, an angle of 180
     * becomes 0, 0 becomes 180, 30 becomes 150, and so on.
     * @param servo the servo to reverse: servo2 or servo3
     * @param on true to reverse the direction of the servo
     */
    //% blockId="robot_reverse_servo"
    //% block="reverse direction of %servo %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% weight=50
    //% group="Arms"
    export function reverseServo(servo: RobotServo, on: boolean): void {
        if (servo == RobotServo.Servo3) {
            omkeerServo3 = on;
        } else {
            omkeerServo2 = on;
        }
    }

    /**
     * Limit the range of a servo so it can only move between a fixed start
     * and end position. The start must be smaller than the end.
     * @param servo the servo to limit: servo2 or servo3
     * @param start the lowest angle the servo may move to (0-180)
     * @param end the highest angle the servo may move to (0-180)
     */
    //% blockId="robot_limit_servo_range"
    //% block="limit range of %servo from %start to %end"
    //% start.min=0 start.max=180 start.defl=0
    //% end.min=0 end.max=180 end.defl=180
    //% weight=45
    //% group="Arms"
    export function limitServoRange(servo: RobotServo, start: number, end: number): void {
        start = Math.clamp(0, 180, start);
        end = Math.clamp(0, 180, end);
        if (start < end) {
            if (servo == RobotServo.Servo3) {
                servoMinHoek3 = start;
                servoMaxHoek3 = end;
            } else {
                servoMinHoek2 = start;
                servoMaxHoek2 = end;
            }
        }
    }

    function zetServo(servoChoice: kitronik_simple_servo.ServoChoice, degrees: number): void {
        let inverted = servoChoice == kitronik_simple_servo.ServoChoice.servo3
            ? omkeerServo3
            : omkeerServo2;
        if (inverted) degrees = 180 - degrees;
        // Keep the servo within its configured range.
        if (servoChoice == kitronik_simple_servo.ServoChoice.servo3) {
            degrees = Math.clamp(servoMinHoek3, servoMaxHoek3, degrees);
        } else {
            degrees = Math.clamp(servoMinHoek2, servoMaxHoek2, degrees);
        }
        // Drive the servo pin directly with a literal pin so the micro:bit
        // simulator can detect and display the servo (servo2 = P15, servo3 = P16).
        if (servoChoice == kitronik_simple_servo.ServoChoice.servo3) {
            pins.servoWritePin(AnalogPin.P16, degrees);
        } else {
            pins.servoWritePin(AnalogPin.P15, degrees);
        }
    }

    function beweegArmen(expression: RobotExpression): void {
        if (!spiegelNaarArmen) return;
        let degrees = 90;
        switch (expression) {
            case RobotExpression.Happy:
                // Arms raised up high.
                degrees = 180;
                break;
            case RobotExpression.Surprised:
                // Arms flung up in surprise.
                degrees = 150;
                break;
            case RobotExpression.Angry:
                // Arms held out straight.
                degrees = 90;
                break;
            case RobotExpression.Sad:
                // Arms hanging down low.
                degrees = 20;
                break;
        }
        zetServo(kitronik_simple_servo.ServoChoice.servo2, degrees);
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
