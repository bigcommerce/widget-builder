import checkCredentials from './checkAuth';

describe('Auth credential status check', () => {
    it('succeeds if credentials are present', () => {
        const checkStatus = checkCredentials({
            storeHash: '123456',
            authId: 'abc123',
            authToken: 'xyz456',
        });

        expect(checkStatus).toEqual(true);
    });

    it('fails if any of the credentials are missing', () => {
        const checkStatus = checkCredentials({
            storeHash: '123456',
            authId: 'abc123',
            authToken: '',
        });

        expect(checkStatus).toEqual(false);
    });
});
