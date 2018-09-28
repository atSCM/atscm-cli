import { join } from 'path';
import expect from 'unexpected';
import { stub } from 'sinon';
import proxyquire from 'proxyquire';
import through from 'through2';
import Logger from '../../../src/lib/util/Logger';

const promised = async () => true;
promised.description = 'A task returning a Promise';

const streamed = () => {
  const stream = through.obj();

  setTimeout(() => stream.end(), 100);

  return stream;
};
streamed.description = 'A task returning a Stream';

const invalid = () => 13;
invalid.description = 'An invalid task';

const RunCommand = proxyquire.noCallThru()('../../../src/cli/commands/Run', {
  [join(__dirname, 'out/Gulpfile.js')]: {
    streamed,
    promised,
    invalid,
  },
}).default;

/** @test {RunCommand} */
describe('RunCommand', function() {
  const command = new RunCommand('run', 'Run tasks.');

  /** @test {RunCommand#run} */
  describe('#run', function() {
    const cli = {
      environment: {
        cwd: __dirname,
        modulePath: join(__dirname, 'out/index.js'),
      },
    };

    context('should print tasks', function() {
      beforeEach(() => {
        stub(console, 'info');
        stub(Logger, 'info');
      });
      afterEach(() => {
        console.info.restore();
        Logger.info.restore();
      });

      it('with `--tasks-simple` flag', function() {
        return command.run(Object.assign({ options: { tasksSimple: true } }, cli))
          .then(() => expect(console.info.lastCall.args[0], 'to match', /streamed\r?\npromised/));
      });

      it('with `--tasks-json` flag', function() {
        return command.run(Object.assign({ options: { tasksJson: true } }, cli))
          .then(() => expect(JSON.parse(console.info.lastCall.args[0])[0], 'to equal', {
            name: 'streamed',
            description: streamed.description,
          }));
      });

      it('with `--tasks` flag', function() {
        return command.run(Object.assign({ options: { tasks: true } }, cli))
          .then(() => expect(Logger.info.lastCall.args[0], 'to contain', invalid.description));
      });
    });

    it('should report unknown tasks', function() {
      return expect(command.run(Object.assign({ options: { task: ['unknown'] } }, cli)),
        'to be rejected')
        .then(err => {
          expect(err.message, 'to contain', 'Task never defined: unknown');
          expect(err.help, 'to contain', 'atscm run --tasks');
        });
    });

    context('with defined tasks', function() {
      it('should await returned promises', function() {
        return expect(command.run(Object.assign({ options: { task: ['promised'] } }, cli)),
          'to be fulfilled');
      });

      it('should wait for streams to end', function() {
        return expect(command.run(Object.assign({ options: { task: ['streamed'] } }, cli)),
          'to be fulfilled');
      });

      it('should report invalid task return types', function() {
        return expect(command.run(Object.assign({ options: { task: ['invalid'] } }, cli)),
          'to be rejected with', /A task must return a Promise or a Stream/);
      });
    });
  });
});
