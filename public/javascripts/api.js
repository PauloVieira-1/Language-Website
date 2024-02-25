export default class API {
	static get(path, headers) {
		return fetch("/" + path, {
			method: "GET",
			headers,
		});
	}

	static async post(path, body, headers) {
		const res = await fetch("/" + path, {
			method: "POST",
			body,
			headers,
		});
		const text = await res.text();

		return text.startsWith("{") ? JSON.parse(text) : text;
	}
}

function call(path, body) {}
