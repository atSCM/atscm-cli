'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cb) {
  return (0, _inquirer.prompt)(options).then(answers => cb(console.log('got', answers))).catch(err => cb(err));
};

var _path = require('path');

var _inquirer = require('inquirer');

const localModulePath = (0, _path.join)(process.cwd(), './node_modules/atscm');

const options = require((0, _path.join)(localModulePath, 'out/init/options')).default;