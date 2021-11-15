import Ajv from 'ajv';

import { log, messages } from '../../../messages';

import jsonQueryParamsBuilder from './jsonQueryParamsBuilder';

const { default: betterAjvErrors } = require('better-ajv-errors');

export default class QueryParamsBuilderValidator {
    readonly queryParamsBuilder: object;

    constructor(queryParamsBuilder: object) {
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

        return valid;
    };
}
