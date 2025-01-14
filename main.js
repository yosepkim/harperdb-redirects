import { httpRequest } from 'http-request';

const URL_REGEX = /\/sku\/(?<sku>[a-zA-Z0-9]+)\/(?<suffix>.*)/;

export async function onClientRequest(request) {
    const regexMatch = request.url.match(URL_REGEX);

    try {
        if (regexMatch) {
            const sku = regexMatch.groups.sku;

            const url = `https://bb.edgecloud9.com/Redirects/?sku=${sku}`;
            const harperToken = '';
            const options = {
                method: 'GET',
                headers: { 'Authorization': `Basic ${harperToken}`, 'Content-Type': 'application/json' },
            };
            const response = await httpRequest(url, options);
            const payload = await response.json();
            const productData = payload[0];

            //request.respondWith(200, {}, JSON.stringify(productData) + "-" + sku);
            if (productData) {
                const newUrl = `/products/${productData.tag}/${regexMatch.groups.suffix}`

                request.respondWith(301, { location: [newUrl] }, "");
            }
        }
    } catch (exception) {
        request.respondWith(500, {}, exception);
    }
}