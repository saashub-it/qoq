#!/usr/bin/env node

import { executeInspector } from '@saashub/qoq-eslint-v9-js/tools';

import { name } from '../package.json';

executeInspector(name);
