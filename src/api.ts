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
		}
	});

	if (res.ok) {
		const paste = await res.json();

		if (paste.encrypted) {
			if (!password) throw { status: 401, message: "No password" } as PasteError;

			const salt = base64ToArrayBuffer(paste.salt);
			const titleIV = base64ToArrayBuffer(paste.title_iv);
			const contentIV = base64ToArrayBuffer(paste.content_iv);

			try {
				paste.title = await decrypt(base64ToArrayBuffer(paste.title), password, salt, titleIV);
				paste.content = await decrypt(base64ToArrayBuffer(paste.content), password, salt, contentIV);
			} catch (err) {
				throw { status: 401, message: "Incorrect password" } as PasteError;
			}
		}

		return paste;
	} else {
		const message = await res.text();
		throw { status: res.status, message } as PasteError;
	}
}

// todo: password regex
export async function newPaste(title: string, content: string, language: "plain-text", password: string) {
	const version = 2;
	let body;

	if (title.length == 0 || content.length == 0) throw { status: 400, message: "Missing fields" };

	if (password) {
		const salt = crypto.getRandomValues(new Uint8Array(16));
		const titleIV = crypto.getRandomValues(new Uint8Array(12));
		const contentIV = crypto.getRandomValues(new Uint8Array(12));

		body = {
			version,
			encrypted: true,
			title: await encrypt(title, password, salt, titleIV),
			content: await encrypt(content, password, salt, contentIV),
			language,
			title_iv: btoa(String.fromCharCode(...titleIV)),
			content_iv: btoa(String.fromCharCode(...contentIV)),
			salt: btoa(String.fromCharCode(...salt))
		};
	} else {
		body = {
			version,
			encrypted: false,
			title,
			content,
			language
		};
	}

	const res = await fetch(`https://api-paste.squidee.dev/new`, {
		method: "POST",
		mode: "cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (res.ok) {
		const data = await res.json();
		return data.id;
	} else {
		const message = await res.text();
		throw { status: res.status, message };
	}
}

function base64ToArrayBuffer(str: string) {
	return new Uint8Array(
		atob(str)
			.split("")
			.map((char) => char.charCodeAt(0))
	);
}

async function deriveKey(password: string, salt: Uint8Array<ArrayBuffer>) {
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
	return await crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt,
			iterations: 100000,
			hash: "SHA-256"
		},
		key,
		{ name: "AES-GCM", length: 256 },
		true,
		["encrypt", "decrypt"]
	);
}

async function encrypt(data: string, password: string, salt: Uint8Array<ArrayBuffer>, iv: Uint8Array<ArrayBuffer>) {
	const derivedKey = await deriveKey(password, salt);
	const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, derivedKey, new TextEncoder().encode(data));

	return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
}

async function decrypt(data: Uint8Array<ArrayBuffer>, password: string, salt: Uint8Array<ArrayBuffer>, iv: Uint8Array<ArrayBuffer>) {
	const derivedKey = await deriveKey(password, salt);
	const decryptedData = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, derivedKey, data);

	return new TextDecoder().decode(decryptedData);
}
