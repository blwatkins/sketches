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

import p5 from 'p5';

import { AspectRatio } from '../aspect-ratio';

import { GraphicsContextConfig } from './graphics-context-config';

/**
 * Wrapper for a single p5.js graphics context.
 * p5.Graphics objects created with this class will always have a p5.P2D renderer.
 * For p5.Graphics with WebGL renderers, see {@link WebGLGraphicsContext}.
 */
export class GraphicsContext {
    static #counter: number = 0;

    readonly #graphics: p5.Graphics;
    readonly #p5Ctx: p5;

    protected constructor(p5Ctx: p5, graphics: p5.Graphics) {
        this.#graphics = graphics;
        this.#p5Ctx = p5Ctx;
    }

    public static buildGraphics(config: GraphicsContextConfig): p5.Graphics {
        const aspectRatio = new AspectRatio(config.aspectRatioConfig);
        const width: number = aspectRatio.getWidth(config.resolution, config.resolutionIsLongSide);
        const height: number = aspectRatio.getHeight(config.resolution, config.resolutionIsLongSide);
        const graphics: p5.Graphics = GraphicsContext.buildGraphicsContext(config.p5Ctx, width, height);
        graphics.id(config.name ?? GraphicsContext.#buildName());
        return graphics;
    }

    protected static buildGraphicsContext(p5Ctx: p5, width: number, height: number): p5.Graphics {
        return p5Ctx.createGraphics(width, height, p5Ctx.P2D);
    }

    public get graphics(): p5.Graphics {
        return this.#graphics;
    }

    public get width(): number {
        return this.#graphics.width;
    }

    public get height(): number {
        return this.#graphics.height;
    }

    public get minX(): number {
        return 0;
    }

    public get minY(): number {
        return 0;
    }

    public get maxX(): number {
        return this.width;
    }

    public get maxY(): number {
        return this.height;
    }

    public get centerX(): number  {
        return this.width / 2.0;
    }

    public get centerY(): number  {
        return this.height / 2.0;
    }

    public mapCoordinateToRatioY(coordinateY: number): number {
        return this.#p5Ctx.map(coordinateY, this.minY, this.maxY, 0, 1);
    }

    public mapCoordinateToRatioX(coordinateX: number): number {
        return this.#p5Ctx.map(coordinateX, this.minX, this.maxX, 0, 1);
    }

    public mapCoordinateToRatio(coordinateVector: p5.Vector): p5.Vector {
        const coordinateX: number = this.mapCoordinateToRatioX(coordinateVector.x);
        const coordinateY: number = this.mapCoordinateToRatioY(coordinateVector.y);
        return this.#p5Ctx.createVector(coordinateX, coordinateY);
    }

    public mapRatioToCoordinateX(ratioX: number): number {
        return this.#p5Ctx.map(ratioX, 0, 1, this.minX, this.maxX);
    }

    public mapRatioToCoordinateY(ratioY: number): number {
        return this.#p5Ctx.map(ratioY, 0, 1, this.minY, this.maxY);
    }

    public mapRatioToCoordinate(ratioVector: p5.Vector): p5.Vector {
        const coordinateX: number = this.mapRatioToCoordinateX(ratioVector.x);
        const coordinateY: number = this.mapRatioToCoordinateY(ratioVector.y);
        return this.#p5Ctx.createVector(coordinateX, coordinateY);
    }

    static get #count(): number {
        return GraphicsContext.#counter++;
    }

    static get #countString(): string {
        return GraphicsContext.#count.toString().padStart(3, '0');
    }

    static #buildName(): string {
        return `graphics-${GraphicsContext.#countString}`;
    }
}
