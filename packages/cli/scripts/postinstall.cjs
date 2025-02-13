#!/usr/bin/env node

'use strict';

const { execSync } = require( 'child_process' );

return execSync(`cd ${process.cwd()} && qoq --warmup`)