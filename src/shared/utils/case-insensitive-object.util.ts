export function caseInsensitiveObject<T>(
	body: Record<string, T>, 
	convertCase: (key: string) => string 
): Record<string, T> {
	const object: Record<string, T> = {}; 
	Object.keys(body).forEach((key) => {
		object[convertCase(key)] = body[key];
	});
	return object;
}
