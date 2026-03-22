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

/**
 * Static methods for validating number types.
 */
export class NumberValidator {
    // noinspection JSUnusedLocalSymbols
    /**
     * @throws {Error} - NumberValidator is a static class and cannot be instantiated.
     */
    private constructor() {
        throw new Error('NumberValidator is a static class and cannot be instantiated.');
    }

    /**
     * Checks whether the input is a finite positive number, or zero when `zeroInclusive` is `true`.
     *
     * @param input - The input to check.
     * @param zeroInclusive - `true` if zero should be considered a valid input.
     * `false` if zero should be considered an invalid input.
     *
     * @returns {boolean} - `true` if the given input is a finite positive number, or zero when `zeroInclusive` is `true`; `false` otherwise.
     */
    public static isPositiveFiniteNumber(input: unknown, zeroInclusive?: boolean): boolean {
        if (typeof input !== 'number' || !Number.isFinite(input)) {
            return false;
        }

        if (zeroInclusive === true) {
            return input >= 0;
        }

        return input > 0;
    }
}
