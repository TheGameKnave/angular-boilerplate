import { exec } from 'child_process';
import { SUPPORTED_LANGUAGES } from '..\\..\\client\\src\\app\\helpers\\constants';

const schemaPath = 'translation.schema.json';
const translationsDir = '..\\..\\client\\src\\assets\\i18n';

SUPPORTED_LANGUAGES.forEach((lang) => {
  const command = `..\\..\\node_modules\\.bin\\ajv -s ${schemaPath} -d ${translationsDir}\\${lang}.json --strict=false`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Validation failed for ${lang}.json:\n`, stderr);
    } else {
      console.log(`Validation passed for ${lang}.json`);
    }
  });
});