"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("util");

var _Logger = _interopRequireDefault(require("../../lib/util/Logger"));

var _Command = _interopRequireDefault(require("../../lib/cli/Command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked when running "config".
 */
class ConfigCommand extends _Command.default {
  /**
   * Creates a new {@link ConfigCommand} with the specified name and description.
   * @param {string} name The command's name.
   * @param {string} description The command's description.
   */
  constructor(name, description) {
    super(name, description, {
      maxArguments: 0
    });
  }
  /**
   * Prints the project's configuration.
   * @param {AtSCMCli} cli The current Cli instance.
   */


  run(cli) {
    process.env.ATSCM_CONFIG_PATH = cli.environment.configPath;
    /* eslint-disable global-require */

    const config = require(cli.environment.modulePath).ProjectConfig || require(cli.environment.configPath).default;
    /* eslint-enable global-require */


    _util.inspect.styles.number = 'magenta';
    _util.inspect.styles.string = 'cyan';

    _Logger.default.info('Configuration at', _Logger.default.format.path(cli.environment.configPath), `\n${(0, _util.inspect)(config, {
      colors: true,
      depth: null,
      breakLength: 0
    })}`);

    if (cli.options.project && config.name !== 'ProjectConfig') {
      _Logger.default.warn('Overriding runtime configuration requires atscm version >= 0.4');

      _Logger.default.info('Run', _Logger.default.format.command('atscm update'), 'to update to the newest version');
    }
  }

}

exports.default = ConfigCommand;
//# sourceMappingURL=Config.js.map