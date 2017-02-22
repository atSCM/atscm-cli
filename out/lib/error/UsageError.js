"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1ocugmaodd = function () {
  var path = "/home/ubuntu/atscm-cli/src/lib/error/UsageError.js",
      hash = "d2f9da3715578937f55fb55d2825d1f613263d17",
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "/home/ubuntu/atscm-cli/src/lib/error/UsageError.js",
    statementMap: {
      "0": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 19
        }
      },
      "1": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 21
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 11,
            column: 2
          },
          end: {
            line: 11,
            column: 3
          }
        },
        loc: {
          start: {
            line: 11,
            column: 29
          },
          end: {
            line: 19,
            column: 3
          }
        }
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

/**
 * An error reported when {@link yargs} fails to parse arguments.
 */
class UsageError extends Error {

  /**
   * Creates a new {@link UsageError} based on an error message and the failing parser.
   * @param {String} message The error message.
   * @param {String} help Help text for the failing command.
   */
  constructor(message, help) {
    ++cov_1ocugmaodd.f[0];
    ++cov_1ocugmaodd.s[0];

    super(message);

    /**
     * Help text for the failing command.
     * @type {String}
     */
    ++cov_1ocugmaodd.s[1];
    this.help = help;
  }

}
exports.default = UsageError;