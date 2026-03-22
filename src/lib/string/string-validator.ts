/*
 * Copyright (c) 2024-2026 Brittni Watkins.
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

const REGULAR_EXPRESSIONS = {
    HEX_COLOR_PATTERN: /^(#[A-F0-9]{6}(?:[A-F0-9]{2})?|#[a-f0-9]{6}(?:[a-f0-9]{2})?)$/,
    HEX_COLOR_PATTERN_RGB: /^(#[A-F0-9]{6}|#[a-f0-9]{6})$/,
    HEX_COLOR_PATTERN_RGBA: /^(#[A-F0-9]{8}|#[a-f0-9]{8})$/
};

/**
 * Static methods for validating string types.
 */
export class StringValidator {
    /**
     * @throws {Error} - StringValidator is a static class and cannot be instantiated.
     */
    private constructor() {
        throw new Error('StringValidator is a static class and cannot be instantiated.');
    }

    /**
     * Regular expression pattern for validating hex color strings in the formats `#RRGGBB` and `#RRGGBBAA`.
     * Case must be consistent in hex color strings: either all lowercase or all uppercase.
     */
    public static get HEX_COLOR_PATTERN(): RegExp {
        return REGULAR_EXPRESSIONS.HEX_COLOR_PATTERN;
    }

    /**
     * Regular expression pattern for validating hex color strings in the format `#RRGGBB`.
     * Case must be consistent in hex color strings: either all lowercase or all uppercase.
     */
    public static get HEX_COLOR_PATTERN_RGB(): RegExp {
        return REGULAR_EXPRESSIONS.HEX_COLOR_PATTERN_RGB;
    }

    /**
     * Regular expression pattern for validating hex color strings in the format `#RRGGBBAA`.
     * Case must be consistent in hex color strings: either all lowercase or all uppercase.
     */
    public static get HEX_COLOR_PATTERN_RGBA(): RegExp {
        return REGULAR_EXPRESSIONS.HEX_COLOR_PATTERN_RGBA;
    }

    // TODO - unit tests
    /**
     * Is the given input a non-empty string?
     *
     * @param input - The input to be tested.
     *
     * @returns {boolean} `true` if the given input is a non-empty string, `false` otherwise.
     */
    public static isNonEmptyString(input: unknown): boolean {
        return (typeof input === 'string') && (input.trim().length > 0);
    }
}
