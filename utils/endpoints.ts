export default function getEndpoints(key: string) {
	const apiUrls: Record<string, string> = {
		'authUrl': '/auth',
		'loginUrl': '/auth/token',
		'refreshTokenUrl': '/auth/refresh-token',
		'forgotPasswordUrl': '/auth/forgot-password',
		'resetPasswordUrl': '/auth/reset-password',
		'userProfileUrl': '/users/profile',
		'userInviteUrl': '/users/invites',
		'userInviteAcceptUrl': '/users/invites/accept',
		'categoriesUrl': '/categories',
		'typesUrl': '/types',
		'totalStatsUrl': '/stats/totals',
		'monthlyStatsUrl': '/stats/monthly-totals',
		'totalRevenueUrl': '/stats/total-revenue',
		'percentageStatsUrl': '/stats/credits-debits-percentage',
		'transactionsUrl': '/transactions'
	}

	if (!apiUrls[key]) {
		throw new Error(`No API URL found for key: ${key}`)
	}


	return apiUrls[key]
}