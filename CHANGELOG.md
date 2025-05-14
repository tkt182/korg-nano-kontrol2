# Changelog

## [0.3.0] - 2025-05-15

* added TypeScript definitions  
* switched to [WebMidi.js](https://webmidijs.org/) for both Node.js and browser environments
* added dual module support: CommonJS (`require`) and ESM (`import`)

## [0.2.9] - 2016-01-26

* bugfixed connecting from multiple devices  #10
  * thank you for contributing @sashimizakana

## [0.2.8] - 2016-01-25

* use module.exports to provide "connect" function, instead of ES6 export

## [0.2.7] - 2016-01-25

* specify version devDependencies  #8

## [0.2.6] - 2015-06-26

* use iterator in webmidi
* module.exports -> export default

## [0.2.5] - 2015-06-23

* fixed WebMIDI init sequence, and sample code

## [0.2.4] - 2015-06-21

* WebMIDI: convert Uint8Array -> Array
* fixed webmidi sample
* use spread operator instead of Array.concat

## [0.2.3] - 2015-06-20

* added constructor "globalMidiChannel" option  #6

## [0.2.2] - 2015-06-14

* bugfix for Node.js 0.10

## [0.2.1] - 2015-06-13

* bugfix device detection

## [0.2.0] - 2015-06-13

* rewrite coffee-script with ES6/babel

## [0.1.2] - 2015-06-12

* bugfix nanoKONTROL1 on browser

## [0.1.1] - 2015-06-12

* update package.json

## [0.1.0] - 2015-06-11

* support WebMIDI API  #2

## [0.0.3] - 2015-06-11

* specify device name by "device.connect(name)"  #1

## [0.0.2] - 2015-06-11

* add method device.close()  #3

## [0.0.1] - 2015-06-11

* first release
