'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CliOptions = require('./CliOptions');

class Command {

  constructor(name, options = {}) {
    this.name = name;
    this._options = options;
  }

  get usage() {
    if (this._options.arguments) {
      return `${ this.name } ${ this._options.arguments }`;
    }

    return this.name;
  }

  get options() {
    return this._options.options || {};
  }

  get demandCommands() {
    const ret = [this._options.minCommands || 0];

    if (this._options.maxCommands) {
      ret.push(this._options.maxCommands);
    }

    return ret;
  }

  get description() {
    return this._options.description;
  }

}

const Commands = [new Command('run', {
  arguments: '[tasks...]',
  description: '(default) Run tasks.',
  options: _CliOptions.run
}), new Command('docs', {
  description: 'Open documentation',
  options: _CliOptions.docs
})];

exports.default = Commands;