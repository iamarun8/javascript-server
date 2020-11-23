import * as dotenv from 'dotenv';
import { IConfig } from './IConfig';
// const enVars = require('dotenv').config();
const enVars = dotenv.config();
console.log('Inside config', enVars);

const config: any = enVars.parsed;
Object.freeze(config);

export default config;