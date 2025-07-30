#!/usr/bin/env node

import { Command } from 'commander';

import createStarterTemplate from './create/starterTemplate';
import start from './run/start';
import widgetTemplatePublish from './deployment/widgetTemplatePublish';
import validateCommands from './run/validate';
import init from './run/init';
import listWidgets from './manage/listWidgets';

const { version } = require('../../package.json');

const cli = new Command();

cli
    .version(version)
    .addCommand(init())
    .addCommand(start())
    .addCommand(validateCommands())
    .addCommand(createStarterTemplate())
    .addCommand(widgetTemplatePublish())
    .addCommand(listWidgets());

cli.parse(process.argv);
