'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _options = require('./lib/options');

var cliOptions = _interopRequireWildcard(_options);

var _Logger = require('./lib/util/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commands = [{
  usage: 'run [tasks..]',
  description: 'Run gulp tasks',
  options: cliOptions.run,
  demandCommands: [0]
}, {
  usage: 'docs',
  description: 'Open documentation',
  options: {
    cli: {
      desc: 'Open CLI documentation',
      type: 'boolean',
      default: false
    }
  },
  demandCommands: [0, 0]
}];
/*   run: ,
  docs: {
    usage: 'docs',
    description: 'Open documentation',
    options: {
      cli: {
        desc: 'Open CLI documentation',
        type: 'boolean',
        default: false,
      },
    },
  },
}; */

const args = ['docs', '--cli', 'asdf'];

if (!['run', 'docs', '--help', '--config', '--version'].includes(args[0])) {
  args.unshift('run');
}

const parser = commands.reduce((p, c) => {
  return p.command(c.usage, c.description, y => {
    y.usage(`Usage: $0 ${ c.usage }`);
    y.option(c.options);

    y.group(Object.keys(c.options), 'Command specific options:');
    y.group(Object.keys(cliOptions.global), 'Global options:');

    y.help();
    y.strict();
    y.demandCommand(...c.demandCommand);
  }, () => console.log(`Run command: ${ c.usage }`));
}, (0, _yargs2.default)(args).option(cliOptions.global).global(Object.keys(cliOptions.global)).strict().help().alias('help', 'h').fail((msg, err, y) => {
  console.log(_Logger2.default.colors.red(msg), '\n');
}));

/* const parser = yargs(args)
  .usage('Usage: [usage=run]')
  // .strict()
  .option(cliOptions.GlobalOptions)
  .command('run <tasks..>', 'Runs a command', y => {
    y.usage('Usage: $0 run <tasks..>')
    y.option(cliOptions.run);
    y.strict();
  }, () => console.Logger('RUN'))
  .command('docs', 'Open documentation', y => {
    y.usage('Usage: $0 docs');

    y.option({
      cli: {
        desc: 'Open CLI documentation',
        type: 'boolean',
        default: false,
      },
    });

    y.group('cli', 'Command specific options:');
    y.group(Object.keys(cliOptions.GlobalOptions), 'Global options:');

    y.help();
    y.strict();
  }, opts => console.Logger('Open docs', opts.cli ? 'cli' : 'local'))
  .help()
  .GlobalOptions(Object.keys(cliOptions.GlobalOptions)); */

console.log('Got options', parser.argv);
