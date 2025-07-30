import axios from 'axios';

// Replace with your actual BigCommerce store hash and access token
import AUTH_CONFIG from '../auth/authConfig';

const BASE_URL = `${AUTH_CONFIG.apiPath}/content/`;

type ObjectType = 'widgets' | 'widget-templates'

async function getAll(wType: ObjectType) {
    try {
        const response = await axios.get(BASE_URL + wType, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Client': AUTH_CONFIG.authId,
                'X-Auth-Token': AUTH_CONFIG.authToken,
            },
        });
        const widgets = response.data.data;
        if (!widgets || widgets.length === 0) {
            console.log('No widgets found.');
            return;
        }
        console.log('Widget List:');
        console.table(widgets.map((widget: any) => ({ uuid: widget.uuid, name: widget.name })))
    } catch (error: any) {
        console.error('Error fetching widgets:', error.response?.data || error.message);
    }
}



export default getAll;