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

import * as z from 'zod';

import { type Discriminable } from '../discriminator/discriminable';
import { Discriminators } from '../discriminator/discriminators';
import { type Palette } from '../palette/palette';
import { StringValidator } from '../string/string-validator';

/**
 * Zod schema for validating that an object implements the {@link PaletteColor} type.
 *
 * @see {@link Discriminable}
 */
export const PALETTE_COLOR_SCHEMA = z.strictObject({
    /**
     * The hex string representation of the color (format: `#RRGGBB`).
     * Must match the regular expression defined in {@link StringValidator.HEX_COLOR_PATTERN_RGB}.
     * Case must be consistent in hex color strings: either all lowercase or all uppercase.
     *
     * @readonly
     */
    HEX: z.hex().regex(StringValidator.HEX_COLOR_PATTERN_RGB).readonly(),

    /**
     * The name of the color.
     * Must be a non-empty string in lowercase.
     * Non-empty strings must contain at least one non-whitespace character.
     *
     * @readonly
     */
    NAME: z.string().trim().lowercase().nonempty().readonly(),

    /**
     * The luminance of the color (0-1).
     * This property is optional.
     *
     * @readonly
     */
    LUMINANCE: z.number().gte(0).lte(1).readonly().optional(),

    /**
     * The RGB (red, green, blue) components of the color.
     * This property is optional.
     *
     * @readonly
     */
    RGB: z.strictObject({
        /**
         * The red component.
         * Must be an integer between 0 and 255.
         *
         * @readonly
         */
        R: z.number().int().gte(0).lte(255).readonly(),

        /**
         * The green component.
         * Must be an integer between 0 and 255.
         *
         * @readonly
         */
        G: z.number().int().gte(0).lte(255).readonly(),

        /**
         * The blue component.
         * Must be an integer between 0 and 255.
         *
         * @readonly
         */
        B: z.number().int().gte(0).lte(255).readonly()
    }).readonly().optional(),

    /**
     * The HSL (hue, saturation, lightness) components of the color.
     * This property is optional.
     *
     * @readonly
     */
    HSL: z.strictObject({
        /**
         * The hue component.
         * Must be an integer between 0 and 360.
         *
         * @readonly
         */
        H: z.number().int().gte(0).lte(360).readonly(),

        /**
         * The saturation component.
         * Must be an integer between 0 and 100.
         *
         * @readonly
         */
        S: z.number().int().gte(0).lte(100).readonly(),

        /**
         * The lightness component.
         * Must be an integer between 0 and 100.
         *
         * @readonly
         */
        L: z.number().int().gte(0).lte(100).readonly()
    }).readonly().optional(),

    /**
     * Discriminator value for the {@link PaletteColor} interface.
     *
     * @see {@link Discriminable}
     * @see {@link Discriminators.PALETTE_COLOR}
     *
     * @readonly
     */
    DISCRIMINATOR: z.enum(Object.values(Discriminators)).extract([Discriminators.PALETTE_COLOR]).readonly()
});

/**
 * A color to be used in a {@link Palette}.
 *
 * @see {@link Discriminable}
 * @see {@link PALETTE_COLOR_SCHEMA}
 */
export type PaletteColor = z.infer<typeof PALETTE_COLOR_SCHEMA>;
