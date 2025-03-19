const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const path = './src/environments/';
const filename = 'environment.ts';

const envFileContent = `
export const environment = {
    production: false,
    api_key: "${ process.env['APIKEY_MAPBOX'] }",
};
`;

mkdirSync(path, {recursive: true});
writeFileSync(`${path}/${filename}`, envFileContent);