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

import { AspectRatioConfig, Discriminators, ASPECT_RATIOS } from '../../../src/lib';

// TODO - add palette color test cases

const INVALID_ASPECT_RATIO_CONFIG_INPUTS: unknown[] = [
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: null,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: '',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: '          ',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: '\n\t',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config'
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.PALETTE
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        WIDTH_RATIO: '100',
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: '99',
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG,
        EXTRA_PROPERTY: 'extra value'
    },
    {
        WIDTH_RATIO: Infinity,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: Infinity,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: -Infinity,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: -Infinity,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: NaN,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: NaN,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 0.1,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 0.1,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: -100,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: -99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.PALETTE
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        WIDTH_RATIO: '100',
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: '99',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG,
        EXTRA_PROPERTY: 'extra value'
    },
    {
        WIDTH_RATIO: Infinity,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: Infinity,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: -Infinity,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: -Infinity,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: NaN,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: NaN,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 0.1,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 0.1,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: -100,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: -99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    }
];

// TODO - review and expand invalid cases
// TODO - remember: empty strings, whitespace strings
// TODO - remember: NaN, negative, out of range, Infinity, -Infinity, wrong types, MIN_VALUE, MAX_VALUE, MIN_SAFE_INTEGER, MAX_SAFE_INTEGER
// TODO - remember: extra fields
const INVALID_PALETTE_COLOR_INPUTS: unknown[] = [
    // Missing required fields
    {
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5
    },

    // Wrong discriminator
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: 'I_SOMETHING_ELSE'
    },

    // Extra top-level property (strict schema)
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR,
        EXTRA_PROPERTY: 'extra value'
    },

    // HEX invalid
    {
        HEX: null,
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: 123,
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: 'A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#ABC',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3D4',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2CZ',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#AaB2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },

    // NAME invalid
    {
        HEX: '#A1B2C3',
        NAME: null,
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 100,
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: '',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'Test Color',
        LUMINANCE: 0.5,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },

    // LUMINANCE invalid
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: null,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: '0.5',
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: -0.01,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 1.01,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: Infinity,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: -Infinity,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: NaN,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },

    // RGB invalid container
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: null,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: [],
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: {},
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: 0, G: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: 0, G: 0, B: 0, A: 255 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },

    // RGB component invalid
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: -1, G: 0, B: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: 256, G: 0, B: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: 1.5, G: 0, B: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: '0', G: 0, B: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: NaN, G: 0, B: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        RGB: { R: Infinity, G: 0, B: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },

    // HSL invalid container
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: null,
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: [],
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: {},
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0, S: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0, S: 0, L: 0, A: 100 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },

    // HSL component invalid
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: -1, S: 0, L: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 361, S: 0, L: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0, S: -1, L: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0, S: 101, L: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0, S: 0, L: -1 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0, S: 0, L: 101 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: 0.5, S: 0, L: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    },
    {
        HEX: '#A1B2C3',
        NAME: 'test color',
        LUMINANCE: 0.5,
        HSL: { H: '0', S: 0, L: 0 },
        DISCRIMINATOR: Discriminators.PALETTE_COLOR
    }
];

const FAILURE_INPUTS: unknown[] = [
    10,
    10.10,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Number.MIN_VALUE,
    Number.MAX_VALUE,
    Math.random(),
    NaN,
    'Hello, World!',
    '',
    true,
    false,
    null,
    undefined,
    {},
    { DISCRIMINATOR: '' },
    { DISCRIMINATOR: 'SOME_VALUE' },
    Math.random,
    (): number => {
        return 5;
    },
    ...Object.values(Discriminators).map((value: Discriminators) => ({ DISCRIMINATOR: value })),
    ...INVALID_ASPECT_RATIO_CONFIG_INPUTS,
    ...INVALID_PALETTE_COLOR_INPUTS
];

export const VALID_ASPECT_RATIO_CONFIG_INPUTS: AspectRatioConfig[] = [
    ...Object.values(ASPECT_RATIOS),
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 100,
        HEIGHT_RATIO: 99,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 2.4,
        HEIGHT_RATIO: 1.5,
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    },
    {
        WIDTH_RATIO: 2.4,
        HEIGHT_RATIO: 1.5,
        NAME: 'test ratio config',
        DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
    }
];

export const FAILURE_CASES: { input: unknown; expected: false; }[] = FAILURE_INPUTS.map((input: unknown): { input: unknown; expected: false; } => ({ input: input, expected: false }));
