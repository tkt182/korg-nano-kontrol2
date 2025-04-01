# korg-nano-kontrol2

A Node.js/Browser library for KORG nanoKONTROL2, written in Typescript.
Supports both CommonJS and ES Modules.

Forked from [korg-nano-kontrol](https://www.npmjs.com/package/korg-nano-kontrol) v0.2.9 and updated.


## Features

- Supports KORG nanoKONTROL2
  - The KORG nanoKONTROL's operation is untested
- TypeScript definitions included
- Works in both Node.js and Browsers
  - Using [WEBMIDI.js](https://webmidijs.org/) for MIDI communication
- Dual module support: CommonJS (`require`) and ESM (`import`)


## Install

```bash
% npm install korg-nano-kontrol2
```

## Samples
- [Node.js](https://github.com/tkt182/korg-nano-kontrol2/tree/main/samples/node)
- [Browser](https://github.com/tkt182/korg-nano-kontrol2/tree/main/samples/browser)

## Usage

### Connect

find `nanoKONTROL2`

```javascript
import { korgNanoKontrol2 } from 'korg-nano-kontrol2';
import type { KorgDevice } from 'korg-nano-kontrol2';

korgNanoKontrol2.connect()
.then(function(device: KorgDevice){
  console.log(`connected! + ${device.deviceName}`);
  // do something
})
.catch(function (err: unknown) {
  console.error(err);
});
```

### Register Events

```javascript
// register specific slider/knob/button events
device.on('slider:0', function(value: number){
  console.log(`slider:0 >>> ${value}`);
});

device.on('knob:1', function(value: number){
  console.log(`knob:1 >>> ${value}`);
});

device.on('button:play', function(value: boolean){
  console.log(`button:play >>> ${value}`);
});

// catch all slider/knob/button events
device.on('slider:*', function (this: KorgDevice, value: number) {
  console.log(`${String(this.event)} => ${value}`);
});

device.on('knob:*', function (this: KorgDevice, value: number) {
  console.log(`${String(this.event)} => ${value}`);
});

device.on('button:**', function (this: KorgDevice, value: boolean) {
  console.log(`${String(this.event)} => ${value}`);
});
```

### Close

```javascript
device.close();
```

## Debug

enable [debug npm](https://www.npmjs.com/package/debug)

for Node.js

```bash
% export DEBUG="korg-nano-kontrol2:*"
```

for Browser

```
localStorage.debug = "korg-nano-kontrol2:*";
```

## Build

```bash
% npm run build
% npm run buildSample

% npm run watch
```

## Test

```bash
% npm install

% npm test
```
