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

import p5 from 'p5';

import { AspectRatioConfig } from '../aspect-ratio';

/**
 * Configuration options for {@link GraphicsContext} and {@link GraphicsContext.buildGraphics}.
 */
export interface GraphicsContextConfig {
    /**
     * The name of the {@link GraphicsContext}.
     * This property is optional.
     */
    readonly name?: string;

    /**
     * The {@link AspectRatioConfig} for the {@link GraphicsContext}.
     * This is used with {@link resolution} to determine the dimensions of the graphics context.
     *
     * @readonly
     */
    readonly aspectRatioConfig: AspectRatioConfig;

    /**
     * The resolution for the {@link GraphicsContext}.
     * This is used with {@link aspectRatioConfig} to determine the dimensions of the graphics context.
     *
     * @readonly
     */
    readonly resolution: number;

    /**
     * Should the resolution be equal to the long side of the {@link GraphicsContext}?
     * This property is optional.
     * When `true`, the long side of the graphic context will be equal to the target resolution.
     * This means that the maximum width or height of the context will be equal to the target resolution.
     *
     * @readonly
     */
    readonly resolutionIsLongSide?: boolean;

    /**
     * The current p5.js context.
     *
     * @readonly
     */
    readonly p5Ctx: p5;
}
