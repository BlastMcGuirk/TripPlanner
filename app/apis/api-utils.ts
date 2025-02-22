export const GOOGLE_APIS_URL = 'https://www.googleapis.com';

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