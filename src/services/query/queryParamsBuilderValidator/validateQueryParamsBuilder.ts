import { log } from '../../../messages';
import { FileLoaderResponse } from '../../../types';
import queryParamsBuilderLoader from '../queryParamsBuilderLoader/queryParamsBuilderLoader';

import QueryParamsBuilderValidator from './queryParamsBuilderValidator';

export default function validateQueryParamsBuilder(directory: string) {
    return queryParamsBuilderLoader(directory)
        .then(({ data }: FileLoaderResponse) => {
            const queryParamsBuilder = JSON.parse(data);
            const validator = new QueryParamsBuilderValidator(queryParamsBuilder);
            validator.validate();
        })
        .catch((error: string) => {
            log.error(error);
        });
}
