export const setAuthData = ({ id, access_token, role, token_type }) => {
	localStorage.setItem(
		'auth',
		JSON.stringify({
			id,
			token: access_token,
			role,
			token_type,
		})
	)
}

export const getAuthData = () => {
	const data = localStorage.getItem('auth')
	return data ? JSON.parse(data) : null
}

export const clearAuthData = () => {
	localStorage.removeItem('auth')
}
