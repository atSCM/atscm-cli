'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1pexc3rim8 = function () {
  var path = '/home/ubuntu/atscm-cli/src/lib/cli/Option.js',
      hash = 'a528a7c743ca8924fc17305b299070538613b1a0',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/lib/cli/Option.js',
    statementMap: {
      '0': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 21
        }
      },
      '1': {
        start: {
          line: 20,
          column: 4
        },
        end: {
          line: 21,
          column: 44
        }
      },
      '2': {
        start: {
          line: 21,
          column: 21
        },
        end: {
          line: 21,
          column: 41
        }
      },
      '3': {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 71
        }
      },
      '4': {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 42,
          column: 89
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 13,
            column: 3
          }
        },
        loc: {
          start: {
            line: 13,
            column: 34
          },
          end: {
            line: 22,
            column: 3
          }
        }
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 21,
            column: 15
          },
          end: {
            line: 21,
            column: 16
          }
        },
        loc: {
          start: {
            line: 21,
            column: 21
          },
          end: {
            line: 21,
            column: 41
          }
        }
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 30,
            column: 2
          },
          end: {
            line: 30,
            column: 3
          }
        },
        loc: {
          start: {
            line: 30,
            column: 37
          },
          end: {
            line: 32,
            column: 3
          }
        }
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 41,
            column: 2
          },
          end: {
            line: 41,
            column: 3
          }
        },
        loc: {
          start: {
            line: 41,
            column: 36
          },
          end: {
            line: 43,
            column: 3
          }
        }
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 13,
            column: 20
          },
          end: {
            line: 13,
            column: 32
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 13,
            column: 30
          },
          end: {
            line: 13,
            column: 32
          }
        }]
      },
      '1': {
        loc: {
          start: {
            line: 30,
            column: 23
          },
          end: {
            line: 30,
            column: 35
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 30,
            column: 33
          },
          end: {
            line: 30,
            column: 35
          }
        }]
      },
      '2': {
        loc: {
          start: {
            line: 41,
            column: 22
          },
          end: {
            line: 41,
            column: 34
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 41,
            column: 32
          },
          end: {
            line: 41,
            column: 34
          }
        }]
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    b: {
      '0': [0],
      '1': [0],
      '2': [0]
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

/**
 * A command line option.
 */
class Option {

  /**
   * Creates a new {@link Option} based on a description and some options.
   * @param {String} desc A string describing the option. Used for help texts.
   * @param {Object} [options={}] The options to create the {@link Option} with. Refer to
   * [yarg's documentation](http://yargs.js.org/docs/#methods-optionskey-opt) in order to know what
   * options can be used here.
   */
  constructor(desc, options = (++cov_1pexc3rim8.b[0][0], {})) {
    ++cov_1pexc3rim8.f[0];
    ++cov_1pexc3rim8.s[0];

    /**
     * A string describing the option. Used for help texts.
     * @type {String}
     */
    this.desc = desc;

    ++cov_1pexc3rim8.s[1];
    Object.keys(options).forEach(k => {
      ++cov_1pexc3rim8.f[1];
      ++cov_1pexc3rim8.s[2];
      return this[k] = options[k];
    });
  }

  /**
   * Shorthand to create an {@link Option} with type boolean.
   * @param {String} desc A string describing the option. Used for help texts.
   * @param {Object} [options={type: 'boolean'}] The options to create the {@link Option} with.
   * @return {Option} An {@link Option} with type boolean.
   */
  static boolean(desc, options = (++cov_1pexc3rim8.b[1][0], {})) {
    ++cov_1pexc3rim8.f[2];
    ++cov_1pexc3rim8.s[3];

    return new this(desc, Object.assign(options, { type: 'boolean' }));
  }

  /**
   * Shorthand to create an {@link Option} with type string.
   * @param {String} desc A string describing the option. Used for help texts.
   * @param {Object} [options={type: 'string', requiresArg: true}] The options to create the
   * {@link Option} with.
   * @return {Option} An {@link Option} with type string.
   */
  static string(desc, options = (++cov_1pexc3rim8.b[2][0], {})) {
    ++cov_1pexc3rim8.f[3];
    ++cov_1pexc3rim8.s[4];

    return new this(desc, Object.assign(options, { type: 'string', requiresArg: true }));
  }

}
exports.default = Option;