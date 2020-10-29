import * as dotenv from 'dotenv';
const envVars = dotenv.config();
const config = envVars.parsed;
console.log('config is', config);
Object.freeze(config);
export default config;