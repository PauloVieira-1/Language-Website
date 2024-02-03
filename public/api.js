export default class API {
	static get(path) {
		return fetch("/" + path, {
			method: "GET",
		});
	}
	static post(path, body) {
		return fetch("/" + path, {
			method: "POST",
			body,
		}).then(async (res) => {
			const text = await res.text();
			if (text.startsWith("{")) return JSON.parse(text);
		});
	}
}

function call(path, body) {}
