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

import { type Discriminable } from '../../discriminator/discriminable';
import { Discriminators } from '../../discriminator/discriminators';

import { type AspectRatio } from './aspect-ratio';

/**
 * Zod schema for validating that an object implements the {@link AspectRatioConfig} type.
 *
 * @see {@link Discriminable}
 */
export const ASPECT_RATIO_CONFIG_SCHEMA = z.strictObject({
    /**
     * The name of the aspect ratio.
     * Must be a non-empty string in lowercase when provided.
     * Non-empty strings must contain at least one non-whitespace character.
     * This property is optional.
     *
     * @readonly
     */
    NAME: z.string().trim().lowercase().nonempty().readonly().optional(),

    /**
     * The width component of the aspect ratio.
     * Must be greater than or equal to 1.
     *
     * @readonly
     */
    WIDTH_RATIO: z.number().gte(1).readonly(),

    /**
     * The height component of the aspect ratio.
     * Must be greater than or equal to 1.
     *
     * @readonly
     */
    HEIGHT_RATIO: z.number().gte(1).readonly(),

    /**
     * Discriminator value for the {@link AspectRatioConfig} interface.
     *
     * @see {@link Discriminable}
     * @see {@link Discriminators.ASPECT_RATIO_CONFIG}
     *
     * @readonly
     */
    DISCRIMINATOR: z.enum(Object.values(Discriminators)).extract([Discriminators.ASPECT_RATIO_CONFIG]).readonly()
});

/**
 * A configuration for an {@link AspectRatio} object.
 *
 * @see {@link Discriminable}
 * @see {@link ASPECT_RATIO_CONFIG_SCHEMA}
 */
export type AspectRatioConfig = z.infer<typeof ASPECT_RATIO_CONFIG_SCHEMA>;
