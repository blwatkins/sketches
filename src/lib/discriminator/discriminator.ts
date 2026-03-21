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

import { Palette } from '../palette/palette';
import { PaletteColor } from '../palette-color';
import { AspectRatioConfig, ASPECT_RATIO_CONFIG_SCHEMA } from '../sketch';

import { Discriminable } from './discriminable';
import { Discriminators } from './discriminators';

/**
 * Static class methods for evaluating if objects implement various interfaces for type safety.
 */
export class Discriminator {
    /**
     * @throws {Error} - Discriminator is a static class and cannot be instantiated.
     */
    public constructor() {
        throw new Error('Discriminator is a static class and cannot be instantiated.');
    }

    /**
     * Does the given input implement the {@link AspectRatioConfig} interface?
     *
     * @param input {unknown} - The input to check.
     *
     * @returns {input is AspectRatioConfig} `true` if the given input implements the {@link AspectRatioConfig} interface, `false` if it does not.
     */
    public static isAspectRatioConfig(input: unknown): input is AspectRatioConfig {
        return (Discriminator.#hasDiscriminatorMatch(input, Discriminators.ASPECT_RATIO_CONFIG) && Discriminator.#hasZodMach(input as Discriminable, ASPECT_RATIO_CONFIG_SCHEMA));
    }

    /**
     * Does the given input implement the {@link Palette} interface?
     *
     * @param input {unknown} - The input to check.
     *
     * @returns {input is Palette} `true` if the given input implements the {@link Palette} interface, `false` if it does not.
     */
    public static isPalette(input: unknown): input is Palette {
        return Discriminator.#hasDiscriminatorMatch(input, Discriminators.PALETTE);
    }

    /**
     * Does the given input implement the {@link PaletteColor} interface?
     *
     * @param input {unknown} - The input to check.
     *
     * @returns {input is PaletteColor} `true` if the given input implements the {@link PaletteColor} interface, `false` if it does not.
     */
    public static isPaletteColor(input: unknown): input is PaletteColor {
        return Discriminator.#hasDiscriminatorMatch(input, Discriminators.PALETTE_COLOR);
    }

    /**
     * Does the given input implement the {@link Discriminable} interface, and does the input's {@link Discriminable.DISCRIMINATOR} value match the given discriminator?
     *
     * @param input {unknown} - The input to check.
     * @param discriminator {Discriminators} - The discriminator value to check against.
     *
     * @returns {boolean} `true` if the input implements {@link Discriminable} and has a matching discriminator value, `false` otherwise.
     *
     * @private
     */
    static #hasDiscriminatorMatch(input: unknown, discriminator: Discriminators): boolean {
        if (input && typeof input === 'object') {
            return (input as Discriminable).DISCRIMINATOR === discriminator;
        }

        return false;
    }

    /**
     * Does the given input match the given Zod schema?
     *
     * @param input {unknown} - The input to check.
     * @param schema {z.ZodObject} - The Zod schema to check against.
     *
     * @returns {boolean} `true` if the input matches the given Zod schema, `false` otherwise.
     *
     * @private
     */
    static #hasZodMach(input: Discriminable, schema: z.ZodObject): boolean {
        const result = schema.safeParse(input);
        return result.success;
    }
}
