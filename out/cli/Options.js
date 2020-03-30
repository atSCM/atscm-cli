"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalOptions = exports.default = void 0;

var _Option = _interopRequireDefault(require("../lib/cli/Option"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Command line options available.
 * @type {Object}
 * @property {Option} browser Which browser to open in.
 * @property {Option} cli Open CLI documentation.
 * @property {Option} config Print project configuration.
 * @property {Option} cwd Manually set the CWD.
 * @property {Option} force Overwrite existing files.
 * @property {Option} help Show help.
 * @property {Option} logLevel Set the Logger level.
 * @property {Option} projectfile Manually set path of Atviseproject file to use.
 * @property {Option} remote Open hosted documentation.
 * @property {Option} silent Supress all logging.
 * @property {Option} version Print version.
 * @property {Option} beta Use atscm beta resources.
 */
const Options = {
  browser: _Option.default.string('Which browser to open in.'),
  cli: _Option.default.boolean('Open CLI documentation.'),
  continue: _Option.default.boolean('Continue execution of tasks upon failure.'),
  cwd: _Option.default.string('Manually set the CWD.'),
  force: _Option.default.boolean('Overwrite existing files.'),
  help: _Option.default.boolean('Show this help.'),
  'log-level': new _Option.default('Set the Logger level. -L for least verbose and -LLLL for most verbose. -LLL is default.', {
    alias: 'L',
    count: true,
    default: 3
  }),
  project: new _Option.default('Override Atviseproject values.', {
    default: {}
  }),
  projectfile: _Option.default.string('Manually set path of Atviseproject file to use. ' + "This will set the CWD to the Atviseproject file's directory as well.", {
    alias: 'p'
  }),
  require: _Option.default.string('Will require a module before running atscm.'),
  remote: _Option.default.boolean('Open hosted documentation.', {
    default: undefined
  }),
  silent: _Option.default.boolean('Suppress all logging.', {
    alias: 'S'
  }),
  tasks: _Option.default.boolean('Print the task dependency tree.', {
    alias: 'T'
  }),
  'tasks-simple': _Option.default.boolean('Print a plaintext list of tasks.'),
  'tasks-json': _Option.default.boolean('Print the task dependency tree, in JSON format.'),
  version: _Option.default.boolean('Print version.', {
    alias: 'v'
  }),
  beta: _Option.default.boolean('Use atscm beta resources.'),
  debug: _Option.default.boolean('Use debug mode.'),
  yes: _Option.default.boolean('Use default values.', {
    alias: 'y'
  }),
  // NOTE: Commit once gulp is no longer required for running
  link: _Option.default.boolean('Link atscm instead of installing. ' + 'This allows you to use you local atscm version. (Run `npm link .` first)')
};
var _default = Options;
/**
 * Options that can be used globally.
 * @type {Map<String, Option>}
 */

exports.default = _default;
const GlobalOptions = {
  projectfile: Options.projectfile,
  cwd: Options.cwd,
  project: Options.project,
  require: Options.require,
  version: Options.version,
  help: Options.help,
  silent: Options.silent,
  'log-level': Options['log-level'],
  debug: Options.debug
};
exports.GlobalOptions = GlobalOptions;
//# sourceMappingURL=Options.js.map