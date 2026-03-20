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

import {AspectRatio, AspectRatioConfig} from "../aspect_ratio";

import {SketchTile} from "./sketch-tile";
import {SketchTileFactory} from "./sketch-tile-factory";

export interface SketchGridConfig {
    ASPECT_RATIO_CONFIG: AspectRatioConfig;
    GRID_RESOLUTION: number;
    TILE_RESOLUTION: number;
    APPLY_RESOLUTION_TO_LONG_SIDE: boolean;
    ROWS: number;
    COLUMNS: number;
    SKETCH_TILE_FACTORY: SketchTileFactory;
    P5_CTX: p5;
}

export class SketchGrid {
    #grid: SketchTile[][] = [];
    #graphics: p5.Graphics;

    #ROWS: number;
    #COLUMNS: number;

    #CELL_WIDTH: number;
    #CELL_HEIGHT: number;

    constructor(config: SketchGridConfig) {
        const p5Ctx: p5 = config.P5_CTX;
        const aspectRatio = new AspectRatio(config.ASPECT_RATIO_CONFIG);

        const tileWidth = aspectRatio.getWidth(config.TILE_RESOLUTION, config.APPLY_RESOLUTION_TO_LONG_SIDE);
        const tileHeight: number = aspectRatio.getHeight(config.TILE_RESOLUTION, config.APPLY_RESOLUTION_TO_LONG_SIDE);

        const graphicsWidth = aspectRatio.getWidth(config.GRID_RESOLUTION, config.APPLY_RESOLUTION_TO_LONG_SIDE);
        const graphicsHeight = aspectRatio.getHeight(config.GRID_RESOLUTION, config.APPLY_RESOLUTION_TO_LONG_SIDE);
        this.#graphics = p5Ctx.createGraphics(graphicsWidth, graphicsHeight, p5Ctx.P2D);

        this.#ROWS = config.ROWS;
        this.#COLUMNS = config.COLUMNS;

        this.#CELL_WIDTH = graphicsWidth / this.#COLUMNS;
        this.#CELL_HEIGHT = graphicsHeight / this.#ROWS;

        for (let i = 0; i < config.ROWS; i++) {
            this.#grid.push([]);

            for (let j = 0; j < config.COLUMNS; j++) {
                const graphics: p5.Graphics = p5Ctx.createGraphics(tileWidth, tileHeight, p5Ctx.P2D);
                this.#grid[i].push(config.SKETCH_TILE_FACTORY.buildSketchTile(graphics));
            }
        }
    }

    public get graphics(): p5.Graphics {
        return this.#graphics;
    }

    public draw(): void {
        this.#drawToGraphics(this.#graphics);
    }

    #drawToGraphics(graphics: p5.Graphics) {
        for (let row = 0; row < this.#ROWS; row++) {
            for (let col = 0; col < this.#COLUMNS; col++) {
                const x = col * this.#CELL_WIDTH;
                const y = row * this.#CELL_HEIGHT;
                this.#grid.at(row)?.at(col)?.draw();
                const gridGraphics: p5.Graphics | undefined = this.#grid.at(row)?.at(col)?.graphics;

                if (gridGraphics) {
                    graphics.image(gridGraphics, x, y, this.#CELL_WIDTH, this.#CELL_HEIGHT);
                }
            }
        }
    }
}
