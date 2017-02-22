#!/usr/bin/env node
'use strict';

var cov_19az4npqim = function () {
  var path = '/home/ubuntu/atscm-cli/src/bin/atscm.js',
      hash = '9b24254d9ed99ccd30012c8028e617fd04142753',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/ubuntu/atscm-cli/src/bin/atscm.js',
    statementMap: {
      '0': {
        start: {
          line: 5,
          column: 0
        },
        end: {
          line: 5,
          column: 47
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

var _AtSCMCli = require('../AtSCMCli');

var _AtSCMCli2 = _interopRequireDefault(_AtSCMCli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

++cov_19az4npqim.s[0];


new _AtSCMCli2.default(process.argv.slice(2)).launch();