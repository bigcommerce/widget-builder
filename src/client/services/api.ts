import Axios from 'axios';

export const widgetAPI = {
    getTitle: () => '/api/getTitle',
};

export function getTitle() {
    return Axios.get(widgetAPI.getTitle())
        .then(({ data: { title } }) => title);
}
