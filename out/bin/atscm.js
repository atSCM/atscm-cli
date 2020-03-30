#!/usr/bin/env node
"use strict";

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _package = _interopRequireDefault(require("../../package.json"));

var _AtSCMCli = _interopRequireDefault(require("../AtSCMCli"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _updateNotifier.default)({
  pkg: _package.default
}).notify();
new _AtSCMCli.default(process.argv.slice(2)).launch();
//# sourceMappingURL=atscm.js.map