/* eslint-disable @typescript-eslint/no-explicit-any */

import Ajv from 'ajv';

import { log, messages } from '../../../messages';
import translationSchema from '../translationSchema/translationSchema';

const { default: betterAjvErrors } = require('better-ajv-errors');

export default class TranslationValidator {
    readonly schema: any;

    constructor(schema: any) {
        this.schema = schema;
    }

    validate = () => {
        const jsonValidator = new Ajv({
            jsonPointers: true,
        });

        const validator = jsonValidator.compile(translationSchema);
        const valid = validator(this.schema);

        if (!valid) {
            const output = betterAjvErrors(translationSchema, this.schema, validator.errors, {
                format: 'js',
            });
            log.error(JSON.stringify(output, null, 2));
        } else {
            log.info(messages.translationSchemaValidated());
        }
    };
}
