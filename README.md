# Widget Builder [![CircleCi](https://circleci.com/gh/bigcommerce/widget-builder.svg?style=svg&circle-token=b4d4a370c5cdee3585da202fd0e81a9febbb6059)](https://circleci.com/gh/bigcommerce/widget-builder)
Widget builder is a developer tool that can be used while developing a widget.

## Getting started

### Prerequisite
```
node 14
npm 6.14
```
### Installation
```sh
npm run install-cli;
```

After installation is complete, you may move to any directory in order to test by running: `widget-builder -h`
to render the usage information. It should look something like:
```
Usage: widget-builder [options] [command]

Options:
  -V, --version                  output the version number
  --gen-config                   generate a config.json file
  --gen-query-params             generate a queryParams.json file
  --auto-open <flag>             open browser automatically to the builder preview (default: "true")
  -h, --help                     display help for command

Commands:
  init                           Initialization of widget builder configuration
  start [options] [widgetPath]   starts the widget builder locally
  validate [options] <file>
  create <widget-template-name>  Create a blank widget template
  publish <widget-template>      Releases the widget template to the store belonging to the env config
  help [command]                 display help for command
```

### Authentication
In order to use the widget-builder, you must have the `Content` or `Content Read-Only` scope
when creating your store API credentials.<br/>

The following the [Obtaining store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials) will help you get started.<br/>

**<span style="color: red;">!!</span> Warning <span style="color: red;">!!</span>** You cannot run the widget builder without
the proper API Credentials.

### Configurations
For your convenience, We've provided a walk through to set up your stores environment. Simply run:
```sh
widget-builder init
```

Output:
```
Thank you for using Widget Builder

            
This guide will help you get your enviornment set up.

Before continuing, please make sure you've created or have been provided a Store API account.
You'll need those credentials in order to generate the appropriate configurations.
You can find more information here. https://support.bigcommerce.com/s/article/Store-API-Accounts#creating

? Are you ready to continue? You may press any key to continue Yes
? What is the Client ID? xxxxxxxxxxxxx
? What is the Access Token? xxxxxxxxxxxx
? What is the API Path? https://api.bigcommerce.com/stores/xxxxx/v3/
[2021-08-16T20:35:02.652Z] Successfully created your configuration, you're all set!
```
Once you're done, the `.env` file will be created for you with the necessary parameter assignment.

#### Resetting Configurations
If for any reason you need to reset the configurations, simply re-run the command again, and the configurations will be overwritten by the new configurations.

#### Different store configurations
If you're managing more than one store, you can create another directory and re-run the init command with that particular store's configuration.
Each directory that you've initialized will have its own `.env` allowing you to create many directories of widget templates for different stores.

### Usage
Simply run `widget-builder start [path to widget template]` in a directory containing the files that make up a widget template.

For help on which commands to run, you can use `-h or --help`.

```
Usage: widget-builder start /[widgetPath] || ''

starts the widget builder locally

Arguments:
  widgetPath   Path to widget template, default resolves to current directory

Options:
  --auto-open  automatically open the browser (default: true)
  -h, --help   display help for command
```

## Getting Started
For ease of getting started, we provide a blank template out of the box with the appropriate files needed to start building your widget immediately.
Simply run:
```sh
widget-builder create [widget template-name]
```

Output:
```
widget-builder create sample-widget-template-two

[2021-08-16T20:23:56.300Z] Successfully created ./sample-widget-template-two
[2021-08-16T20:23:56.302Z] Successfully created schema.json in ./sample-widget-template-two/schema.json
[2021-08-16T20:23:56.302Z] Successfully created config.json in ./sample-widget-template-two/config.json
[2021-08-16T20:23:56.303Z] Successfully created widget.html in ./sample-widget-template-two/widget.html
[2021-08-16T20:23:56.359Z] Starting widget-builder at http://localhost:8080!
```

Your default browser should open, and you should be off and running!

### Publishing to stores
If you're finished and ready to publish to the store, run the command:
```
widget-builder publish [path to widget-template
```

Output
```
[2021-08-16T20:53:11.631Z] New publishes now will update instead of creating a new instance
[2021-08-16T20:53:11.631Z] sample-widget-template successfully published!
```

Once the widget template has been published, every subsequent publish will update the widget template instead to avoid having many instance of the same widget.

Update Output:
```
[2021-08-16T20:54:09.223Z] Successfully updated sample-widget-template
```

## Contributions

If you wish to contribute, please refer to our [contribution guide](CONTRIBUTING.md)
and [code of conduct](CODE_OF_CONDUCT.md) for this project.

### Issues / Bugs

* Please include a clear, specific title and replicable description.

* Please include your environment, OS, and any exceptions/backtraces that occur. The more
information that is given, the more likely we can debug and fix the issue.

**If you find a security bug, please do not post as an issue. Send directly to [security@bigcommerce.com](mailto:security@bigcommerce.com)
instead.**

Thank you again for your interest in contributing to the Widget Builder!

Copyright (C) 2019-Present BigCommerce Inc. All rights reserved.
