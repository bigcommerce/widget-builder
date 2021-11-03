/* eslint class-methods-use-this: 0 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { flattenDeep } from 'lodash';

import {
    QueryParamBuilder,
    StorefrontApiQueryParams,
    WidgetConfiguration,
} from '../../schema/schemaParser/schemaParser';

export default class QueryParamFactory {
    storefrontApiQuery: string;

    queryParamBuilder: QueryParamBuilder;

    widgetConfiguration: WidgetConfiguration;

    constructor(
        storefrontApiQuery: string,
        queryParamBuilder: QueryParamBuilder,
        widgetConfiguration: WidgetConfiguration,
    ) {
        this.storefrontApiQuery = storefrontApiQuery;
        this.queryParamBuilder = queryParamBuilder;
        this.widgetConfiguration = widgetConfiguration;
    }

    render(): StorefrontApiQueryParams {
        return this.build();
    }

    build(): StorefrontApiQueryParams {
        const result = {};
        Object.keys(this.queryParamBuilder).forEach((query) => {
            const data = this.queryParamBuilder[query];
            const dataToRead = data.reads;
            const dataType = data.type;
            if (this.isNestedData(dataToRead)) {
                const parsedData = this.parseData(dataToRead);

                if (Array.isArray(parsedData)) {
                    result[query] = this.handleArrayData(dataType, parsedData);
                } else {
                    result[query] = this.handleDataType(dataType, parsedData);
                }
            } else {
                result[query] = this.handleDataType(dataType, this.widgetConfiguration[dataToRead]);
            }
        });

        return result;
    }

    isNestedData(dataToRead: string) {
        return dataToRead.indexOf('.') !== -1;
    }

    isNullable(dataType: string) {
        return dataType.indexOf('!') === -1;
    }

    isEmpty(dataType: string, dataItem: any) {
        return dataItem === null || this.isNaN(dataType, dataItem) || dataItem === undefined;
    }

    isNaN(dataType: string, dataItem: any) {
        const shouldReturnNumber = (dataType.indexOf('Int') !== -1 || dataType.indexOf('Float') !== -1);

        return shouldReturnNumber && (
            Number.isNaN(parseFloat(dataItem)) || Number.isNaN(parseInt(dataItem, 10))
        );
    }

    handleArrayData(dataType: string, dataToRead: any) {
        const flattenedData = flattenDeep(dataToRead);

        if (this.isNullable(dataType)) {
            return flattenedData.map((item: any) => this.handleDataType(dataType, item));
        }
        const result: any[] = [];
        flattenedData.forEach((item: any) => {
            if (!this.isEmpty(dataType, item)) {
                result.push(this.handleDataType(dataType, item));
            }
        });

        return result;
    }

    handleDataType(dataType: string, dataToRead: any) {
        let pureDataType = dataType;
        if (this.isNullable(dataType)) {
            if (this.isEmpty(dataType, dataToRead)) {
                return null;
            }
        } else {
            pureDataType = dataType.slice(0, dataType.length - 1);
        }

        switch (pureDataType) {
        case 'Boolean':
            return !!dataToRead;
        case 'Float':
            return parseFloat(dataToRead);
        case 'Int':
            return parseInt(dataToRead, 10);
        case 'String':
            return typeof dataToRead === 'string' ? dataToRead : JSON.stringify(dataToRead);
        default:
            return dataToRead;
        }
    }

    parseData(dataToRead: string) {
        const dataComponents = dataToRead.split('.');
        const startingIteration = this.widgetConfiguration[dataComponents[0]];

        return this.extractValue(startingIteration, dataComponents, 0);
    }

    extractValue(iteration: any, dataComponents: string[], index: number): any {
        if (dataComponents.length - 1 < index) { return iteration; }

        if (Array.isArray(iteration)) {
            const result: any[] = [];
            iteration.forEach((item: any) => {
                const value = this.extractValue(item, dataComponents, index + 1);
                result.push(value);
            });

            return result;
        }

        if (iteration && typeof iteration === 'object') {
            return this.extractValue(iteration[dataComponents[index + 1]], dataComponents, index + 1);
        }

        return iteration;
    }
}
