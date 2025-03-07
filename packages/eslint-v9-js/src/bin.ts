#!/usr/bin/env node
import { name } from '../package.json';

import { executeInspector } from './tools';

executeInspector(name);
