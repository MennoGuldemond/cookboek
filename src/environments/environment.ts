import packageJson from '../../package.json';

export const environment = {
  firebase: {
    projectId: 'cookboek-45150',
    appId: '1:135413077856:web:f00958cfaee4963897f005',
    databaseURL: 'https://cookboek-45150.firebaseio.com',
    storageBucket: 'cookboek-45150.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDOq6N8Q1aqpNxYfjQR7c6MqVcMHsIYa_k',
    authDomain: 'cookboek-45150.firebaseapp.com',
    messagingSenderId: '135413077856',
    measurementId: 'G-XG8NBTBCPE',
  },
  production: false,
  version: packageJson.version,
};
