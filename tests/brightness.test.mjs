import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../robot.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None } }).outputText;
const scaled = (color, brightness) => [16, 8, 0].reduce((result, shift) =>
  result | ((brightness === 255 ? color >>> shift & 255 : ((color >>> shift & 255) * brightness) >> 8) << shift), 0);

function fixture() {
  let face;
  class Strip {
    constructor(pixels, start = 0, count = pixels.length) {
      this.pixels = pixels; this.start = start; this.count = count; this.brightness = 128;
    }
    range(start, count) {
      const strip = new Strip(this.pixels, this.start + start, count);
      strip.brightness = this.brightness;
      return strip;
    }
    setBrightness(value) { this.brightness = value & 255; }
    length() { return this.count; }
    clear() { this.pixels.fill(0, this.start, this.start + this.count); }
    show() {}
    setPixelColor(index, color) { this.pixels[this.start + index] = scaled(color, this.brightness); }
  }
  const context = vm.createContext({
    DigitalPin: { P8: 108 }, AnalogPin: { P15: 115, P16: 116 }, NeoPixelMode: { RGB: 1, RGB_RGB: 3 },
    NeoPixelColors: { Black: 0 }, basic: { clearScreen() {} },
    neopixel: { create: (_, count) => (face = new Strip(Array(count).fill(0))) },
  });
  vm.runInContext("Math.clamp = (min, max, value) => Math.max(min, Math.min(max, value))", context);
  vm.runInContext(compiled, context);
  const { robot, RobotPart, RobotExpression } = context;
  robot.initialize(108, 16, 3); robot.mirrorToArms(false); robot.mirrorToScreen(false);
  return { robot, RobotPart, RobotExpression, pixels: () => [...face.pixels] };
}

test("brightness reaches every cached face range after initialization and subsequent changes", () => {
  const { robot, RobotPart, pixels } = fixture();
  const parts = [
    [RobotPart.Eyes, [1, 2]], [RobotPart.LeftEye, [1]], [RobotPart.RightEye, [2]], [RobotPart.Nose, [3]],
    [RobotPart.Lips, Array.from({ length: 12 }, (_, i) => i + 4)],
    [RobotPart.UpperLip, [4, 5, 6, 7, 8, 9]], [RobotPart.LowerLip, [10, 11, 12, 13, 14, 15]],
    [RobotPart.Tinkywinki, [0]], [RobotPart.Face, Array.from({ length: 16 }, (_, i) => i)],
  ];
  for (const brightness of [255, 0, 60, 1, 255]) {
    robot.setBrightness(brightness);
    for (const [part, indexes] of parts) {
      robot.clear(RobotPart.Face); robot.setColor(part, 0x2468ac);
      assert.deepEqual(pixels(), Array.from({ length: 16 }, (_, index) =>
        indexes.includes(index) ? scaled(0x2468ac, brightness) : 0), `part ${part}, brightness ${brightness}`);
    }
  }
});

test("a full-brightness blue happy expression and nose use the requested intensity", () => {
  const { robot, RobotPart, RobotExpression, pixels } = fixture();
  robot.setBrightness(255);
  robot.showExpression(RobotExpression.Happy, 0x0000ff);
  robot.setColor(RobotPart.Nose, 0x0000ff);
  assert.deepEqual(pixels(), Array.from({ length: 16 }, (_, index) =>
    [1, 2, 3, 10, 11, 12, 13, 14, 15].includes(index) ? 0x0000ff : 0));
});

test("brightness stays bounded, applies to later colors and resets to 40 when reinitialized", () => {
  const { robot, RobotPart, pixels } = fixture();
  robot.setBrightness(999); robot.setColor(RobotPart.Nose, 0xff0000);
  assert.equal(pixels()[3], 0xff0000);
  robot.setBrightness(-1); robot.setColor(RobotPart.Nose, 0xff0000);
  assert.equal(pixels()[3], 0);
  robot.setBrightness(255); robot.initialize(108, 16, 3); robot.setColor(RobotPart.Nose, 0xff0000);
  assert.equal(pixels()[3], scaled(0xff0000, 40));
});
