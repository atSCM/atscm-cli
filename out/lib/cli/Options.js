'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docs = exports.run = exports.global = undefined;

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Options = {
  cli: _Option2.default.boolean('Open CLI documentation.'),
  config: _Option2.default.boolean('Print project configuration. Useful for debugging.'),
  cwd: _Option2.default.string('Manually set the CWD.'),
  help: _Option2.default.boolean('Show this help'),
  logLevel: new _Option2.default('Set the Logger level. ' + '-L for least verbose and -LLLL for most verbose. -LLL is default.', {
    alias: 'L',
    count: true
  }),
  projectfile: _Option2.default.string('Manually set path of Atviseproject file to use. ' + 'This will set the CWD to the Atviseproject file\'s directory as well.', { alias: 'p' }),
  silent: _Option2.default.boolean('Supress all logging.', { alias: 'S' }),
  version: _Option2.default.boolean('Print version.', { alias: 'v' })
};

exports.default = Options;

/**
 * Options that can be used globally
 * @type {{projectfile: *, cwd: *, config: *, version: *, help: *, silent: *, logLevel: Option}}
 */

const global = exports.global = {
  projectfile: Options.projectfile,
  cwd: Options.cwd,
  config: Options.config,
  version: Options.version,
  help: Options.help,
  silent: Options.silent,
  logLevel: Options.logLevel
};

/**
 * Options that can be used with the "run" command
 * @type {Object}
 */
const run = exports.run = {};

/**
 * Options that can be used with the "docs" command
 * @type {Object}
 */
const docs = exports.docs = {
  cli: Options.cli
};