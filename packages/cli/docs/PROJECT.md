# Project structure and design

As stated in [root documentation](../README.md) with Qoq CLI we aim to provide minimal configuration for execution of multiple quality tools. In order to do so we provide:

1. **Config wizard** that creates qoq.config.js with selected options omitting defined defaults.
1. **Config handlers** that basically can omit defaults when writing config from wizard and apply defaults when we read config for CLI execution.
1. **Executors** that are responsible for executing tools with proper arguments, handle errors, timers etc.

**Structure:**

```
📦src
 ┣ 📂helpers
 ┃ ┗ ... // that holds all common helpers
 ┣ 📂modules
 ┃ ┣ 📂abstract
 ┃ ┃ ┣ 📜AbstractConfigHandler.ts // mandatory base for any ConfigHandler
 ┃ ┃ ┗ 📜AbstractExecutor.ts // mandatory base for any Executor
 ┃ ┣ 📂... // module handling for each tool including CLI itself
 ┃ ┣ 📜helpers.ts // modules helpers
 ┃ ┣ 📜index.ts // expose methods for ConfigHandlers and Executors usage
 ┃ ┗ 📜types.ts
 ┗ 📜index.ts // CLI execution file
```

## Config wizard

Every `ConfigHandler` needs to extend `AbstractConfigHandler` that has mandatory method `getPrompts`, all wizard questions and answers mapping lives there for particular module. Questions order is define in `./src/modules/index.ts` via sequence. Adding new module most likely will require to add some user prompts, whenever we can we should propose defult values, hardcoded in necessary or constructed from previous answers (all `ConfigHandler` classes has access to `modulesConfig` which holds config for all previous modules).

## Config handlers

As mentioned above first of all every `ConfigHandler` needs to extend `AbstractConfigHandler`, further more beside `getPrompts` descried above we have two methods:

- `getConfigFromModules` that omits all defaults from `IModulesConfig` in order to create `QoqConfig`, typpically for config file storage
- `getModulesFromConfig` that compares `QoqConfig` with defaults and adds them where neccessary to create `IModulesConfig`, typically when running CLI

## Executors

Every `Executor` needs to extend `AbstractExecutor` and implement:

- `getCommandName` that returns command name executed in shell
- `getCommandArgs` that returns static (non config dependent) command arguments array
- `getName` that returns command "human readable" name
- `prepare` that does all logic operations before command execution eg.:
  - add dynamic / remove command arguments
  - create config file that will be consummed by command

### Last but not least

CLI supports both CommonJS and ESM code, every config needs to be formatted by `formatCode` helper that will handle cases for both standards.
