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
import { type PaletteColor, PALETTE_COLOR_SCHEMA } from '../palette-color/palette-color';
import { StringValidator } from '../string/string-validator';

/**
 * Zod schema for validating that an object implements the {@link Palette} type.
 *
 * @see {@link Discriminable}
 */
export const PALETTE_SCHEMA = z.strictObject({
    /**
     * The name of the palette.
     * Must be a non-empty string in lowercase.
     * Non-empty strings must contain at least one non-whitespace character.
     *
     * @readonly
     */
    NAME: z.string().trim().lowercase().nonempty().readonly(),

    /**
     * The source of the palette.
     * Must be a non-empty string when provided.
     * Non-empty strings must contain at least one non-whitespace character.
     * This property is optional.
     *
     * @readonly
     */
    SOURCE: z.string().trim().nonempty().readonly().optional(),

    /**
     * The source URL of the palette.
     * Must be a URL when provided.
     * This property is optional.
     *
     * @readonly
     */
    SOURCE_URL: z.url().trim().readonly().optional(),

    /**
     * A flag indicating if the palette is a gradient.
     *
     * @readonly
     */
    IS_GRADIENT: z.boolean().readonly(),

    /**
     * The list of {@link PaletteColor} objects that compose the palette.
     * Palettes must contain at least two colors.
     *
     * @readonly
     */
    COLORS: z.array(PALETTE_COLOR_SCHEMA).min(2).readonly(),

    /**
     * A map of hex color strings to arrays of hex colors,
     * where each color in the array passes the WCAG AA standard
     * with normal and large size text when compared to the key.<br/>
     * The only colors listed in this map should be the colors of the
     * palette, black (#000000), and white (#FFFFFF).
     * This property is optional.
     *
     * @readonly
     */
    CONTRAST_MAP: z.record(
        z.string().regex(StringValidator.HEX_COLOR_PATTERN_RGB),
        z.array(z.string().regex(StringValidator.HEX_COLOR_PATTERN_RGB)).readonly()
    ).readonly().optional(),

    /**
     * Discriminator value for the {@link Palette} type.
     *
     * @see {@link Discriminable}
     * @see {@link Discriminators.PALETTE}
     *
     * @readonly
     */
    DISCRIMINATOR: z.enum(Object.values(Discriminators)).extract([Discriminators.PALETTE]).readonly()
});

/**
 * A collection of {@link PaletteColor} objects.
 *
 * @see {@link Discriminable}
 * @see {@link PALETTE_SCHEMA}
 */
export type Palette = z.infer<typeof PALETTE_SCHEMA>;
