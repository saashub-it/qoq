import { resolve } from 'path';
import { writeFile, readFile } from 'fs';

const [, , cmd, ...args] = process.argv;

if (cmd !== 'install') {
  console.log(`Usage:
  qoq install`);
  process.exit(2);
}

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

(async function main() {
  const packageJsonPath = resolve(__dirname, '../package.json');

  readFile(packageJsonPath, 'utf8', (readError, data) => {
    if (readError) {
      throw readError;
    }

    const packageJsonObject = JSON.parse(data);
    const { scripts } = packageJsonObject;

    scripts['qoq:check'] = 'run-p qoq:check:*';
    scripts['qoq:fix'] = 'run-s qoq:fix:*';

    // prettier
    scripts['qoq:check:prettier'] = 'prettier --check . --ignore-unknown';
    scripts['qoq:staged:prettier'] = 'prettier --check --ignore-unknown';
    scripts['qoq:fix:1prettier'] = 'npm run qoq:check:prettier -- --write';

    // eslint
    scripts['qoq:check:eslint'] = 'eslint "./src/**/*.+(js|jsx|ts|tsx)" --cache';
    scripts['qoq:staged:eslint'] = 'eslint --cache';
    scripts['qoq:fix:2eslint'] = 'npm run qoq:check:eslint-- --fix';

    // jscpd
    scripts['qoq:check:jscpd'] = 'jscpd ./src/';

    // unimported
    scripts['qoq:check:unimported'] = 'unimported';

    writeFile(
      packageJsonPath,
      JSON.stringify(packageJsonObject, undefined, 2),
      { flag: 'w+' },
      (writeError) => {
        if (writeError) {
          throw writeError;
        }
      },
    );
  });
})().catch((error) => {
  console.log(error);
  process.exit(2);
});
