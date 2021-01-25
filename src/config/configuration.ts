import * as dotenv from 'dotenv';
import { IConfig } from './IConfig';
// const enVars = require('dotenv').config();
console.log('Inside Configuratation');
const enVars = dotenv.config();
console.log('Inside config', enVars);

const config: any = enVars.parsed;
const password = process.env.PASSWORD
console.log('password -> ',password, ' and type is ', typeof(password));
Object.freeze( {config, password: config.PASSWORD} );

export default config;