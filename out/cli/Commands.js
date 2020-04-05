"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Run = _interopRequireDefault(require("./commands/Run"));

var _Init = _interopRequireDefault(require("./commands/Init"));

var _Config = _interopRequireDefault(require("./commands/Config"));

var _Docs = _interopRequireDefault(require("./commands/Docs"));

var _Update = _interopRequireDefault(require("./commands/Update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CLI commands available.
 * @type {Command[]}
 */
const Commands = [new _Run.default('run', '(default) Run tasks.'), new _Init.default('init', 'Create a new project.'), new _Config.default('config', 'Validate and print config file.'), new _Docs.default('docs', 'Open documentation.'), new _Update.default('update', 'Update installed atscm module.')];
var _default = Commands;
exports.default = _default;
//# sourceMappingURL=Commands.js.map