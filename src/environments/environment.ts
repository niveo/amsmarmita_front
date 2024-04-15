import version from './version';

export const environment = {
  titulo: 'Clube da Marmita',
  production: true,
  apiUri: 'https://amsmarmita-back.vercel.app',
  ...version,
  imageKitPublicKey: '',
  imageKitUrlEndpoint: '',
};
