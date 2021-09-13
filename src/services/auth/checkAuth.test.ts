import { log } from '../../messages';

import checkCredentials from './checkAuth';

describe('Auth credential status check', () => {
    beforeEach(() => {
        jest
            .spyOn(log, 'error')
            .mockImplementation(jest.fn());
    });

    it('succeeds if credentials are present', () => {
        const checkStatus = checkCredentials({
            authId: 'abc123',
            authToken: 'xyz456',
            apiPath: 'https://api.bigcommerce.com/stores/123jhas/v3',
        });

        expect(checkStatus).toEqual(true);
    });

    it('fails if any of the credentials are missing', () => {
        const checkStatus = checkCredentials({
            authId: 'abc123',
            authToken: '',
            apiPath: 'https://api.bigcommerce.com/stores/123jhas/v3',
        });

        expect(checkStatus).toEqual(false);
    });
});
