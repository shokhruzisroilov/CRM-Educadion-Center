import API from './api'

export const loginRequest = async (username, password) => {
	const formData = new URLSearchParams()
	formData.append('username', username)
	formData.append('password', password)

	const response = await API.post('/token', formData, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})

	return response.data
}
