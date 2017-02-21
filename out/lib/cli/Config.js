'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Command = require('../../lib/cli/Command');

var _Command2 = _interopRequireDefault(_Command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RunCommand extends _Command2.default {

  constructor(name, description) {
    super(name, description, {
      arguments: '[tasks...]'
    });
  }

  run() {
    throw new Error('Not implemented yet.');
  }

}
exports.default = RunCommand;