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

import { AspectRatios, AspectRatioConfig, Discriminator, Discriminators } from '../../../src/lib';

import {
    NEGATIVE_NUMBER_INPUTS,
    NON_FINITE_NUMBER_INPUTS,
    NON_NUMBER_INPUTS,
    ZERO_INPUTS
} from '../../utils/input/number-inputs';
import { EMPTY_STRING_INPUTS, NON_STRING_INPUTS } from '../../utils/input/string-inputs';

// TODO - test runtime constructor
// TODO - use shared types
// TODO - use shared test case builders
// TODO - test palette and palette color interfaces
describe('Discriminator', (): void => {
    interface TestCase { input: unknown; expected: boolean; }

    function buildTestCases(inputs: readonly unknown[], expected: boolean): TestCase[] {
        return inputs.map((input: unknown): TestCase => ({ input, expected }));
    }

    // noinspection JSPrimitiveTypeWrapperUsage
    const NON_DISCRIMINABLE_TYPE_INPUTS: unknown[] = [
        null,
        undefined,
        '',
        'string',
        '\n\t',
        '     ',
        {},
        { key: 'value' },
        (): number => 10,
        Math.random,
        true,
        false,
        '5',
        '5.5',
        new Number(10),
        10n,
        [],
        ['value'],
        0,
        -1,
        Number.NaN,
        Infinity,
        new String('value')
    ];

    const VALID_ASPECT_RATIO_CONFIGS: AspectRatioConfig[] = [
        {
            name: 'test config',
            widthRatio: 1,
            heightRatio: 1,
            discriminator: Discriminators.ASPECT_RATIO_CONFIG
        },
        {
            widthRatio: 1,
            heightRatio: 1,
            discriminator: Discriminators.ASPECT_RATIO_CONFIG
        }
    ];

    function buildInputsWithAdditionalKey(validObjects: readonly Record<string, unknown>[]): unknown[] {
        const objects: unknown[] = [];

        for (const validObject of validObjects) {
            const newObject: Record<string, unknown> = {
                ...validObject,
                EXTRA_KEY: 'extra value'
            };
            objects.push(newObject);
        }

        return objects;
    }

    describe('isAspectRatioConfig()', (): void => {
        function buildAspectRatioConfigInputs(validObjects: AspectRatioConfig[], key: string, values: unknown[]): unknown[] {
            const objects: unknown[] = [];

            for (const validObject of validObjects) {
                for (const value of values) {
                    const baseObject: Record<string, unknown> = { ...validObject };
                    baseObject[key] = value;
                    objects.push(baseObject);
                }
            }

            return objects;
        }

        function buildAspectRatioConfigInputsWithoutKeys(validObjects: AspectRatioConfig[], keysToRemove: string[]): unknown[] {
            const objects: unknown[] = [];

            for (const validObject of validObjects) {
                for (const key of keysToRemove) {
                    const baseObject: Record<string, unknown> = { ...validObject };
                    delete baseObject[key];
                    objects.push(baseObject);
                }
            }

            return objects;
        }

        const SCENARIOS: { label: string; inputs: unknown[]; expected: boolean; }[] = [
            {
                label: 'valid objects',
                inputs: [
                    ...VALID_ASPECT_RATIO_CONFIGS,
                    ...Object.values(AspectRatios),
                    ...buildAspectRatioConfigInputs([VALID_ASPECT_RATIO_CONFIGS[0]], 'name', [
                        'UPPERCASE NAME',
                        'Mixed Case Name',
                        ...EMPTY_STRING_INPUTS.filter(value => value !== '')
                    ])
                ],
                expected: true
            },
            {
                label: 'objects with extra key',
                inputs: [...buildInputsWithAdditionalKey(VALID_ASPECT_RATIO_CONFIGS)],
                expected: false

            },
            {
                label: 'objects with missing key',
                inputs: [...buildAspectRatioConfigInputsWithoutKeys(VALID_ASPECT_RATIO_CONFIGS, ['widthRatio', 'heightRatio', 'discriminator'])],
                expected: false
            },
            {
                label: 'non-discriminable objects',
                inputs: [...NON_DISCRIMINABLE_TYPE_INPUTS],
                expected: false
            },
            {
                label: 'invalid WIDTH_RATIO values',
                inputs: [
                    ...buildAspectRatioConfigInputs(VALID_ASPECT_RATIO_CONFIGS, 'widthRatio', [
                        ...NON_NUMBER_INPUTS,
                        ...NON_FINITE_NUMBER_INPUTS,
                        ...NEGATIVE_NUMBER_INPUTS,
                        ...ZERO_INPUTS,
                        0.5,
                        Number.MIN_VALUE,
                        Number.EPSILON
                    ])],
                expected: false
            },
            {
                label: 'invalid HEIGHT_RATIO values',
                inputs: [
                    ...buildAspectRatioConfigInputs(VALID_ASPECT_RATIO_CONFIGS, 'heightRatio', [
                        ...NON_NUMBER_INPUTS,
                        ...NON_FINITE_NUMBER_INPUTS,
                        ...NEGATIVE_NUMBER_INPUTS,
                        ...ZERO_INPUTS,
                        0.5,
                        Number.MIN_VALUE,
                        Number.EPSILON
                    ])],
                expected: false
            },
            {
                label: 'invalid DISCRIMINATOR values',
                inputs: [
                    ...buildAspectRatioConfigInputs(VALID_ASPECT_RATIO_CONFIGS, 'discriminator', [
                        ...NON_STRING_INPUTS,
                        ...EMPTY_STRING_INPUTS,
                        Discriminators.PALETTE,
                        Discriminators.PALETTE_COLOR,
                        'I_NOT_A_REAL_DISCRIMINATOR'
                    ])
                ],
                expected: false
            },
            {
                label: 'invalid NAME values',
                inputs: [
                    ...buildAspectRatioConfigInputs(VALID_ASPECT_RATIO_CONFIGS, 'name', [
                        ...NON_STRING_INPUTS.filter(value => value !== undefined),
                        ''
                    ])],
                expected: false
            }
        ];

        describe.each(
            SCENARIOS
        )('$label', ({ inputs, expected: scenarioExpected }): void => {
            const testCases: TestCase[] = buildTestCases(inputs, scenarioExpected);

            test.each(
                testCases
            )('$input should return $expected', ({ input, expected: testExpected }: TestCase): void => {
                expect(Discriminator.isAspectRatioConfig(input)).toBe(testExpected);
            });
        });
    });
});
