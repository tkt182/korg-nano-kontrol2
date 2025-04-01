localStorage.debug = 'korg-nano-kontrol2*';

import { korgNanoKontrol2 } from '../../../lib/korg-nano-kontrol2';
import type { KorgDevice } from '../../../lib/korg-nano-kontrol2';
import $ from 'jquery';

//when using CommonJS, please change the format in rollup.config.js to 'iife'.
//const { korgNanoKontrol2 } = require('../../../lib/korg-nano-kontrol2');
//type KorgDevice  = typeof korgNanoKontrol2.KorgDevice;
//// @ts-ignore
//var $ = require('jquery');

korgNanoKontrol2
  .connect()
  .then(function (device: KorgDevice) {
    message(`connected! ${device.deviceName}`);

    device.on('slider:*', function (this: KorgDevice, value: number) {
      message(`${String(this.event)} => ${value}`);
    });

    device.on('knob:*', function (this: KorgDevice, value: number) {
      message(`${String(this.event)} => ${value}`);
    });

    device.on('button:**', function (this: KorgDevice, value: boolean) {
      message(`${String(this.event)} => ${value}`);
    });
  })
  .catch(function (err: unknown) {
    console.error(err);
    alert(err);
  });

const message = (msg: string): void => {
  $('#log').prepend($('<li>').text(msg));
};
