/* global describe it */

import './test_helper';
import { assert } from 'chai';
import { korgNanoKontrol2 } from '../src/korg-nano-kontrol2';

describe('korg-nano-kontrol2', function () {
  it('should have method "connect"', async function () {
    assert.isFunction(korgNanoKontrol2.connect);
  });
});
