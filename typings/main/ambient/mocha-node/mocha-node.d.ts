// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/098def61bc44ee29dae7e7a5c719873195086ac2/mocha/mocha-node.d.ts
// Type definitions for mocha 2.2.5
// Project: http://mochajs.org/
// Definitions by: Vadim Macagon <https://github.com/enlight>, vvakame <https://github.com/vvakame>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module Mocha {
    interface IRunnable extends NodeJS.EventEmitter {
    }
    interface ISuite extends NodeJS.EventEmitter {
    }
    interface IRunner extends NodeJS.EventEmitter {
    }
}