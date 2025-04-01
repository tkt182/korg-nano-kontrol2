import { WebMidi } from 'webmidi';
import debugFactory from 'debug';
const debug = debugFactory('korg-nano-kontrol2');

import { KorgDevice } from './korg-device';
import { NanoKONTROL } from './korg-devices/nanoKONTROL';
import { NanoKONTROL2 } from './korg-devices/nanoKONTROL2';

const korgDevices = [NanoKONTROL, NanoKONTROL2];

export const korgNanoKontrol2 = {
  connect: async (deviceName?: string): Promise<KorgDevice> => {
    debug(`connect(${deviceName})`);
    if (!WebMidi.enabled) {
      await WebMidi.enable();
    }

    for (const input of WebMidi.inputs) {
      for (const korgDevice of korgDevices) {
        if (korgDevice.detect(input.name)) {
          debug(`detect ${korgDevice.name}`);
          return new korgDevice(input, input.name);
        }
      }
    }

    throw new Error('device not found');
  },
};

export type { KorgDevice };
