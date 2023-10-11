const baseURL = "http://localhost:3000"

export function post(url: string, data: Record<string, any>) {
    const endpoint = baseURL + url;
    return fetch(endpoint, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "post"
    })
}


export function put(url: string, data: Record<string, any>) {
    const endpoint = baseURL + url;
    return fetch(endpoint, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "put"
    })
}

export function del(url: string, data: Record<string, any>) {
    const endpoint = baseURL + url;
    return fetch(endpoint, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "delete"
    })
}

export async function get(url: string) {
    const endpoint = baseURL + url;
    return (await fetch(endpoint, {
        cache: "no-store"
    })).json()
}
