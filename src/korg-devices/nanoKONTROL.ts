import _ from 'lodash';

import { Input } from 'webmidi';
import { KorgDevice } from '../korg-device';
import { eachWithIndex } from '../util';

export class NanoKONTROL extends KorgDevice {
  static override detect(deviceName: string): boolean {
    return /^nanoKONTROL\s/i.test(deviceName);
  }

  constructor(input: Input, name: string) {
    super(input, name, { globalMidiChannel: true });
    this.debug('created');
    this.setScene(1);

    this.on('midi:message', (msg) => {
      if (msg.length === 11 && msg[0] === 240 && msg[10] === 247) {
        this.setScene(msg[9] + 1);
        this.emit('button:scene', msg[9] + 1);
      }
    });

    this.button([176, 44], 'rec');
    this.button([176, 45], 'play');
    this.button([176, 46], 'stop');
    this.button([176, 47], 'prev');
    this.button([176, 48], 'next');
    this.button([176, 49], 'loop');
  }

  setScene(scene: number) {
    switch (scene) {
      case 1:
        eachWithIndex([..._.range(2, 7), 8, 9, 12, 13], (index, code) => {
          this.slider([176, code], index);
        });
        eachWithIndex(_.range(14, 23), (index, code) => {
          this.knob([176, code], index);
        });
        eachWithIndex(_.range(23, 32), (index, code) => {
          this.button([176, code], `a:${index}`);
        });
        eachWithIndex(_.range(33, 42), (index, code) => {
          this.button([176, code], `b:${index}`);
        });
        break;
      case 2:
        eachWithIndex([42, 43, ..._.range(50, 57)], (index, code) => {
          this.slider([176, code], index);
        });
        eachWithIndex([..._.range(57, 64), 65, 66], (index, code) => {
          this.knob([176, code], index);
        });
        eachWithIndex(_.range(67, 76), (index, code) => {
          this.button([176, code], `a:${index}`);
        });
        eachWithIndex(_.range(76, 85), (index, code) => {
          this.button([176, code], `b:${index}`);
        });
        break;
      case 3:
        eachWithIndex(_.range(85, 94), (index, code) => {
          this.slider([176, code], index);
        });
        eachWithIndex(
          [..._.range(94, 98), ..._.range(102, 107)],
          (index, code) => {
            this.knob([176, code], index);
          }
        );
        eachWithIndex(_.range(107, 116), (index, code) => {
          this.button([176, code], `a:${index}`);
        });
        eachWithIndex(_.range(116, 125), (index, code) => {
          this.button([176, code], `b:${index}`);
        });
        break;
      case 4:
        eachWithIndex(_.range(176, 185), (index, code) => {
          this.slider([code, 7], index);
        });
        eachWithIndex(_.range(176, 185), (index, code) => {
          this.knob([code, 10], index);
        });
        eachWithIndex(_.range(176, 185), (index, code) => {
          this.button([code, 16], `a:${index}`);
        });
        eachWithIndex(_.range(176, 185), (index, code) => {
          this.button([code, 17], `b:${index}`);
        });
        break;
    }
  }
}
