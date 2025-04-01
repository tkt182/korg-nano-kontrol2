import { Input } from 'webmidi';
import EventEmitter2 from 'eventemitter2';
import Debug from 'debug';

interface Options {
  globalMidiChannel: boolean;
  name?: string;
  type?: string;
}

export class KorgDevice extends EventEmitter2 {
  public event?: string | symbol;

  private input: Input;
  private name: string;
  private defaultOpts: Options;
  private codes: { [key: string]: Options };
  protected debug: Debug.Debugger;

  constructor(input: Input, name: string, opts = { globalMidiChannel: false }) {
    super({
      wildcard: true,
      delimiter: ':',
    });
    this.input = input;
    this.name = name;
    this.defaultOpts = opts;
    this.defaultOpts.type = this.defaultOpts.type || 'analog';
    this.codes = {};
    this.debug = Debug(`korg-nano-kontrol2:${name}`);

    this.input.addListener('midimessage', (msg) => {
      this.emit('midi:message', msg.message.data);
    });

    this.on('midi:message', (msg) => {
      this.debug(msg);
      const e =
        this.codes[opts.globalMidiChannel ? `${msg[0]},${msg[1]}` : msg[1]];
      if (!e || !e.name) {
        return;
      }
      if (e.type === 'digital') {
        this.emit(e.name, msg[2] > 0);
      } else {
        this.emit(e.name, msg[2]);
      }
    });
  }

  static detect(_deviceName: string): boolean {
    return false;
  }

  get deviceName(): string {
    return this.name;
  }

  emit(event: string | symbol, ...args: any[]): boolean {
    this.debug(event.toString());
    this.event = event;
    const result = super.emit(event, ...args);
    this.event = undefined;
    return result;
  }

  close() {
    this.debug('close');
    this.input.close();
  }

  register(code: number | number[], opts: Options) {
    const codesKey = Array.isArray(code) ? code.join(',') : code;
    this.codes[codesKey] = opts;
  }

  button(code: number | number[], name: string) {
    const opts = {
      ...this.defaultOpts,
      name: `button:${name}`,
      type: 'digital',
    };
    this.register(code, opts);
  }

  knob(code: number | number[], index: number) {
    const opts = {
      ...this.defaultOpts,
      name: `knob:${index}`,
    };
    this.register(code, opts);
  }

  slider(code: number | number[], index: number) {
    const opts = {
      ...this.defaultOpts,
      name: `slider:${index}`,
    };
    this.register(code, opts);
  }
}
