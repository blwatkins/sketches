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

// noinspection JSPrimitiveTypeWrapperUsage
export const nonStringInputs: unknown[] = [
    null,
    undefined,
    0,
    -1,
    Number.NaN,
    Infinity,
    true,
    false,
    {},
    { key: 'value' },
    [],
    ['value'],
    (): string => 'value',
    new String('value'),
    10n
];

export const emptyStringInputs: string[] = [
    '',
    ' ',
    '     ',
    '\n',
    '\t',
    '\n\t',
    ' \n\t '
];

export const untrimmedInputs: string[] = [
    '  trimmed value  ',
    ' \n\ttrimmed value\t\n ',
    '     multi-space     trimmed     value     ',
    '\nmultiline\ntrimmed\nvalue\n',
    '\tmulti-tab\ttrimmed\tvalue\t'
];

export const multilineTrimmedInputs: string[] = [
    'UPPERCASE\nMULTILINE\nVALUE',
    'lowercase\nmultiline\nvalue',
    'MixedCase\nMultiline\nValue',
    'UPPERCASE\n\nMULTILINE\n\nVALUE',
    'lowercase\n\nmultiline\n\nvalue',
    'MixedCase\n\nMultiline\n\nValue'
];

export const multiTabTrimmedInputs: string[] = [
    'UPPERCASE\tMULTI-TAB\tVALUE',
    'lowercase\tmulti-tab\tvalue',
    'MixedCase\tMulti-Tab\tValue',
    'UPPERCASE\t\tMULTI-TAB\t\tVALUE',
    'lowercase\t\tmulti-tab\t\tvalue',
    'MixedCase\t\tMulti-Tab\t\tValue'
]

export const singleLineMixedCaseTrimmedInputs: string[] = [
    'Single Line Mixed Case Input',
    'Single     Line     Mixed     Case     Input',
    '(Single.Line-Mixed$Case^Input!)'
];

export const singleLineUpperCaseTrimmedInputs: string[] = [
    'SINGLE LINE UPPERCASE INPUT',
    'SINGLE      LINE      UPPERCASE      INPUT',
    '(SINGLE.LINE-UPPERCASE$INPUT!)'
];

export const singleLineLowercaseTrimmedInputs: string[] = [
    'single line lowercase input',
    'single      line      lowercase      input',
    '(single.line-lowercase$input!)'
];

export const nonEmptyStringInputs: string[] = [
    'value',
    'a',
    '0',
    ' false ',
    '#A1B2C3',
    '#A1B2C3D',
    '#a1b2c3d4',
    ...untrimmedInputs,
    ...multiTabTrimmedInputs,
    ...multilineTrimmedInputs,
    ...singleLineMixedCaseTrimmedInputs,
    ...singleLineUpperCaseTrimmedInputs,
    ...singleLineLowercaseTrimmedInputs
];
