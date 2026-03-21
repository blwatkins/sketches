/*
 * Copyright (c) 2025-2026 Brittni Watkins.
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

import { Discriminable } from '../../discriminator/discriminable';
import { Discriminators } from "../../discriminator/discriminators";

// import { AspectRatio } from './aspect-ratio';

/**
 * Zod schema for validating that an object implements the {@link AspectRatioConfig} interface.
 *
 * @category Aspect Ratio
 */
export const ASPECT_RATIO_CONFIG_SCHEMA = z.strictObject({
    NAME: z.string().readonly().optional(),
    WIDTH_RATIO: z.number().gte(1).readonly(),
    HEIGHT_RATIO: z.number().gte(1).readonly(),
    DISCRIMINATOR: z.enum(Object.values(Discriminators)).extract([Discriminators.ASPECT_RATIO_CONFIG]).readonly(),
});

export type AspectRatioConfig = z.infer<typeof ASPECT_RATIO_CONFIG_SCHEMA> & Discriminable;

// /**
//  * A configuration for an {@link AspectRatio} object.
//  *
//  * @category Aspect Ratio
//  */
// export interface AspectRatioConfig extends Discriminable {
//     /**
//      * The name of the aspect ratio.
//      *
//      * @readonly
//      */
//     readonly NAME?: string;
//
//     /**
//      * The width component of the aspect ratio.
//      *
//      * @readonly
//      */
//     readonly WIDTH_RATIO: number;
//
//     /**
//      * The height component of the aspect ratio.
//      *
//      * @readonly
//      */
//     readonly HEIGHT_RATIO: number;
//
//     /**
//      * @inheritDoc
//      */
//     readonly DISCRIMINATOR: Discriminators.ASPECT_RATIO_CONFIG;
// }
