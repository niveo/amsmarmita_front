import version from './version';

export const environment = {
  production: false,
  apiUri: 'http://localhost:3000',
  ...version,
};
