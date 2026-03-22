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

describe('StringValidator', (): void => {
    interface TestCase { input: unknown; expected: boolean; }

    function buildTestCases(inputs: readonly unknown[], expected: boolean): TestCase[] {
        return inputs.map((input: unknown): TestCase => ({ input, expected }));
    }

    // noinspection JSPrimitiveTypeWrapperUsage
    const NON_STRING_INPUTS: unknown[] = [
        null,
        undefined,
        0,
        -1,
        Number.NaN,
        Infinity,
        true,
        false,
        {},
        { key: 'value' },
        [],
        ['value'],
        (): string => 'value',
        new String('value'),
        10n
    ];

    const EMPTY_STRING_INPUTS: string[] = [
        '',
        ' ',
        '     ',
        '\n',
        '\t',
        '\n\t',
        ' \n\t '
    ];

    const NON_EMPTY_STRING_INPUTS: string[] = [
        'value',
        'a',
        '0',
        ' false ',
        '#A1B2C3',
        '#a1b2c3d4',
        '  trimmed value  ',
        ' \n\ttrimmed value\t\n '
    ];

    describe('new StringValidator()', (): void => {
        describe('Runtime behavior guards', (): void => {
            test('Constructor should throw an error when instantiated at runtime', (): void => {
                const RuntimeCtor = StringValidator as unknown as new () => StringValidator;
                expect((): StringValidator => new RuntimeCtor()).toThrow(
                    'StringValidator is a static class and cannot be instantiated.'
                );
            });
        });
    });

    describe('isNonEmptyString', (): void => {
        const testCases: TestCase[] = [
            ...buildTestCases(NON_STRING_INPUTS, false),
            ...buildTestCases(EMPTY_STRING_INPUTS, false),
            ...buildTestCases(NON_EMPTY_STRING_INPUTS, true)
        ];

        test.each(
            testCases
        )('({ input: $input, expected: $expected })', ({ input, expected }: TestCase): void => {
            const actual = StringValidator.isNonEmptyString(input);
            expect(actual).toBe(expected);
        });
    });
});
