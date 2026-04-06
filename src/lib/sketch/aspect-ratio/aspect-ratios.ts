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

import { Discriminators } from '../../discriminator/discriminators';

import { AspectRatioConfig } from './aspect-ratio-config';

/**
 * Valid keys for the {@link aspectRatios} record.
 * Each key corresponds to a pre-saved {@link AspectRatioConfig} object.
 */
export enum AspectRatioKey {
    /**
     * The standard aspect ratio of an Instagram photo.
     */
    INSTAGRAM_PHOTO = 'instagram_photo',

    /**
     * The standard aspect ratio of a Pinterest pin.
     */
    PINTEREST_PIN = 'pinterest_pin',

    /**
     * The standard aspect ratio of a social media video (e.g. TikTok, Instagram Reels, YouTube Shorts).
     */
    SOCIAL_VIDEO = 'social_video',

    /**
     * Square (1:1) aspect ratio.
     */
    SQUARE = 'square',

    /**
     * The aspect ratio for a photo post in TikTok.
     */
    TIKTOK_PHOTO = 'tiktok_photo',

    /**
     * The ratio for a 21:9 ultrawide movie.
     */
    ULTRAWIDE = 'ultrawide',

    /**
     * The ratio for a 16:9 widescreen movie.
     */
    WIDESCREEN = 'widescreen'
}

/**
 * Pre-set {@link AspectRatioConfig} objects for easy access.
 */
export const aspectRatios: Record<AspectRatioKey, AspectRatioConfig> = {
    [AspectRatioKey.INSTAGRAM_PHOTO]: {
        name: '4:5',
        widthRatio: 4,
        heightRatio: 5,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    },
    [AspectRatioKey.PINTEREST_PIN]: {
        name: '2:3',
        widthRatio: 2,
        heightRatio: 3,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    },
    [AspectRatioKey.SOCIAL_VIDEO]: {
        name: '9:16',
        widthRatio: 9,
        heightRatio: 16,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    },
    [AspectRatioKey.SQUARE]: {
        name: 'square',
        widthRatio: 1,
        heightRatio: 1,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    },
    [AspectRatioKey.TIKTOK_PHOTO]: {
        name: '3:4',
        widthRatio: 3,
        heightRatio: 4,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    },
    [AspectRatioKey.ULTRAWIDE]: {
        name: 'ultrawide (21:9)',
        widthRatio: 64,
        heightRatio: 27,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    },
    [AspectRatioKey.WIDESCREEN]: {
        name: 'widescreen (16:9)',
        widthRatio: 16,
        heightRatio: 9,
        discriminator: Discriminators.ASPECT_RATIO_CONFIG
    }
};
