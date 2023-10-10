#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import validateSchema from '../../services/schema/schemaValidator/validateSchema';
import validateQueryParamsBuilder from '../../services/query/queryParamsBuilderValidator/validateQueryParamsBuilder';
import validateTranslation from '../../services/translation/validate';

const helperText = `
Usage:
    widget-builder validate --schema sample-widget
    widget-builder validate --query-params sample-widget
    widget-builder validate --translation sample-widget
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
            const directory = path.resolve('.', name);
            
            if (options.schema) {
                validateSchema(directory);
            }

            if (options.queryParams) {
                validateQueryParamsBuilder(directory);
            }

            if (options.translation) {
                validateTranslation(directory);
            }
        });
};

export default validateCommands;
