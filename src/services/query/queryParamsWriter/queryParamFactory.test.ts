import fs from 'fs';

import QueryParamFactory from './queryParamFactory';

const configData = JSON.parse(fs.readFileSync('src/services/__fixtures__/config.json', 'utf8').toString());
const builderData = JSON.parse(fs.readFileSync('src/services/__fixtures__/queryParamsBuilder.json', 'utf8').toString());
const queryData = fs.readFileSync('src/services/__fixtures__/query.graphql', 'utf8').toString();

describe('queryParamFactory', () => {
    it('correctly loads query params', () => {
        const factory = new QueryParamFactory(queryData, builderData, configData);
        expect(factory.build()).toMatchSnapshot();
    });
});
