import {TranslocoGlobalConfig} from '@jsverse/transloco-utils';
import { SUPPORTED_LANGUAGES } from 'src/app/helpers/constants';
    
const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: SUPPORTED_LANGUAGES,
  keysManager: {}
};
    
export default config;