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

import { Discriminable } from '../discriminator/discriminable';
import { Discriminators } from '../discriminator/discriminators';

import { type Palette } from '../palette/palette';

/**
 * A color to be used in a {@link Palette}.
 */
export interface PaletteColor extends Discriminable {
    /**
     * The hex string representation of the color (format: `#RRGGBB`).
     *
     * @readonly
     */
    readonly HEX: string;

    /**
     * The name of the color.
     *
     * @readonly
     */
    readonly NAME: string;

    /**
     * The luminance of the color (0-1).
     *
     * @readonly
     */
    readonly LUMINANCE?: number;

    /**
     * The RGB (red, green, blue) components of the color.
     *
     * @readonly
     */
    readonly RGB?: {
        /**
         * The red component (0-255).
         *
         * @readonly
         */
        readonly R: number;

        /**
         * The green component (0-255).
         *
         * @readonly
         */
        readonly G: number;

        /**
         * The blue component (0-255).
         *
         * @readonly
         */
        readonly B: number;
    };

    /**
     * The HSL (hue, saturation, lightness) components of the color.
     *
     * @readonly
     */
    readonly HSL?: {
        /**
         * The hue component (0-360).
         *
         * @readonly
         */
        readonly H: number;

        /**
         * The saturation component (0-100).
         *
         * @readonly
         */
        readonly S: number;

        /**
         * The lightness component (0-100).
         *
         * @readonly
         */
        readonly L: number;
    };

    /**
     * @inheritDoc
     */
    readonly DISCRIMINATOR: Discriminators.PALETTE_COLOR;
}
