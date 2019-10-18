#!/usr/bin/env node

const path = require('path');

const widgetDir = path.resolve(".");
const { initServer } = require('./dist/server/index');

initServer(widgetDir);
