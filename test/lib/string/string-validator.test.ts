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

import { StringValidator } from '../../../src/lib';

import { Scenario, TestCase, buildTestCases } from '../../utils/test-case/test-case';
import { EMPTY_STRING_INPUTS, NON_EMPTY_STRING_INPUTS, NON_STRING_INPUTS } from '../../utils/input/string-inputs';

describe('StringValidator', (): void => {
    describe('new StringValidator()', (): void => {
        describe('Runtime behavior guards', (): void => {
            test('Constructor should throw an error when instantiated at runtime', (): void => {
                const RuntimeConstructor = StringValidator as unknown as new () => StringValidator;
                expect((): StringValidator => new RuntimeConstructor()).toThrow(
                    'StringValidator is a static class and cannot be instantiated.'
                );
            });
        });
    });

    // TODO - make similar updates in number tests
    // TODO - update types in discriminator tests
    describe('isNonEmptyString', (): void => {
        const SCENARIOS: Scenario[] = [
            {
                LABEL: 'non-string inputs',
                INPUTS: [...NON_STRING_INPUTS],
                EXPECTED: false
            },
            {
                LABEL: 'empty string inputs',
                INPUTS: [...EMPTY_STRING_INPUTS],
                EXPECTED: false
            },
            {
                LABEL: 'non-empty string inputs',
                INPUTS: [...NON_EMPTY_STRING_INPUTS],
                EXPECTED: true
            }
        ];

        describe.each(
            SCENARIOS
        )('$LABEL', ({ INPUTS: scenarioInputs, EXPECTED: scenarioExpected}: Scenario): void => {
            const TEST_CASES: TestCase[] = buildTestCases(scenarioInputs, scenarioExpected);

            test.each(
                TEST_CASES
            )('$INPUT should return $EXPECTED', ({ INPUT: testInput, EXPECTED: testExpected }: TestCase): void => {
                expect(StringValidator.isNonEmptyString(testInput)).toBe(testExpected);
            });
        });
    });
});
