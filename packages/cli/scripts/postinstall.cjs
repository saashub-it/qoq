#!/usr/bin/env node

'use strict';

const { exec } = require( 'child_process' );

exec(`cd ${process.cwd()} && qoq --warmup`)