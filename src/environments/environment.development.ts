import version from './version';

export const environment = {
  titulo: 'Clube da Marmita',
  production: false,
  apiUri: 'http://localhost:3000',
  ...version,
};
