export async function getPaste(id: string) {
	const res = await fetch(`https://api-paste.squidee.dev/paste?id=${id}`, { mode: "cors" });

	if (res.ok) {
		const paste = await res.json();
		return paste;
	} else {
		const message = await res.text();
		throw { status: res.status, message };
	}
}

export async function newPaste(title: string, content: string) {
	const res = await fetch(`https://api-paste.squidee.dev/new`, {
		method: "POST",
		mode: "cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ title, content })
	});

	if (res.ok) {
		const data = await res.json();
		return data.id;
	} else {
		const message = await res.text();
		throw { status: res.status, message };
	}
}
