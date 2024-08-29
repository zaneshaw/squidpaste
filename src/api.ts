export interface PasteError {
	status: number;
	message: string;
}

export async function getPaste(id: string, password: string | undefined = undefined) {
	const res = await fetch(`https://api-paste.squidee.dev/paste?id=${id}`, {
		method: "POST",
		mode: "cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ password })
	});

	if (res.ok) {
		const paste = await res.json();
		return paste;
	} else {
		const message = await res.text();
		throw { status: res.status, message } as PasteError;
	}
}

// todo: password regex
export async function newPaste(title: string, content: string, password: string) {
	const res = await fetch(`https://api-paste.squidee.dev/new`, {
		method: "POST",
		mode: "cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ title, content, password })
	});

	if (res.ok) {
		const data = await res.json();
		return data.id;
	} else {
		const message = await res.text();
		throw { status: res.status, message };
	}
}
