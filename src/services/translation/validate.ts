import { FileLoaderResponse } from '../../types';
import { log } from '../../messages';

import TranslationValidator from './translationValidator/translationValidator';
import translationLoader from './translationLoader/translationLoader';

export default function validateTranslation(directory: string) {
    return translationLoader(directory)
        .then(({ data }: FileLoaderResponse) => {
            const schema = JSON.parse(data);
            const validator = new TranslationValidator(schema);
            validator.validate();
        })
        .catch((error: string) => {
            log.error(error);
        });
}
