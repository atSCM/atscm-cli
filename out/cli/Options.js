'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalOptions = undefined;

var cov_zr0gp6b0i = function () {
  var path = '/home/ubuntu/atscm-cli/src/cli/Options.js',
      hash = '634f6e094badc958e917abf03fb7b30a1ec66986',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/cli/Options.js',
    statementMap: {
      '0': {
        start: {
          line: 16,
          column: 16
        },
        end: {
          line: 40,
          column: 1
        }
      },
      '1': {
        start: {
          line: 48,
          column: 29
        },
        end: {
          line: 56,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0
    },
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _Option = require('../lib/cli/Option');

var _Option2 = _interopRequireDefault(_Option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Command line options available.
 * @type {Object}
 * @property {Option} browser Which browser to open in.
 * @property {Option} cli Open CLI documentation.
 * @property {Option} config Print project configuration.
 * @property {Option} cwd Manually set the CWD.
 * @property {Option} help Show help.
 * @property {Option} logLevel Set the Logger level.
 * @property {Option} projectfile Manually set path of Atviseproject file to use.
 * @property {Option} silent Supress all logging.
 * @property {Option} version Print version.
 */
const Options = (++cov_zr0gp6b0i.s[0], {
  browser: _Option2.default.string('Which browser to open in.'),
  cli: _Option2.default.boolean('Open CLI documentation.'),
  continue: _Option2.default.boolean('Continue execution of tasks upon failure.'),
  cwd: _Option2.default.string('Manually set the CWD.'),
  help: _Option2.default.boolean('Show this help.'),
  'log-level': new _Option2.default('Set the Logger level. ' + '-L for least verbose and -LLLL for most verbose. -LLL is default.', {
    alias: 'L',
    count: true,
    default: 3
  }),
  projectfile: _Option2.default.string('Manually set path of Atviseproject file to use. ' + 'This will set the CWD to the Atviseproject file\'s directory as well.', { alias: 'p' }),
  require: _Option2.default.string('Will require a module before running atscm.'),
  silent: _Option2.default.boolean('Suppress all logging.', { alias: 'S' }),
  tasks: _Option2.default.boolean('Print the task dependency tree.', {
    alias: 'T'
  }),
  'tasks-simple': _Option2.default.boolean('Print a plaintext list of tasks.'),
  'tasks-json': _Option2.default.boolean('Print the task dependency tree, in JSON format.'),
  version: _Option2.default.boolean('Print version.', { alias: 'v' })
});

exports.default = Options;

/**
 * Options that can be used globally.
 * @type {Map<String, Option>}
 */

const GlobalOptions = exports.GlobalOptions = (++cov_zr0gp6b0i.s[1], {
  projectfile: Options.projectfile,
  cwd: Options.cwd,
  require: Options.require,
  version: Options.version,
  help: Options.help,
  silent: Options.silent,
  'log-level': Options['log-level']
});