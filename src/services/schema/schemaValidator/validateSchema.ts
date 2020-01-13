import { log } from '../../../messages';
import { FileLoaderResponse } from '../../../types';
import schemaLoader from '../schemaLoader/schemaLoader';

import SchemaValidator from './schemaValidator';

export default function validateSchema(directory: string) {
    return schemaLoader(directory)
        .then(({ data }: FileLoaderResponse) => {
            const schema = JSON.parse(data);
            const validator = new SchemaValidator(schema);
            validator.validate();
        })
        .catch((error: string) => {
            log.error(error);
        });
}
