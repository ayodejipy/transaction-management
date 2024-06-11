export default function useEndpoints(key: string) {
	const apiUrls: Record<string, string> = {
		'authUrl': '/auth/token',
		'refreshTokenUrl': '/auth/refresh-token',
		'forgotPasswordUrl': '/auth/forgot-password',
		'resetPasswordUrl': '/auth/reset-password',
		'userProfileUrl': '/users/profile',
		'userInviteUrl': '/users/invites',
		'userInviteAcceptUrl': '/users/invites/accept',
		'categoriesUrl': '/categories',
		'typesUrl': '/types',
	}

	if(!apiUrls[key]) {
		throw new Error(`No API URL found for key: ${key}`)
	}


	return apiUrls[key]
}