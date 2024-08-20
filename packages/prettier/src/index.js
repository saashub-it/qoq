import {existsSync, rmSync, writeFileSync} from 'fs'
import config from './config.js'

const path = './index.json';

if (existsSync(path)) {
    rmSync(path)
}

writeFileSync(path, JSON.stringify(config, undefined, 2))

