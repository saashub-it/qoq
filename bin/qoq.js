"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const [, , cmd, ...args] = process.argv;
if (cmd !== 'install') {
    console.log(`Usage:
  qoq install`);
    process.exit(2);
}
//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const packageJsonPath = (0, path_1.resolve)(__dirname, '../package.json');
        (0, fs_1.readFile)(packageJsonPath, 'utf8', (readError, data) => {
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
            (0, fs_1.writeFile)(packageJsonPath, JSON.stringify(packageJsonObject, undefined, 2), { flag: 'w+' }, (writeError) => {
                if (writeError) {
                    throw writeError;
                }
            });
        });
    });
})().catch((error) => {
    console.log(error);
    process.exit(2);
});
