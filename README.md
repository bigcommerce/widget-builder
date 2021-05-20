# Widget Builder [![CircleCi](https://circleci.com/gh/bigcommerce/widget-builder.svg?style=svg&circle-token=b4d4a370c5cdee3585da202fd0e81a9febbb6059)](https://circleci.com/gh/bigcommerce/widget-builder)
Widget builder is a developer tool that can be used while developing a widget.

## Getting started

### Prerequisite
```aidl
node 14
npm 6.14

```
### Installation
```aidl
1. npm install; npm run install-cli;
```

After installation is complete, you may move to any directory in order to test by running: `widget-builder -h`
to render the usage information. It should look something like:
```aidl
Usage: widget-builder [options]

Options:
  -V, --version                    output the version number
  --gen-config                     generate a config.json file
  --gen-query-params               generate a queryParams.json file
  --validate-schema                validate schema.json file
  --validate-query-params-builder  validate queryParamsBuilder.json file
  --auto-open <flag>               open browser automatically to the builder preview (default: "true")
  -h, --help                       output usage information
```

### Authentication
In order to use the widget-builder, you must have the `Content` or `Content Read-Only` scope
when creating your store API credentials.<br/>

The following the [Obtaining store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials) will help you get started.<br/>

**<span style="color: red">!!</span> Warning <span style="color: red">!!</span>** You cannot run the widget builder without
the proper API Credentials.

### Configuration
For your convenience, we've provided a file called `.env-sample`. Please copy and rename it
to `.env` into any directory that you wish to develop your widget in and replace the values with your credentials

- `WIDGET_BUILDER_AUTH_ID` - The primary identifier of this set of credentials (Client ID).
- `WIDGET_BUILDER_AUTH_TOKEN` - The private authorization token (Auth token).
- `WIDGET_BUILDER_CHANNEL_ID` - The channel id of the storefront that is being tested.
- `WIDGET_BUILDER_STORE_HASH` - The primary hash identifier of the store the credentials belong to.

You may also run the widget builder with inline config if you choose by running:

```
WIDGET_BUILDER_AUTH_ID={AUTH_STRING} WIDGET_BUILDER_AUTH_TOKEN={AUTH_TOKEN} WIDGET_BUILDER_STORE_HASH={STORE_HASH} WIDGET_BUILDER_CHANNEL_ID={CHANNEL_ID} widget-builder
```

### Usage
Simply run `widget-builder` in a directory containing the files that make up a widget template.

For help on which commands to run, you can use `-h or --help`.

```
$ widget-builder --help
Usage: widget-builder [options]

Options:
  -V, --version       output the version number
  --gen-config        generate a config.json file
  --validate-schema   validate schema.json file
  --auto-open <flag>  open browser automatically to the builder preview (default: "true")
  -h, --help          output usage information
```

## Development
For instructions to build and develop locally, please refer to: [building CLI for local testing](https://github.com/bigcommerce/widget-builder/wiki/Building-CLI-for-local-testing).

## Contribution

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
