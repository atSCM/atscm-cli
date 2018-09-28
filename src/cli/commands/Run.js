import { join } from 'path';
import { Stream } from 'stream';
import toPromise from 'stream-to-promise';
import humanizeDuration from 'humanize-duration';
import Command from '../../lib/cli/Command';
import Logger from '../../lib/util/Logger';
import CliOptions from '../Options';
import UsageError from '../../lib/error/UsageError';

/**
 * The command invoked when running "run".
 */
export default class RunCommand extends Command {

  /**
   * Creates a new {@link RunCommand} with the specified name and description.
   * @param {string} name The command's name.
   * @param {string} description The command's description.
   */
  constructor(name, description) {
    super(name, description, {
      arguments: '[task...]',
      options: {
        tasks: CliOptions.tasks,
        'tasks-simple': CliOptions['tasks-simple'],
        'tasks-json': CliOptions['tasks-json'],
        continue: CliOptions.continue,
      },
      strict: false,
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
      const getDuration = () => Logger.colors.magenta(humanizeDuration(Date.now() - start));
      const coloredName = `'${Logger.colors.cyan(name)}'`;

      Logger.info(`Starting ${coloredName}...`);

      try {
        const running = task(cli.options);

        if (running instanceof Promise) {
          await running;
        } else if (running instanceof Stream) {
          await toPromise(running);
        } else {
          throw new Error(`A task must return a Promise or a Stream, got a '${
            task.constructor.name
          }'
  Please report this error in the atscm repo (https://github.com/atSCM/atscm/issues)`);
        }

        Logger.info(`Finished ${coloredName} after ${getDuration()}`);
      } catch (e) {
        Logger.error(e);
        Logger.error(`${coloredName} ${Logger.colors.red('errored after')} ${getDuration()}`);
      }
    };

    // eslint-disable-next-line global-require
    const tasks = require(join(cli.environment.modulePath, '../Gulpfile.js'));

    if (cli.options.tasksSimple) {
      // eslint-disable-next-line no-console
      console.info(Object.keys(tasks).join('\n'));
      return;
    }

    if (cli.options.tasksJson) {
      // eslint-disable-next-line no-console
      console.info(JSON.stringify(
        Object.entries(tasks).map(([name, task]) => ({ name, description: task.description })),
        null,
        '  '
      ));
      return;
    }

    if (cli.options.tasks) {
      Logger.info(Logger.colors.bold('Available tasks:'));
      const maxNameLength = Object.keys(tasks).reduce((l, n) => Math.max(l, n.length), 0);

      Object.entries(tasks).forEach(([name, task]) => {
        Logger.info(`  ${Logger.colors.cyan(
          name.padEnd(maxNameLength)
        )}  ${Logger.colors.white(task.description)}`);
      });
      return;
    }

    const tasksToRun = cli.options.task || ['default'];

    tasksToRun.forEach(n => {
      if (!tasks[n]) {
        throw new UsageError(`Task never defined: ${n}`,
          'To list available tasks, try running atscm run --tasks');
      }
    });

    for (const task of tasksToRun) {
      await runTask(task, tasks[task]);
    }
  }

}
