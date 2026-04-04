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

import { Type, type Static } from 'typebox';

import { type Discriminable } from '../../discriminator/discriminable';
import { Discriminators } from '../../discriminator/discriminators';

import { type AspectRatio } from './aspect-ratio';

// TODO - update property case in schema, Discriminable, and Unit Tests
/**
 * TypeBox schema for validating that an object implements the {@link AspectRatioConfig} type.
 *
 * @see {@link Discriminable}
 */
export const AspectRatioConfigSchema = Type.Object(
    {
        /**
         * The name of the aspect ratio.
         * This property is optional.
         *
         * @readonly
         */
        NAME: Type.Optional(
            Type.Readonly(
                Type.String({
                    minLength: 1
                })
            )
        ),

        /**
         * The width component of the aspect ratio.
         * Must be greater than or equal to 1.
         *
         * @readonly
         */
        WIDTH_RATIO: Type.Readonly(
            Type.Number({
                minimum: 1
            })
        ),

        /**
         * The height component of the aspect ratio.
         * Must be greater than or equal to 1.
         *
         * @readonly
         */
        HEIGHT_RATIO: Type.Readonly(
            Type.Number({
                minimum: 1
            })
        ),

        /**
         * Discriminator value for the {@link AspectRatioConfig} interface.
         *
         * @see {@link Discriminable}
         * @see {@link Discriminators.ASPECT_RATIO_CONFIG}
         *
         * @readonly
         */
        DISCRIMINATOR: Type.Readonly(
            Type.Literal(Discriminators.ASPECT_RATIO_CONFIG)
        )
    },
    { additionalProperties: false }
);

/**
 * A configuration for an {@link AspectRatio} object.
 *
 * @see {@link Discriminable}
 * @see {@link AspectRatioConfigSchema}
 */
export type AspectRatioConfig = Static<typeof AspectRatioConfigSchema>;
