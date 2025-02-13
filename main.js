import { httpRequest } from 'http-request';
import { logger } from 'log';

export async function onClientRequest(request) {
    try {
        const url = '';
        const harperToken = '';
        const requestHeaders =  { 
            'Authorization': `Basic ${harperToken}`,
            'Content-Type': 'application/json',
            'path': request.path
        }
        const options = {
            method: 'GET',
            headers: requestHeaders
        };
        const response = await httpRequest(url, options);

        if (response.status === 200) {
            const redirectRule = await response.json();
            if (redirectRule) {
                return request.respondWith(
                    redirectRule.statusCode,
                    { Location: [redirectRule.redirectURL] },
                    ''
                )
            }
        }
    } catch(exception) {
        logger.log(`Error occured while calling HDB: ${exception.message}`);
    }
}