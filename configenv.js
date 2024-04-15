const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: '.env' });;

const packageJson = require('./package.json');
const gitVersion = require('./git-version.json');

const versaoSistemaVersao = packageJson.version;

const versaoSistemaCodigo = parseInt(
    versaoSistemaVersao.replace(/\./gi, '')
);
const versaoSistemaDescricao =
    'Versão: ' + versaoSistemaVersao + ' ' + ' ( ' + gitVersion.shortSHA + ' )';


const envFile = `export const environment = {
    titulo: '${process.env.TITULO}',
    production: '${process.env.PRODUCTION}',
    apiUri: '${process.env.API_URL}',
    imageKitPublicKey: '${process.env.IMAGEKIT_PUBLIC_KEY}',
    imageKitUrlEndpoint: '${process.env.IMAGEKIT_URL_ENDPOINT}', 
    versaoSistemaVersao: '${versaoSistemaVersao}',
    versaoSistemaCodigo: ${versaoSistemaCodigo},
    versaoSistemaDescricao: '${versaoSistemaDescricao}',
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.ts`);
    }
});