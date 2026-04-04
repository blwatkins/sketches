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

import { Discriminator } from '../../discriminator/discriminator';
import { NumberValidator } from '../../number/number-validator';
import { StringValidator } from '../../string/string-validator';

import { Sketch } from '../sketch';

import { AspectRatioConfig } from './aspect-ratio-config';

/**
 * Defines the width-to-height ratio of a canvas or graphic.
 */
export class AspectRatio {
    /**
     * The name of the aspect ratio.
     *
     * @readonly
     * @private
     */
    readonly #name: string;

    /**
     * The width component of the aspect ratio.
     *
     * @readonly
     * @private
     */
    readonly #widthRatio: number;

    /**
     * The height component of the aspect ratio.
     *
     * @readonly
     * @private
     */
    readonly #heightRatio: number;

    /**
     *  Create an aspect ratio using the given target width and height.
     *
     * @param width {number} - The target width of the canvas or graphic. Minimum value is {@link Sketch.MIN_RESOLUTION}.
     * @param height {number} - The target height of the canvas or graphic. Minimum value is {@link Sketch.MIN_RESOLUTION}.
     * @param name {string} - Optional name to use.
     *
     * @throws {Error} - If the given width or height is not a positive finite number greater than or equal to {@link Sketch.MIN_RESOLUTION}.
     */
    constructor(width: number, height: number, name?: string);
    /**
     * Create an aspect ratio using the given {@link AspectRatioConfig}.
     *
     * @param config {AspectRatioConfig} - The {@link AspectRatioConfig} to use.
     *
     * @throws {Error} - If the given config does not properly implement the {@link AspectRatioConfig} type.
     */
    constructor(config: AspectRatioConfig);
    constructor(arg1: AspectRatioConfig | number, arg2?: number, arg3?: string) {
        if (Discriminator.isAspectRatioConfig(arg1)) {
            const config: AspectRatioConfig = arg1;
            this.#widthRatio = config.widthRatio;
            this.#heightRatio = config.heightRatio;
            this.#name = this.#buildName(config.name);
        } else if ((NumberValidator.isPositiveFiniteNumber(arg1) && arg1 >= Sketch.MIN_RESOLUTION)
            && (typeof arg2 === 'number' && NumberValidator.isPositiveFiniteNumber(arg2) && arg2 >= Sketch.MIN_RESOLUTION)) {
            const width: number = arg1;
            const height: number = arg2;
            const name: string | undefined = arg3;
            const minDim: number = Math.min(width, height);
            const widthRatioCalculated: number = width / minDim;
            const heightRatioCalculated: number = height / minDim;
            this.#widthRatio = parseFloat(widthRatioCalculated.toFixed(2));
            this.#heightRatio = parseFloat(heightRatioCalculated.toFixed(2));
            this.#name = this.#buildName(name);
        } else {
            let receivedArgs: string = typeof arg1;

            if (arg2 !== undefined) {
                receivedArgs += `, ${typeof arg2}`;
            }

            if (arg3 !== undefined) {
                receivedArgs += `, ${typeof arg3}`;
            }

            throw new Error(
                'Invalid arguments for AspectRatio constructor. '
                + `Expected: (config: AspectRatioConfig) or (width: number, height: number, name?: string) `
                + `where width and height are positive finite numbers >= ${Sketch.MIN_RESOLUTION}. `
                + `Received: (${receivedArgs}).`
            );
        }
    }

    /**
     * @returns {string} The name of the aspect ratio.
     */
    public get name(): string {
        return this.#name;
    }

    /**
     * @returns {number} The width component of the aspect ratio.
     */
    public get widthRatio(): number {
        return this.#widthRatio;
    }

    /**
     * @returns {number} The height component of the aspect ratio.
     */
    public get heightRatio(): number {
        return this.#heightRatio;
    }

    // TODO - resolution must be positive and finite
    /**
     * @param resolution {number} - The target resolution.
     * @param applyToLongSide {boolean} - When `true`, the long side of the canvas or graphic will be equal to the target resolution.
     * This means that the maximum width or height of the canvas or graphic will be equal to the target resolution.
     *
     * @returns {number} The width of the canvas or graphic given the target resolution.
     */
    public getWidth(resolution: number, applyToLongSide?: boolean): number {
        return Math.floor(this.#calculateUnit(resolution, applyToLongSide) * this.#widthRatio);
    }

    // TODO - resolution must be positive and finite
    /**
     * @param resolution {number} - The target resolution.
     * @param applyToLongSide {boolean} - When `true`, the long side of the canvas or graphic will be equal to the target resolution.
     * This means that the maximum width or height of the canvas or graphic will be equal to the target resolution.
     *
     * @returns {number} The height of the canvas or graphic given the target resolution.
     */
    public getHeight(resolution: number, applyToLongSide?: boolean): number {
        return Math.floor(this.#calculateUnit(resolution, applyToLongSide) * this.#heightRatio);
    }

    // TODO - resolution must be positive and finite
    /**
     * @param resolution {number} - The target resolution.
     * @param applyToLongSide {boolean} - When `true`, the long side of the canvas or graphic will be equal to the target resolution.
     * This means that the maximum width or height of the canvas or graphic will be equal to the target resolution.
     *
     * @returns {number} The base unit for the aspect ratio given the target resolution.
     *
     * @private
     */
    #calculateUnit(resolution: number, applyToLongSide?: boolean): number {
        if (resolution < 0) {
            return 0;
        }

        if (applyToLongSide) {
            return resolution / Math.max(this.#widthRatio, this.#heightRatio);
        }

        return resolution / Math.min(this.#widthRatio, this.#heightRatio);
    }

    /**
     * Builds the name of the aspect ratio.
     *
     * @param name {string} - Optional name to use.
     *
     * @returns {string} The given name or a name built from the width and height ratios.
     *
     * @private
     */
    #buildName(name?: string): string {
        if (name && StringValidator.isNonEmptyString(name)) {
            return name.trim().toLowerCase();
        }

        return `${this.#widthRatio}:${this.#heightRatio}`;
    }
}
