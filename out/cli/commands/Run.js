'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _stream = require('stream');

var _streamToPromise = require('stream-to-promise');

var _streamToPromise2 = _interopRequireDefault(_streamToPromise);

var _humanizeDuration = require('humanize-duration');

var _humanizeDuration2 = _interopRequireDefault(_humanizeDuration);

var _Command = require('../../lib/cli/Command');

var _Command2 = _interopRequireDefault(_Command);

var _Logger = require('../../lib/util/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Options = require('../Options');

var _Options2 = _interopRequireDefault(_Options);

var _UsageError = require('../../lib/error/UsageError');

var _UsageError2 = _interopRequireDefault(_UsageError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked when running "run".
 */
class RunCommand extends _Command2.default {

  /**
   * Creates a new {@link RunCommand} with the specified name and description.
   * @param {string} name The command's name.
   * @param {string} description The command's description.
   */
  constructor(name, description) {
    super(name, description, {
      arguments: '[task...]',
      options: {
        tasks: _Options2.default.tasks,
        'tasks-simple': _Options2.default['tasks-simple'],
        'tasks-json': _Options2.default['tasks-json'],
        continue: _Options2.default.continue
      },
      strict: false
    });
  }

  /**
   * Runs gulp with the specified tasks.
   * @param {AtSCMCli} cli The current Cli instance.
   */
  async run(cli) {
    process.env.ATSCM_CONFIG_PATH = cli.environment.configPath;
    process.env.CONTINUE_ON_FAILURE = cli.options.continue;

    const runTask = async (name, task) => {
      const start = Date.now();
      const getDuration = () => _Logger2.default.colors.magenta((0, _humanizeDuration2.default)(Date.now() - start));
      const coloredName = `'${_Logger2.default.colors.cyan(name)}'`;

      _Logger2.default.info(`Starting ${coloredName}...`);

      try {
        const running = task(cli.options);

        if (running instanceof Promise) {
          await running;
        } else if (running instanceof _stream.Stream) {
          await (0, _streamToPromise2.default)(running);
        } else {
          throw new Error(`A task must return a Promise or a Stream, got a '${task.constructor.name}'
  Please report this error in the atscm repo (https://github.com/atSCM/atscm/issues)`);
        }

        _Logger2.default.info(`Finished ${coloredName} after ${getDuration()}`);
      } catch (e) {
        _Logger2.default.error(e);
        _Logger2.default.error(`${coloredName} ${_Logger2.default.colors.red('errored after')} ${getDuration()}`);
      }
    };

    // eslint-disable-next-line global-require
    const tasks = require((0, _path.join)(cli.environment.modulePath, '../Gulpfile.js'));

    if (cli.options.tasksSimple) {
      // eslint-disable-next-line no-console
      console.info(Object.keys(tasks).join('\n'));
      return;
    }

    if (cli.options.tasksJson) {
      // eslint-disable-next-line no-console
      console.info(JSON.stringify(Object.entries(tasks).map(([name, task]) => ({ name, description: task.description })), null, '  '));
      return;
    }

    if (cli.options.tasks) {
      _Logger2.default.info(_Logger2.default.colors.bold('Available tasks:'));
      const maxNameLength = Object.keys(tasks).reduce((l, n) => Math.max(l, n.length), 0);

      Object.entries(tasks).forEach(([name, task]) => {
        _Logger2.default.info(`  ${_Logger2.default.colors.cyan(name.padEnd(maxNameLength))}  ${_Logger2.default.colors.white(task.description)}`);
      });
      return;
    }

    const tasksToRun = cli.options.task || ['default'];

    tasksToRun.forEach(n => {
      if (!tasks[n]) {
        throw new _UsageError2.default(`Task never defined: ${n}`, 'To list available tasks, try running atscm run --tasks');
      }
    });

    for (const task of tasksToRun) {
      await runTask(task, tasks[task]);
    }
  }

}
exports.default = RunCommand;
//# sourceMappingURL=Run.js.map