'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_184e8bw74x = function () {
  var path = '/home/ubuntu/atscm-cli/src/cli/commands/Docs.js',
      hash = '379a32ef47bb7def11f202952365b3dc434e05a8',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/cli/commands/Docs.js',
    statementMap: {
      '0': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 24,
          column: 7
        }
      },
      '1': {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 38,
          column: 6
        }
      },
      '2': {
        start: {
          line: 46,
          column: 21
        },
        end: {
          line: 46,
          column: 41
        }
      },
      '3': {
        start: {
          line: 47,
          column: 4
        },
        end: {
          line: 47,
          column: 58
        }
      },
      '4': {
        start: {
          line: 49,
          column: 4
        },
        end: {
          line: 49,
          column: 40
        }
      },
      '5': {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 58,
          column: 28
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 17,
            column: 3
          }
        },
        loc: {
          start: {
            line: 17,
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
            line: 32,
            column: 2
          },
          end: {
            line: 32,
            column: 3
          }
        },
        loc: {
          start: {
            line: 32,
            column: 18
          },
          end: {
            line: 39,
            column: 3
          }
        }
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 45,
            column: 2
          },
          end: {
            line: 45,
            column: 3
          }
        },
        loc: {
          start: {
            line: 45,
            column: 11
          },
          end: {
            line: 50,
            column: 3
          }
        }
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 57,
            column: 2
          },
          end: {
            line: 57,
            column: 3
          }
        },
        loc: {
          start: {
            line: 57,
            column: 27
          },
          end: {
            line: 59,
            column: 3
          }
        }
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 34,
            column: 6
          },
          end: {
            line: 36,
            column: 50
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 35,
            column: 8
          },
          end: {
            line: 35,
            column: 36
          }
        }, {
          start: {
            line: 36,
            column: 8
          },
          end: {
            line: 36,
            column: 50
          }
        }]
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    b: {
      '0': [0, 0]
    },
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

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _Command = require('../../lib/cli/Command');

var _Command2 = _interopRequireDefault(_Command);

var _Options = require('../Options');

var _Options2 = _interopRequireDefault(_Options);

var _Logger = require('../../lib/util/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked when running "docs". Handles the options --cli and --browser.
 */
class DocsCommand extends _Command2.default {

  /**
   * Creates a new {@link DocsCommand} with the specified name and description.
   * @param {String} name The command's name.
   * @param {String} description The command's description.
   */
  constructor(name, description) {
    ++cov_184e8bw74x.f[0];
    ++cov_184e8bw74x.s[0];

    super(name, description, {
      options: {
        cli: _Options2.default.cli,
        browser: _Options2.default.browser
      },
      maxArguments: 0
    });
  }

  /**
   * Returns the path to the api docs to open.
   * @param {AtSCMCli} cli The current Cli instance.
   * @return {String} The path to the api docs to opten.
   */
  pathToOpen(cli) {
    ++cov_184e8bw74x.f[1];
    ++cov_184e8bw74x.s[1];

    return (0, _path.join)(cli.options.cli ? (++cov_184e8bw74x.b[0][0], (0, _path.join)(__dirname, '../../../')) : (++cov_184e8bw74x.b[0][1], (0, _path.join)(cli.environment.modulePath, '../../')), 'docs/api/index.html');
  }

  /**
   * Opens the requested docs in the requested browser.
   * @param {AtSCMCli} cli The current Cli instance.
   */
  run(cli) {
    ++cov_184e8bw74x.f[2];

    const docsPath = (++cov_184e8bw74x.s[2], this.pathToOpen(cli));
    ++cov_184e8bw74x.s[3];
    _Logger2.default.debug('Opening', _Logger2.default.format.path(docsPath));

    ++cov_184e8bw74x.s[4];
    (0, _open2.default)(docsPath, cli.options.browser);
  }

  /**
   * Returns `false` if the `--cli` option is used.
   * @param {AtSCMCli} cli The current cli instance.
   * @return {Boolean} `false` if the `--cli` option is used.
   */
  requiresEnvironment(cli) {
    ++cov_184e8bw74x.f[3];
    ++cov_184e8bw74x.s[5];

    return !cli.options.cli;
  }

}
exports.default = DocsCommand;