import version from './version';

export const environment = {
  titulo: 'Clube da Marmita',
  production: false,
  apiUri: 'http://192.168.0.129:3000',
  ...version,
};
