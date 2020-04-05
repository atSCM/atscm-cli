"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

var _Command = _interopRequireDefault(require("../../lib/cli/Command"));

var _Options = _interopRequireDefault(require("../Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked when running "run".
 */
class RunCommand extends _Command.default {
  /**
   * Creates a new {@link RunCommand} with the specified name and description.
   * @param {string} name The command's name.
   * @param {string} description The command's description.
   */
  constructor(name, description) {
    super(name, description, {
      arguments: '[task...]',
      options: {
        tasks: _Options.default.tasks,
        'tasks-simple': _Options.default['tasks-simple'],
        'tasks-json': _Options.default['tasks-json'],
        continue: _Options.default.continue
      },
      strict: false
    });
  }
  /**
   * Runs gulp with the specified tasks.
   * @param {AtSCMCli} cli The current Cli instance.
   */


  run(cli) {
    const opts = {
      _: cli.options.task || [],
      tasks: cli.options.T,
      tasksSimple: cli.options.tasksSimple,
      tasksJson: cli.options.tasksJson,
      continue: cli.options.continue
    };
    process.env.ATSCM_CONFIG_PATH = cli.environment.configPath;
    process.env.CONTINUE_ON_FAILURE = cli.options.continue; // eslint-disable-next-line global-require

    require('gulp-cli/lib/versioned/^4.0.0/')(opts, {
      configPath: (0, _path.join)(cli.environment.modulePath, '../Gulpfile.js'),
      modulePath: (0, _path.join)(cli.environment.cwd, 'node_modules/gulp')
    }, {
      description: _chalk.default.bold('Available tasks:')
    });
  }

}

exports.default = RunCommand;
//# sourceMappingURL=Run.js.map