# Command line interface

> Please not that this module is **under heavy development**. Anything described in here may change in future versions.
> For an up-to-date list of commands and options run `atscm --help`.

## Commands

- **`run [tasks...]`** - Runs the specified tasks.
  
  If no command is specified when running *atscm*, this command will be used as the default, e.g. `atscm push` equals `atscm run push`. Running `atscm --tasks` will list all tasks available.
- **`init`** - Creates a new *atscm* project.
- **`config`** - Prints the current project's configuration.
- **`docs`** - Opens the *atscm* API documentation in a browser.
- **`update`** - Checks for *atscm* updates in the current project and installs a newer version if available. *(since atscm-cli version 0.3)*

## Options *(incomplete)*

> Options available vary on the command used. Run `atscm {command} --help` for a complete list of options.

- **`--help, -h`** - Prints usage information.
- **`--version, -v`** - Prints the current version.
- **`--log-level, -L`** - Sets the log level.

  There are multiple log levels available:
   
   - 0: Silent
   - 1: Error
   - 2: Warn
   - 3: Info (default)
   - 4: Debug

  Passing `-L` will only print errors, `-LLLL` will print debug information.
