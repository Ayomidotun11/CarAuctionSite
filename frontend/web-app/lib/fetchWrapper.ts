/* eslint-disable @typescript-eslint/no-empty-object-type */
import { auth } from "@/auth";


const baseUrl = process.env.API_URL;

async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        header: await getHeaders()
    }

    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function post(url: string, body: {}) {
    const requestOptions = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function put(url: string, body: {}) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function handleResponse(response: Response) {
    const text = await response.text();
    // const data = text && JSON.parse(text);
    let data;
    try {
        data = JSON.parse(text);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) { 

        data = text;
        
    }

    if (response.ok) {
        return data || response.statusText;
    } else {
        const error = {
            status: response.status,
            message: typeof data === 'string' ? data : response.statusText
        }
        return {error};
    }
}



async function getHeaders(): Promise<Headers> {
    const session = await auth();
    const headers = new Headers();
    headers.set('Content-type', 'application/json');
    if (session) {
        headers.set('Authorization', 'Bearer ' + session.access_token)
    }
    return headers;
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
}