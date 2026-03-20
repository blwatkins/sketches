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

import {ASPECT_RATIOS, AspectRatioConfig, Discriminator, Discriminators} from '../../../src/lib';

describe('Discriminator', (): void => {
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
        document,
        Math.random,
        (): number => {
            return 5;
        }
    ];

    const FAILURE_CASES: { input: unknown; expected: false; }[] = FAILURE_INPUTS.map((input: unknown): { input: unknown; expected: false; } => ({ input: input, expected: false }));

    describe('new Discriminator()', (): void => {
        test('Discriminator constructor should throw an Error', (): void => {
            expect(() => new Discriminator()).toThrow('Discriminator is a static class and cannot be instantiated.');
        });
    });

    describe('Discriminator.isAspectRatioConfig()', (): void => {
        const ASPECT_RATIO_CASES: { input: AspectRatioConfig; expected: true }[] = Object.values(ASPECT_RATIOS).map((value: AspectRatioConfig): { input: AspectRatioConfig; expected: true; } => ({ input: value, expected: true }));

        const TEST_CASES: { input: unknown; expected: boolean; }[] = [
            ...FAILURE_CASES,
            ...ASPECT_RATIO_CASES,
            {
                input: {
                    DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
                },
                expected: true
            },
            {
                input: {
                    WIDTH_RATIO: 100,
                    HEIGHT_RATIO: 99,
                    DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
                },
                expected: true
            },
            {
                input: {
                    WIDTH_RATIO: 100,
                    HEIGHT_RATIO: 99,
                    NAME: 'test ratio config',
                    DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
                },
                expected: true
            }
        ];

        test.each(
            TEST_CASES
        )('Discriminator.isAspectRatioConfig($input) should return $expected', ({ input, expected }): void => {
            expect(Discriminator.isAspectRatioConfig(input)).toBe(expected);
        });
    });
});
