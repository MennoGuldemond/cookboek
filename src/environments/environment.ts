import packageJson from '../../package.json';

export const environment = {
  api: {
    url: 'http://localhost:3000',
  },
  production: false,
  version: packageJson.version,
};
