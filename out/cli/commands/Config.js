'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2bi1zslp3w = function () {
  var path = '/home/ubuntu/atscm-cli/src/cli/commands/Config.js',
      hash = '009a24229cadc869f2dfe32719c73711af5dc83e',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/cli/commands/Config.js',
    statementMap: {
      '0': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 18,
          column: 7
        }
      },
      '1': {
        start: {
          line: 27,
          column: 19
        },
        end: {
          line: 27,
          column: 62
        }
      },
      '2': {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 38
        }
      },
      '3': {
        start: {
          line: 30,
          column: 4
        },
        end: {
          line: 30,
          column: 35
        }
      },
      '4': {
        start: {
          line: 32,
          column: 4
        },
        end: {
          line: 35,
          column: 6
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
            line: 19,
            column: 3
          }
        }
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        },
        loc: {
          start: {
            line: 25,
            column: 11
          },
          end: {
            line: 36,
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
      '3': 0,
      '4': 0
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

var _util = require('util');

var _Logger = require('../../lib/util/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Command = require('../../lib/cli/Command');

var _Command2 = _interopRequireDefault(_Command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked when running "config".
 */
class ConfigCommand extends _Command2.default {

  /**
   * Creates a new {@link ConfigCommand} with the specified name and description.
   * @param {String} name The command's name.
   * @param {String} description The command's description.
   */
  constructor(name, description) {
    ++cov_2bi1zslp3w.f[0];
    ++cov_2bi1zslp3w.s[0];

    super(name, description, {
      maxArguments: 0
    });
  }

  /**
   * Prints the project's configuration.
   * @param {AtSCMCli} cli The current Cli instance.
   */
  run(cli) {
    ++cov_2bi1zslp3w.f[1];

    // eslint-disable-next-line global-require
    const config = (++cov_2bi1zslp3w.s[1], require(cli.environment.configPath).default);

    ++cov_2bi1zslp3w.s[2];
    _util.inspect.styles.number = 'magenta';
    ++cov_2bi1zslp3w.s[3];
    _util.inspect.styles.string = 'cyan';

    ++cov_2bi1zslp3w.s[4];
    _Logger2.default.info('Configuration at', _Logger2.default.format.path(cli.environment.configPath), `\n${(0, _util.inspect)(config, { colors: true, depth: null, breakLength: 0 })}`);
  }

}
exports.default = ConfigCommand;