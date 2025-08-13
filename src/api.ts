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
			const saltBuffer = base64ToArrayBuffer(paste.salt);
			const ivBuffer = base64ToArrayBuffer(paste.iv);
			const contentBuffer = base64ToArrayBuffer(paste.content);

			const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
			const derivedKey = await crypto.subtle.deriveKey(
				{
					name: "PBKDF2",
					salt: saltBuffer,
					iterations: 100000,
					hash: "SHA-256"
				},
				key,
				{ name: "AES-GCM", length: 256 },
				true,
				["encrypt", "decrypt"]
			);

			try {
				const decryptedContent = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuffer }, derivedKey, contentBuffer);
				let content = new TextDecoder().decode(decryptedContent);
				content = content.slice(0, content.lastIndexOf("~", content.lastIndexOf("~") - 1));

				paste.content = content;
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
		// stored in plain text on the database
		// only used to prevent an incorrect password from being used, which would yield a malformed paste
		const magic = `~SQUIDPASTE_MAGIC${String.fromCharCode(...crypto.getRandomValues(new Uint8Array(8)))
			.split("~")
			.join("")}~`;
		const data = new TextEncoder().encode(content + magic);
		const salt = crypto.getRandomValues(new Uint8Array(16));

		const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
		const derivedKey = await crypto.subtle.deriveKey(
			{
				name: "PBKDF2",
				salt: salt,
				iterations: 100000,
				hash: "SHA-256"
			},
			key,
			{ name: "AES-GCM", length: 256 },
			true,
			["encrypt", "decrypt"]
		);

		const iv = crypto.getRandomValues(new Uint8Array(12));
		const encryptedContent = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, derivedKey, data);

		body = {
			version,
			encrypted: true,
			title,
			content: btoa(String.fromCharCode(...new Uint8Array(encryptedContent))),
			language,
			iv: btoa(String.fromCharCode(...iv)),
			salt: btoa(String.fromCharCode(...salt)),
			magic
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
