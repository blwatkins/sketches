/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { describe, test, expect } from 'vitest';

import {
    ASPECT_RATIOS,
    AspectRatioConfig,
    Discriminator,
    Discriminators,
    Palette,
    PaletteColor
} from '../../../src/lib';

describe('Discriminator', (): void => {
    interface TestCase { input: unknown; expected: boolean; }

    function buildTestCases(inputs: readonly unknown[], expected: boolean): TestCase[] {
        return inputs.map((input: unknown): TestCase => ({ input, expected }));
    }

    // noinspection JSPrimitiveTypeWrapperUsage
    const NON_OBJECT_INPUTS: unknown[] = [
        null,
        undefined,
        10,
        10.10,
        Number.MIN_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_VALUE,
        Number.MAX_VALUE,
        NaN,
        Infinity,
        -Infinity,
        '',
        'string',
        '\n\t',
        '     ',
        true,
        false,
        10n,
        new Number(10),
        Math.random,
        (): number => 5
    ];

    const NON_DISCRIMINABLE_OBJECT_INPUTS: unknown[] = [
        {},
        { key: 'value' },
        { DISCRIMINATOR: '' },
        { DISCRIMINATOR: 'SOME_VALUE' },
        { DISCRIMINATOR: 'I_SOMETHING_ELSE' },
        []
    ];

    describe('new Discriminator()', (): void => {
        describe('Runtime behavior guards', (): void => {
            test('Constructor should throw an error when instantiated at runtime', (): void => {
                const RuntimeCtor = Discriminator as unknown as new () => Discriminator;
                expect((): Discriminator => new RuntimeCtor()).toThrow(
                    'Discriminator is a static class and cannot be instantiated.'
                );
            });
        });
    });

    describe('isAspectRatioConfig()', (): void => {
        const WRONG_DISCRIMINATOR_INPUTS: unknown[] = [
            { DISCRIMINATOR: Discriminators.PALETTE },
            { DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.PALETTE },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: 'test ratio', DISCRIMINATOR: Discriminators.PALETTE },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: 'test ratio', DISCRIMINATOR: Discriminators.PALETTE_COLOR }
        ];

        const INVALID_ASPECT_RATIO_CONFIG_INPUTS: unknown[] = [
            // Missing required fields
            { HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99 },

            // Invalid NAME
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: null, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: '', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: '     ', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: '\n\t', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },

            // Extra property (strict schema)
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG, EXTRA: 'value' },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: 'test ratio', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG, EXTRA: 'value' },

            // WIDTH_RATIO invalid
            { WIDTH_RATIO: '100', HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: null, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: NaN, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: Infinity, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: -Infinity, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: -100, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 0, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 0.1, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },

            // HEIGHT_RATIO invalid
            { WIDTH_RATIO: 100, HEIGHT_RATIO: '99', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: null, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: NaN, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: Infinity, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: -Infinity, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: -99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 0, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 0.1, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG }
        ];

        const VALID_ASPECT_RATIO_CONFIG_INPUTS: AspectRatioConfig[] = [
            ...Object.values(ASPECT_RATIOS),
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 100, HEIGHT_RATIO: 99, NAME: 'test ratio config', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 2.4, HEIGHT_RATIO: 1.5, DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { WIDTH_RATIO: 2.4, HEIGHT_RATIO: 1.5, NAME: 'test ratio config', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG }
        ];

        const testCases: TestCase[] = [
            ...buildTestCases([
                ...NON_OBJECT_INPUTS,
                ...NON_DISCRIMINABLE_OBJECT_INPUTS,
                ...WRONG_DISCRIMINATOR_INPUTS,
                ...INVALID_ASPECT_RATIO_CONFIG_INPUTS
            ], false),
            ...buildTestCases(VALID_ASPECT_RATIO_CONFIG_INPUTS, true)
        ];

        test.each(
            testCases
        )('({ input: $input, expected: $expected })', ({ input, expected }): void => {
            expect(Discriminator.isAspectRatioConfig(input)).toBe(expected);
        });
    });

    describe('isPalette()', (): void => {
        const WRONG_DISCRIMINATOR_INPUTS: unknown[] = [
            { DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { NAME: 'test palette', IS_GRADIENT: false, COLORS: [], DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { NAME: 'test palette', IS_GRADIENT: false, COLORS: [], DISCRIMINATOR: Discriminators.PALETTE_COLOR }
        ];

        const VALID_PALETTE_INPUTS: Palette[] = [
            {
                NAME: 'test palette',
                IS_GRADIENT: false,
                COLORS: [],
                DISCRIMINATOR: Discriminators.PALETTE
            },
            {
                NAME: 'gradient palette',
                IS_GRADIENT: true,
                COLORS: [],
                DISCRIMINATOR: Discriminators.PALETTE
            },
            {
                NAME: 'palette with source',
                SOURCE: 'Test Source',
                SOURCE_URL: 'https://example.com',
                IS_GRADIENT: false,
                COLORS: [],
                DISCRIMINATOR: Discriminators.PALETTE
            },
            {
                NAME: 'palette with contrast map',
                IS_GRADIENT: false,
                COLORS: [],
                CONTRAST_MAP: {
                    '#000000': ['#FFFFFF'],
                    '#FFFFFF': ['#000000']
                },
                DISCRIMINATOR: Discriminators.PALETTE
            }
        ];

        const testCases: TestCase[] = [
            ...buildTestCases([
                ...NON_OBJECT_INPUTS,
                ...NON_DISCRIMINABLE_OBJECT_INPUTS,
                ...WRONG_DISCRIMINATOR_INPUTS
            ], false),
            ...buildTestCases(VALID_PALETTE_INPUTS, true)
        ];

        test.each(
            testCases
        )('({ input: $input, expected: $expected })', ({ input, expected }): void => {
            expect(Discriminator.isPalette(input)).toBe(expected);
        });
    });

    describe('isPaletteColor()', (): void => {
        const WRONG_DISCRIMINATOR_INPUTS: unknown[] = [
            { DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { DISCRIMINATOR: Discriminators.PALETTE },
            { HEX: '#A1B2C3', NAME: 'test color', DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG },
            { HEX: '#A1B2C3', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE },
            { HEX: '#A1B2C3', NAME: 'test color', DISCRIMINATOR: 'I_SOMETHING_ELSE' }
        ];

        const INVALID_PALETTE_COLOR_INPUTS: unknown[] = [
            // Missing required fields
            { NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color' },

            // Extra property (strict schema)
            { HEX: '#A1B2C3', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR, EXTRA: 'value' },

            // HEX invalid
            { HEX: null, NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: 123, NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: 'A1B2C3', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#ABC', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3D4', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2CZ', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#AaB2C3', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },

            // NAME invalid
            { HEX: '#A1B2C3', NAME: null, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 100, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: '', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: '     ', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'Test Color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },

            // LUMINANCE invalid
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: null, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: '0.5', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: -0.01, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: 1.01, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: NaN, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: Infinity, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: -Infinity, DISCRIMINATOR: Discriminators.PALETTE_COLOR },

            // RGB invalid container
            { HEX: '#A1B2C3', NAME: 'test color', RGB: null, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: [], DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: {}, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: 0, G: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: 0, G: 0, B: 0, A: 255 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },

            // RGB component invalid
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: -1, G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: 256, G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: 1.5, G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: '0', G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: NaN, G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: Infinity, G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },

            // HSL invalid container
            { HEX: '#A1B2C3', NAME: 'test color', HSL: null, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: [], DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: {}, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: 0, L: 0, A: 100 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },

            // HSL component invalid
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: -1, S: 0, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 361, S: 0, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: -1, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: 101, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: 0, L: -1 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: 0, L: 101 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0.5, S: 0, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: '0', S: 0, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR }
        ];

        const VALID_PALETTE_COLOR_INPUTS: PaletteColor[] = [
            // Uppercase hex
            { HEX: '#A1B2C3', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            // Lowercase hex
            { HEX: '#a1b2c3', NAME: 'test color', DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: 0, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: 0.5, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', LUMINANCE: 1, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: 0, G: 0, B: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', RGB: { R: 255, G: 255, B: 255 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 0, S: 0, L: 0 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            { HEX: '#A1B2C3', NAME: 'test color', HSL: { H: 360, S: 100, L: 100 }, DISCRIMINATOR: Discriminators.PALETTE_COLOR },
            {
                HEX: '#A1B2C3',
                NAME: 'test color',
                LUMINANCE: 0.5,
                RGB: { R: 161, G: 178, B: 195 },
                HSL: { H: 210, S: 24, L: 70 },
                DISCRIMINATOR: Discriminators.PALETTE_COLOR
            }
        ];

        const testCases: TestCase[] = [
            ...buildTestCases([
                ...NON_OBJECT_INPUTS,
                ...NON_DISCRIMINABLE_OBJECT_INPUTS,
                ...WRONG_DISCRIMINATOR_INPUTS,
                ...INVALID_PALETTE_COLOR_INPUTS
            ], false),
            ...buildTestCases(VALID_PALETTE_COLOR_INPUTS, true)
        ];

        test.each(
            testCases
        )('({ input: $input, expected: $expected })', ({ input, expected }): void => {
            expect(Discriminator.isPaletteColor(input)).toBe(expected);
        });
    });
});
