export const GOOGLE_APIS_URL = 'https://www.googleapis.com';

/**
 * Generates HTTP request options.
 * @param method The HTTP method (GET, POST, etc.).
 * @param userToken The user auth token.
 * @param body Optional request body.
 * @returns The generated options.
 */
function generateRequestOptions(method: string, userToken?: string, body?: object) {
    return {
        method,
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
}

/**
 * Sends off an HTTP request with a given auth token and body information.
 * @param url The URL of the request.
 * @param userToken The user auth token.
 * @param method The HTTP method (GET, POST, etc.).
 * @param body Optional request body.
 * @returns The result of the HTTP request.
 */
export function fetchWithAuth(url: string, userToken?: string, method: string = 'GET', body?: object) {
    return fetch(url, generateRequestOptions(method, userToken, body))
        .catch(e => {
            throw new Error("Error sending request", e);
        })
        .then(res => {
            try {
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                return res.json();
            }
            catch (e) {
                console.log(e)
            }
        })
        .catch(e => {
            throw new Error("Error parsing response", e);
        });
}