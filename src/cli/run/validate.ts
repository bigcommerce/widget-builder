#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import validateSchema from '../../services/schema/schemaValidator/validateSchema';
import validateQueryParamsBuilder from '../../services/query/queryParamsBuilderValidator/validateQueryParamsBuilder';
import validateTranslation from '../../services/translation/validate';

const helperText = `
Usage:
    --validate-schema sample-widget/schema.json
    --validate-query-params sample-widget/queryParamsBuilder.json
`;

const validateCommands = () => {
    const program = new Command('validate');

    return program
        .arguments('<file>')
        .option('--schema', 'validates schema.json file')
        .option('--query-params', 'validates queryParamsBuilder.json file')
        .option('--translation', 'validates schema_translation.json file')
        .addHelpText('afterAll', helperText)
        .action((name, options) => {
            const directory = path.resolve('.');
            if (options.validateSchema) {
                validateSchema(directory);
            }

            if (options.validateQueryParamsBuilder) {
                validateQueryParamsBuilder(directory);
            }

            if (options.translation) {
                validateTranslation(directory);
            }
        });
};

export default validateCommands;
