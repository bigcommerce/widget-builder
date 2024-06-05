#!/usr/bin/env node

import { Command } from 'commander';

import createStarterTemplate from './create/starterTemplate';
import start from './run/start';
import widgetTemplatePublish from './deployment/widgetTemplatePublish';
import widgetTemplateDelete from './delete/widgetTemplateRemove';
import widgetTemplateDownload from './download/widgetTemplateDownload';
import validateCommands from './run/validate';
import init from './run/init';

const { version } = require('../../package.json');

const cli = new Command();

cli
    .version(version)
    .addCommand(init())
    .addCommand(start())
    .addCommand(validateCommands())
    .addCommand(createStarterTemplate())
    .addCommand(widgetTemplatePublish())
    .addCommand(widgetTemplateDelete())
    .addCommand(widgetTemplateDownload());

cli.parse(process.argv);
