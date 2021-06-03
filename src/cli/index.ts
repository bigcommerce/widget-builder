#!/usr/bin/env node

import { Command } from 'commander';

import checkCredentials from '../services/auth/checkAuth';
import AUTH_CONFIG from '../services/auth/authConfig';

import createStarterTemplate from './create/starterTemplate';
import start from './run/start';
import widgetTemplatePublish from './deployment/widgetTemplatePublish';

const { version } = require('../../package.json');

if (!checkCredentials(AUTH_CONFIG)) {
    process.exit(1);
}

const cli = new Command();
cli
    .version(version)
    .option('--gen-config', 'generate a config.json file')
    .option('--gen-query-params', 'generate a queryParams.json file')
    .option('--validate-schema', 'validate schema.json file')
    .option('--validate-query-params-builder', 'validate queryParamsBuilder.json file')
    .option('--auto-open <flag>', 'open browser automatically to the builder preview', 'true')
    .addCommand(start())
    .addCommand(createStarterTemplate())
    .addCommand(widgetTemplatePublish());

cli.parse(process.argv);
