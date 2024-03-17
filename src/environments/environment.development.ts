import version from './version';

export const environment = {
  titulo: 'Clube da Marmita',
  production: false,
  apiUri: 'http://172.23.81.123:3000',
  ...version,
};
