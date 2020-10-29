import { IConfig } from './IConfig';
const enVars = require('dotenv').config();
console.log('Inside config', enVars);

const config: IConfig = enVars.parsed;
Object.freeze(config);

export default config;