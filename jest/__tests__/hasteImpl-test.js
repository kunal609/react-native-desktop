/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+js_foundation
 */

'use strict';

const path = require('path');

const {getHasteName} = require('../hasteImpl');

function getPath(...parts) {
  return path.join(__dirname, '..', '..', ...parts);
}

it('returns the correct haste name for a RN library file', () => {
  expect(
    getHasteName(
      getPath(
        'Libraries',
        'Components',
        'AccessibilityInfo',
        'AccessibilityInfo.js',
      ),
    ),
  ).toEqual('AccessibilityInfo');
});

it('returns the correct haste name for a file with a platform suffix', () => {
  for (const platform of ['android', 'ios', 'native', 'desktop']) {
    expect(
      getHasteName(
        getPath(
          'Libraries',
          'Components',
          'AccessibilityInfo',
          `AccessibilityInfo.${platform}.js`,
        ),
      ),
    ).toEqual('AccessibilityInfo');
  }
});

it('returns the correct haste name for a file with a flow suffix', () => {
  expect(
    getHasteName(
      getPath(
        'Libraries',
        'Components',
        'AccessibilityInfo',
        'AccessibilityInfo.ios.js.flow',
      ),
    ),
  ).toEqual('AccessibilityInfo');
});

it('does not calculate the haste name for a file that is not JS', () => {
  expect(
    getHasteName(
      getPath(
        'Libraries',
        'Components',
        'AccessibilityInfo',
        'AccessibilityInfo.txt',
      ),
    ),
  ).toBe(undefined);
});

it('does not calculate the haste name for a file outside of RN', () => {
  expect(
    getHasteName(getPath('..', 'Libraries', 'AccessibilityInfo.txt')),
  ).toBe(undefined);
});

it('does not calculate the haste name for a blacklisted file', () => {
  expect(
    getHasteName(
      getPath(
        'Libraries',
        'Components',
        '__mocks__',
        'AccessibilityInfo',
        'AccessibilityInfo.js',
      ),
    ),
  ).toBe(undefined);
});
