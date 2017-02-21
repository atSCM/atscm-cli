'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Command = require('./Command');

var _Command2 = _interopRequireDefault(_Command);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Commands = [new _Command2.default('run', {
  arguments: '[tasks...]',
  description: '(default) Run tasks.',
  options: {}
}), new _Command2.default('docs', {
  description: 'Open documentation',
  options: {
    cli: _Options2.default.cli
  },
  maxArguments: 0
})];

exports.default = Commands;