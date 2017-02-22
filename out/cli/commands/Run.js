'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2aa1e0ekpm = function () {
  var path = '/home/ubuntu/atscm-cli/src/cli/commands/Run.js',
      hash = 'f249a780b5a603bc6f7d71384fdbe70878e73554',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/cli/commands/Run.js',
    statementMap: {
      '0': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 24,
          column: 7
        }
      },
      '1': {
        start: {
          line: 32,
          column: 17
        },
        end: {
          line: 38,
          column: 5
        }
      },
      '2': {
        start: {
          line: 40,
          column: 4
        },
        end: {
          line: 40,
          column: 63
        }
      },
      '3': {
        start: {
          line: 43,
          column: 4
        },
        end: {
          line: 48,
          column: 9
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 15,
            column: 3
          }
        },
        loc: {
          start: {
            line: 15,
            column: 33
          },
          end: {
            line: 25,
            column: 3
          }
        }
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 31,
            column: 2
          },
          end: {
            line: 31,
            column: 3
          }
        },
        loc: {
          start: {
            line: 31,
            column: 11
          },
          end: {
            line: 49,
            column: 3
          }
        }
      }
    },
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    f: {
      '0': 0,
      '1': 0
    },
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

var _path = require('path');

var _Command = require('../../lib/cli/Command');

var _Command2 = _interopRequireDefault(_Command);

var _Options = require('../Options');

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked when running "run".
 */
class RunCommand extends _Command2.default {

  /**
   * Creates a new {@link RunCommand} with the specified name and description.
   * @param {String} name The command's name.
   * @param {String} description The command's description.
   */
  constructor(name, description) {
    ++cov_2aa1e0ekpm.f[0];
    ++cov_2aa1e0ekpm.s[0];

    super(name, description, {
      arguments: '[tasks...]',
      options: {
        tasks: _Options2.default.tasks,
        'tasks-simple': _Options2.default['tasks-simple'],
        'tasks-json': _Options2.default['tasks-json'],
        continue: _Options2.default.continue
      }
    });
  }

  /**
   * Runs gulp with the specified tasks.
   * @param {AtSCMCli} cli The current Cli instance.
   */
  run(cli) {
    ++cov_2aa1e0ekpm.f[1];

    const opts = (++cov_2aa1e0ekpm.s[1], {
      _: cli.options.tasks,
      tasks: cli.options.T,
      tasksSimple: cli.options.tasksSimple,
      tasksJson: cli.options.tasksJson,
      continue: cli.options.continue
    });

    ++cov_2aa1e0ekpm.s[2];
    process.env.ATSCM_CONFIG_PATH = cli.environment.configPath;

    // eslint-disable-next-line global-require
    ++cov_2aa1e0ekpm.s[3];
    require('gulp-cli/lib/versioned/^4.0.0-alpha.2/')(opts, {
      configPath: (0, _path.join)(cli.environment.modulePath, '../Gulpfile.js'),
      modulePath: (0, _path.join)(cli.environment.cwd, 'node_modules/gulp')
    });
  }

}
exports.default = RunCommand;