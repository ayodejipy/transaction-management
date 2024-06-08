export default function useEndpoints(key: string) {
	const apiUrls: Record<string, string> = {
		'authUrl': '/auth',
		'refreshTokenUrl': '/refresh-token'
	}

	if(!apiUrls[key]) {
		throw new Error(`No API URL found for key: ${key}`)
	}


	return apiUrls[key]
}