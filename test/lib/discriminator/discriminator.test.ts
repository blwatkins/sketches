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

import { aspectRatios, AspectRatioConfig, Discriminator, Discriminators } from '../../../src/lib';

import {
    negativeNumberInputs,
    nonFiniteNumberInputs,
    nonNumberInputs,
    zeroInputs
} from '../../utils/input/number-inputs';

import {
    emptyStringInputs,
    multilineTrimmedInputs,
    multiTabTrimmedInputs,
    nonStringInputs,
    singleLineLowercaseTrimmedInputs,
    singleLineMixedCaseTrimmedInputs,
    singleLineUpperCaseTrimmedInputs,
    untrimmedInputs
} from '../../utils/input/string-inputs';

import { buildTestCases, Scenario, TestCase } from '../../utils/test-case/test-case';

// TODO - test runtime constructor
// TODO - use shared types
// TODO - use shared test case builders
// TODO - test palette and palette color interfaces
describe('Discriminator', (): void => {
    // noinspection JSPrimitiveTypeWrapperUsage
    const nonDiscriminableTypeInputs: unknown[] = [
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

    const validAspectRatioConfigs: AspectRatioConfig[] = [
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

        const scenarios: Scenario[] = [
            {
                label: 'valid objects',
                inputs: [
                    ...validAspectRatioConfigs,
                    ...Object.values(aspectRatios),
                    ...buildAspectRatioConfigInputs([validAspectRatioConfigs[0]], 'name', [
                        ...singleLineLowercaseTrimmedInputs
                    ])
                ],
                expected: true
            },
            {
                label: 'objects with extra key',
                inputs: [...buildInputsWithAdditionalKey(validAspectRatioConfigs)],
                expected: false

            },
            {
                label: 'objects with missing key',
                inputs: [...buildAspectRatioConfigInputsWithoutKeys(validAspectRatioConfigs, ['widthRatio', 'heightRatio', 'discriminator'])],
                expected: false
            },
            {
                label: 'non-discriminable objects',
                inputs: [...nonDiscriminableTypeInputs],
                expected: false
            },
            {
                label: 'invalid widthRatio values',
                inputs: [
                    ...buildAspectRatioConfigInputs(validAspectRatioConfigs, 'widthRatio', [
                        ...nonNumberInputs,
                        ...nonFiniteNumberInputs,
                        ...negativeNumberInputs,
                        ...zeroInputs,
                        0.5,
                        Number.MIN_VALUE,
                        Number.EPSILON
                    ])],
                expected: false
            },
            {
                label: 'invalid heightRatio values',
                inputs: [
                    ...buildAspectRatioConfigInputs(validAspectRatioConfigs, 'heightRatio', [
                        ...nonNumberInputs,
                        ...nonFiniteNumberInputs,
                        ...negativeNumberInputs,
                        ...zeroInputs,
                        0.5,
                        Number.MIN_VALUE,
                        Number.EPSILON
                    ])],
                expected: false
            },
            {
                label: 'invalid discriminator values',
                inputs: [
                    ...buildAspectRatioConfigInputs(validAspectRatioConfigs, 'discriminator', [
                        ...nonStringInputs,
                        ...emptyStringInputs,
                        Discriminators.PALETTE,
                        Discriminators.PALETTE_COLOR,
                        'I_NOT_A_REAL_DISCRIMINATOR'
                    ])
                ],
                expected: false
            },
            {
                label: 'invalid name values',
                inputs: [
                    ...buildAspectRatioConfigInputs(validAspectRatioConfigs, 'name', [
                        ...nonStringInputs.filter(value => value !== undefined),
                        ...emptyStringInputs,
                        ...singleLineUpperCaseTrimmedInputs,
                        ...singleLineMixedCaseTrimmedInputs,
                        ...multilineTrimmedInputs,
                        ...multiTabTrimmedInputs,
                        ...untrimmedInputs
                    ])],
                expected: false
            }
        ];

        describe.each(
            scenarios
        )('$label', ({ inputs: scenarioInputs, expected: scenarioExpected }: Scenario): void => {
            const testCases: TestCase[] = buildTestCases(scenarioInputs, scenarioExpected);

            test.each(
                testCases
            )('$input should return $expected', ({ input: testInput, expected: testExpected }: TestCase): void => {
                expect(Discriminator.isAspectRatioConfig(testInput)).toBe(testExpected);
            });
        });
    });
});
