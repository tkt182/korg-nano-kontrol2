import { korgNanoKontrol2 } from '../../lib/korg-nano-kontrol2';
import type { KorgDevice } from '../../lib/korg-nano-kontrol2';

//when using CommonJS, please change the format in rollup.config.js to 'cjs'.
//const { korgNanoKontrol2 } = require('../../');
//type KorgDevice = typeof korgNanoKontrol2.KorgDevice;

korgNanoKontrol2
  .connect()
  .then(function (device: KorgDevice) {
    console.log(`connected! ${device.deviceName}`);

    // register specific slider/knob/button event
    device.on('slider:0', function (value: number) {
      console.log(`slider:0 >>> ${value}`);
    });

    device.on('knob:1', function (value: number) {
      console.log(`knob:1 >>> ${value}`);
    });

    device.on('button:play', function (value: boolean) {
      console.log(`button:play >>> ${value}`);
    });

    device.on('button:stop', function (value: boolean) {
      console.log(`button:stop >>> ${value}`);
      if (value === false) {
        console.log('exit!!');
        device.close();
      }
    });

    // catch all slider/knob/button event
    device.on('slider:*', function (this: KorgDevice, value: number) {
      console.log(`${String(this.event)} => ${value}`);
    });

    device.on('knob:*', function (this: KorgDevice, value: number) {
      console.log(`${String(this.event)} => ${value}`);
    });

    device.on('button:**', function (this: KorgDevice, value: boolean) {
      console.log(`${String(this.event)} => ${value}`);
    });
  })
  .catch(function (err: unknown) {
    console.error(err);
  });
