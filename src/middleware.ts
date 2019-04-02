import { HttpResponse, ZObject, Bundle } from "zapier-platform-core";

const handleHttpError = (response: HttpResponse, z: ZObject) => {
    if (response.status >= 400) {
        z.console.log(`Status: ${response.status}`);
        z.console.log(`Content: ${response.content}`);
        z.console.log(`Request: ${JSON.stringify(response.request)}`);

        throw new Error(`Got an unexpected response from the JotForm API: ${response.content}`);
    }

    return response;
};

const addApiKey = (request: any, z: ZObject, bundle: Bundle) => {
    const api_key = process.env.API_KEY || bundle.authData.api_key;

    if (api_key) {
        request.headers = request.headers || {};
        request.headers['APIKEY'] = api_key;
    }

    return request;
};

const Middleware = {
    AddApiKey: addApiKey,
    HandleHttpError: handleHttpError
};

export default Middleware;