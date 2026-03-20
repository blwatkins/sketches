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

import {Discriminators, Sketch} from '../../../lib';
import {SketchGrid} from "../../../lib/sketch/sketch-grid/sketch-grid";
import {SketchTileFactory} from "../../../lib/sketch/sketch-grid/sketch-tile-factory";
import {SketchTile} from "../../../lib/sketch/sketch-grid/sketch-tile";

class SketchGridSketchTile extends SketchTile {
    #r;
    #g;
    #b;

    constructor(graphics: p5.Graphics) {
        super(graphics);
        this.#r = Math.floor(Math.random() * 255);
        this.#g = Math.floor(Math.random() * 255);
        this.#b = Math.floor(Math.random() * 255);
    }

    protected override drawToGraphics(graphics: p5.Graphics): void {
        graphics.background(this.#r, this.#g, this.#b);
        graphics.stroke(0);
        graphics.strokeWeight(5);
        graphics.noFill();
        graphics.ellipse(graphics.width / 2.0, graphics.height / 2.0, 50, 50);
        graphics.ellipse(10, 10, 10, 10);
    }
}

class TestFactory extends SketchTileFactory {
    public override buildSketchTile(graphics: p5.Graphics): SketchTile {
        return new SketchGridSketchTile(graphics);
    }
}

export class SketchGridSketch extends Sketch {
    public main(ctx: p5): void {
        let sketchGrid: SketchGrid;

        ctx.setup = (): void => {
            ctx.createCanvas(720, 720);
            sketchGrid = new SketchGrid({
                ASPECT_RATIO_CONFIG: {
                    WIDTH_RATIO: 4,
                    HEIGHT_RATIO: 5,
                    DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG
                },
                GRID_RESOLUTION: 720,
                TILE_RESOLUTION: 720,
                APPLY_RESOLUTION_TO_LONG_SIDE: true,
                ROWS: 3,
                COLUMNS: 3,
                P5_CTX: ctx,
                SKETCH_TILE_FACTORY: new TestFactory()
            });
        };

        ctx.draw = (): void => {
            sketchGrid.draw();
            const graphics = sketchGrid.graphics;
            ctx.image(graphics, 0, 0, ctx.width, ctx.height);
        };
    }
}
