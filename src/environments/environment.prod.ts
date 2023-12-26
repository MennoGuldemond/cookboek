import packageJson from '../../package.json';

export const environment = {
  api: {
    url: 'http://localhost:3000',
  },
  google: {
    clientId: '135413077856-lrkj5n01tgl3bcbl0hpneg73s8blinh3.apps.googleusercontent.com',
  },
  production: true,
  version: packageJson.version,
};
