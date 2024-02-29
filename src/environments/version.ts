import packageJson from '../../package.json';
import gitVersion from '../../git-version.json';
export const versaoSistemaVersao = packageJson.version;
export const versaoSistemaCodigo = parseInt(
  versaoSistemaVersao.replace(/\./gi, '')
);
export const versaoSistemaDescricao =
  'Versão: ' + versaoSistemaVersao + ' ' + ' ( ' + gitVersion.shortSHA + ' )';

export default {
  versaoSistemaVersao,
  versaoSistemaCodigo,
  versaoSistemaDescricao,
};
