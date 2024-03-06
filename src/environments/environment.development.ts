import version from './version';

export const environment = {
  production: false,
  apiUri: 'http://192.168.0.129:3000',
  ...version,
};
