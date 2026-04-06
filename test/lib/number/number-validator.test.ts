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

import { NumberValidator } from '../../../src/lib';

import {
    negativeNumberInputs,
    nonFiniteNumberInputs,
    nonNumberInputs,
    positiveNumberInputs, zeroInputs
} from '../../utils/input/number-inputs';

import { buildTestCases, TestCase } from '../../utils/test-case/test-case';

describe('NumberValidator', (): void => {
    describe('new NumberValidator()', (): void => {
        describe('Runtime behavior guards', (): void => {
            test('Constructor should throw an error when instantiated at runtime', (): void => {
                const RuntimeConstructor = NumberValidator as unknown as new () => NumberValidator;
                expect((): NumberValidator => new RuntimeConstructor()).toThrow(
                    'NumberValidator is a static class and cannot be instantiated.'
                );
            });
        });
    });

    describe('isPositiveFiniteNumber', (): void => {
        const functionScenarios: {
            label: string;
            zeroInclusiveArg?: boolean;
            successInputs: readonly unknown[];
            failureInputs: readonly unknown[];
        }[] = [
            {
                label: '(input)',
                successInputs: [...positiveNumberInputs],
                failureInputs: [...nonNumberInputs, ...nonFiniteNumberInputs, ...negativeNumberInputs, ...zeroInputs]
            },
            {
                label: '(input, false)',
                zeroInclusiveArg: false,
                successInputs: [...positiveNumberInputs],
                failureInputs: [...nonNumberInputs, ...nonFiniteNumberInputs, ...negativeNumberInputs, ...zeroInputs]
            },
            {
                label: '(input, true)',
                zeroInclusiveArg: true,
                successInputs: [...positiveNumberInputs, ...zeroInputs],
                failureInputs: [...nonNumberInputs, ...nonFiniteNumberInputs, ...negativeNumberInputs]
            }
        ];

        function callIsPositiveFiniteNumber(input: unknown, zeroInclusiveArg?: boolean): boolean {
            if (typeof zeroInclusiveArg === 'undefined') {
                return NumberValidator.isPositiveFiniteNumber(input);
            }

            return NumberValidator.isPositiveFiniteNumber(input, zeroInclusiveArg);
        }

        describe.each(
            functionScenarios
        )('$label', ({ zeroInclusiveArg, successInputs, failureInputs }: { label: string; zeroInclusiveArg?: boolean; successInputs: readonly unknown[]; failureInputs: readonly unknown[]; }): void => {
            const testCases: TestCase[] = [
                ...buildTestCases(failureInputs, false),
                ...buildTestCases(successInputs, true)
            ];

            test.each(
                testCases
            )('{ input: $input, expected: $expected }', ({ input: testInput, expected: testExpected }: TestCase): void => {
                const actual = callIsPositiveFiniteNumber(testInput, zeroInclusiveArg);
                expect(actual).toBe(testExpected);
            });
        });

        describe('Runtime behavior guards', (): void => {
            test('Zero should be invalid unless zeroInclusive is literal true', (): void => {
                const nonTrueArgs: unknown[] = [undefined, null, false, 0, 1, 'true', {}, []];

                for (const arg of nonTrueArgs) {
                    expect(NumberValidator.isPositiveFiniteNumber(0, arg as boolean)).toBe(false);
                }
            });
        });
    });
});
