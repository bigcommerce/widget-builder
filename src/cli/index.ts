#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import checkCredentials from '../services/auth/checkAuth';
import AUTH_CONFIG from '../services/auth/authConfig';
import startWidgetBuilder from '../server';

const { version } = require('../../package.json');

const widgetDir = path.resolve('.');

const cli = new Command();
cli
    .version(version)
    .option('--gen-config', 'generate a config.json file')
    .option('--gen-query-params', 'generate a queryParams.json file')
    .option('--validate-schema', 'validate schema.json file')
    .option('--validate-query-params-builder', 'validate queryParamsBuilder.json file')
    .option('--auto-open <flag>', 'open browser automatically to the builder preview', 'true');

cli.parse(process.argv);

if (!checkCredentials(AUTH_CONFIG)) {
    process.exit(1);
}

startWidgetBuilder(
    widgetDir,
    {
        autoOpen: cli.autoOpen === 'true',
        generateConfig: cli.genConfig,
        generateQueryParams: cli.genQueryParams,
        validateSchema: cli.validateSchema,
        validateQueryParamsBuilder: cli.validateQueryParamsBuilder,
    },
);
