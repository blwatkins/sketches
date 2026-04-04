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

import { GraphicsContext } from './graphics-context';

export class WebGLGraphicsContext extends GraphicsContext {
    protected static override buildGraphicsContext(p5Ctx: p5, width: number, height: number): p5.Graphics {
        return p5Ctx.createGraphics(width, height, p5Ctx.WEBGL);
    }

    public override get minX(): number {
        return -(this.width / 2.0);
    }

    public override get minY(): number {
        return -(this.height / 2.0);
    }

    public override get maxX(): number {
        return (this.width / 2.0);
    }

    public override get maxY(): number {
        return (this.height / 2.0);
    }

    public override get centerX(): number {
        return 0;
    }

    public override get centerY(): number {
        return 0;
    }
}
