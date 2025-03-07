#!/usr/bin/env node
'use strict';

const child_process = require('child_process');

const child = child_process.spawn(
  'npx',
  ['-y', '@eslint/config-inspector', '--config', 'eslint.config-inspector.js'],
  { shell: true }
);

child.stdout.on('data', (data) => {
  process.stdout.write(data.toString('utf-8'));
});

child.stderr.on('data', (data) => {
  process.stderr.write(data.toString('utf-8'));
});
