# Widget Builder
Widget builder is a developer tool that can be used while developing a widget,

## Getting started
### Authentication
To make requests to our API, you must register as a developer and have your credentials ready. You can also create OAuth credentials within the BigCommerce Control Panel.

Also very important: For the OAuth authentication mechanism, the resources to which you have acccess depend on the scopes that are associated to the access token. For more information about Store API scopes, see: [OAuth Scopes](https://developer.bigcommerce.com/api/scopes).

In order to use the widget-builder, you must have the `Content` or `Content Read-Only` scope.

### Configuration
The widget builder reads the credentials from environment variables. You will need to make sure these are either set at the system level, or you can pass them in at runtime of the CLI.

- `WIDGET_BUILDER_AUTH_ID` - The primary identifier of this set of credentials (Client ID).
- `WIDGET_BUILDER_AUTH_TOKEN` - The private authorization token (Auth token).

- `WIDGET_BUILDER_STORE_HASH` - The primary hash identifier of the store the credentials belong to.

You can also run using a format like the following:

```
WIDGET_BUILDER_AUTH_ID=REDACTED WIDGET_BUILDER_AUTH_TOKEN=REDACTED WIDGET_BUILDER_STORE_HASH=REDACTED widget-builder
```

### Running the builder
Simply run `widget-builder` in a directory containing the files that make up a widget template.

For help on which commands to run, you can use `--help`.

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
