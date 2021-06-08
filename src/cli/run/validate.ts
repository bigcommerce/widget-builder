#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import validateSchema from '../../services/schema/schemaValidator/validateSchema';
import validateQueryParamsBuilder from '../../services/query/queryParamsBuilderValidator/validateQueryParamsBuilder';

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
        .addHelpText('afterAll', helperText)
        .action((options) => {
            const directory = path.resolve('.');
            if (options.validateSchema) {
                validateSchema(directory);
            }

            if (options.validateQueryParamsBuilder) {
                validateQueryParamsBuilder(directory);
            }
        });
};

export default validateCommands;
