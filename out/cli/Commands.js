'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1cy3hrb4pd = function () {
  var path = '/home/ubuntu/atscm-cli/src/cli/Commands.js',
      hash = 'de5936955ea4aa34dc4b3114520e91c1a9518d8e',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/cli/Commands.js',
    statementMap: {
      '0': {
        start: {
          line: 10,
          column: 17
        },
        end: {
          line: 15,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0
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

var _Run = require('./commands/Run');

var _Run2 = _interopRequireDefault(_Run);

var _Init = require('./commands/Init');

var _Init2 = _interopRequireDefault(_Init);

var _Config = require('./commands/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Docs = require('./commands/Docs');

var _Docs2 = _interopRequireDefault(_Docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CLI commands available.
 * @type {Command[]}
 */
const Commands = (++cov_1cy3hrb4pd.s[0], [new _Run2.default('run', '(default) Run tasks.'), new _Init2.default('init', 'Create a new project.'), new _Config2.default('config', 'Validate and print config file.'), new _Docs2.default('docs', 'Open documentation.')]);

exports.default = Commands;