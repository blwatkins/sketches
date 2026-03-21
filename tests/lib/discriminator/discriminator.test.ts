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

import { AspectRatioConfig, Discriminator } from '../../../src/lib';

import { VALID_ASPECT_RATIO_CONFIG_INPUTS, FAILURE_CASES } from './constants';

describe('Discriminator', (): void => {
    describe('new Discriminator()', (): void => {
        test('Discriminator constructor should throw an Error', (): void => {
            expect(() => new Discriminator()).toThrow('Discriminator is a static class and cannot be instantiated.');
        });
    });

    describe('Discriminator.isAspectRatioConfig()', (): void => {
        const SUCCESS_CASES: { input: AspectRatioConfig; expected: true; }[] = VALID_ASPECT_RATIO_CONFIG_INPUTS.map((value: AspectRatioConfig): { input: AspectRatioConfig; expected: true; } => ({ input: value, expected: true }));

        const TEST_CASES: { input: unknown; expected: boolean; }[] = [
            ...FAILURE_CASES,
            ...SUCCESS_CASES
        ];

        test.each(
            TEST_CASES
        )('Discriminator.isAspectRatioConfig($input) should return $expected', ({ input, expected }): void => {
            expect(Discriminator.isAspectRatioConfig(input)).toBe(expected);
        });
    });
});
