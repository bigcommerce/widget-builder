import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';

import { log, messages } from '../../../messages';

import jsonQueryParamsBuilder from './jsonQueryParamsBuilder';

export default class QueryParamsBuilderValidator {
    readonly queryParamsBuilder: any;

    constructor(queryParamsBuilder: any) {
        this.queryParamsBuilder = queryParamsBuilder;
    }

    validate = () => {
        const jsonValidator = new Ajv({
            jsonPointers: true,
        });

        const validator = jsonValidator.compile(jsonQueryParamsBuilder);
        const valid = validator(this.queryParamsBuilder);

        if (!valid) {
            const output = betterAjvErrors(jsonQueryParamsBuilder, this.queryParamsBuilder, validator.errors, {
                format: 'js',
            });
            log.error(JSON.stringify(output, null, 2));
        } else {
            log.info(messages.queryParamsBuilderValidated());
        }
    };
}
