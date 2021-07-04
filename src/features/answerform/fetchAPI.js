const baseUrl = 'http://localhost:3004/answers'

export async function fetchAPI(payload) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: payload
    }).then(response => response.json())
    return response
}
