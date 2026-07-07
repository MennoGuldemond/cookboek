import { environment } from '@env/environment';

export const environmentPostfix = environment.stage === 'prd' ? '' : ` (${environment.stage})`;
export const appVersion = environment.version;
