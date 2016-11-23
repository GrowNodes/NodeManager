import reactCookie from 'react-cookie';


export const API_SERVER = 'http://192.168.188.131:3000'
export const API_URL = `${API_SERVER}/api/client`

export function authedApiRequest(method, path, body) {
	const authToken = reactCookie.load('authorization');

	return new Request(API_URL+path, {
        method: method,
        headers: new Headers({
            'Content-Type' : 'application/json',
            'Authorization' : authToken
        }),
        body
    });
}
