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

import Schema from 'typebox/schema';

import * as z from 'zod';

import { TIntersect, TObject } from 'typebox';

import { PALETTE_SCHEMA, type Palette } from '../palette/palette';
import { PALETTE_COLOR_SCHEMA, type PaletteColor } from '../palette-color/palette-color';
import { AspectRatioConfigSchema, type AspectRatioConfig } from '../sketch/aspect-ratio';
import { type Discriminable } from './discriminable';
import { Discriminators } from './discriminators';

/**
 * Static methods for evaluating if objects implement various interfaces and types for type safety.
 */
export class Discriminator {
    // noinspection JSUnusedLocalSymbols
    /**
     * @throws {Error} - Discriminator is a static class and cannot be instantiated.
     */
    private constructor() {
        throw new Error('Discriminator is a static class and cannot be instantiated.');
    }

    /**
     * Does the given input implement the {@link AspectRatioConfig} type?
     *
     * @param input - The input to check.
     *
     * @returns {input is AspectRatioConfig} `true` if the given input implements the {@link AspectRatioConfig} type, `false` if it does not.
     */
    public static isAspectRatioConfig(input: unknown): input is AspectRatioConfig {
        return (Discriminator.#hasDiscriminatorMatch(input, Discriminators.ASPECT_RATIO_CONFIG)
            && Discriminator.#hasTypeBoxMatch(input, AspectRatioConfigSchema));
    }

    /**
     * Does the given input implement the {@link Palette} type?
     *
     * @param input - The input to check.
     *
     * @returns {input is Palette} `true` if the given input implements the {@link Palette} type, `false` if it does not.
     */
    public static isPalette(input: unknown): input is Palette {
        return (Discriminator.#hasDiscriminatorMatch(input, Discriminators.PALETTE)
            && Discriminator.#hasZodMatch(input, PALETTE_SCHEMA));
    }

    /**
     * Does the given input implement the {@link PaletteColor} type?
     *
     * @param input - The input to check.
     *
     * @returns {input is PaletteColor} `true` if the given input implements the {@link PaletteColor} type, `false` if it does not.
     */
    public static isPaletteColor(input: unknown): input is PaletteColor {
        return Discriminator.#hasDiscriminatorMatch(input, Discriminators.PALETTE_COLOR)
            && Discriminator.#hasZodMatch(input, PALETTE_COLOR_SCHEMA);
    }

    /**
     * Does the given input implement the {@link Discriminable} type, and does the input's {@link Discriminable.discriminator} value match the given discriminator?
     *
     * @param input - The input to check.
     * @param discriminator - The discriminator value to check against.
     *
     * @returns {boolean} `true` if the input implements {@link Discriminable} and has a matching discriminator value, `false` otherwise.
     *
     * @private
     */
    static #hasDiscriminatorMatch(input: unknown, discriminator: Discriminators): boolean {
        if (input && typeof input === 'object') {
            return (input as Discriminable).discriminator === discriminator;
        }

        return false;
    }

    /**
     * Does the given input match the given Zod schema?
     *
     * @param input - The input to check.
     * @param schema - The Zod schema to check against.
     *
     * @returns {boolean} `true` if the input matches the given Zod schema, `false` otherwise.
     *
     * @private
     */
    static #hasZodMatch(input: unknown, schema: z.ZodObject): boolean {
        const result = schema.safeParse(input);
        return result.success;
    }

    /**
     * Does the given input match the given TypeBox schema?
     *
     * @param input - The input to check.
     * @param schema - The TypeBox schema to check against.
     *
     * @returns {boolean} `true` if the input matches the given TypeBox schema, `false` otherwise.
     *
     * @private
     */
    static #hasTypeBoxMatch(input: unknown, schema: TObject | TIntersect): boolean {
        return Schema.Check(schema, input);
    }
}
