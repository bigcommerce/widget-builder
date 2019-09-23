import Axios from 'axios';

export const exampleApi = {
    getTitle: () => '/api/getTitle', // example
};

export function getTitle() {
    return Axios.get(exampleApi.getTitle())
        .then(({ data: { title } }) => title);
}
