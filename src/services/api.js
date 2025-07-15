import axios from 'axios'

const API = axios.create({
	baseURL: 'http://192.168.237.90:8000',
	headers: {
		'Content-Type': 'application/json',
	},
})

API.interceptors.request.use(
	config => {
		const auth = localStorage.getItem('auth')
		if (auth) {
			const parsed = JSON.parse(auth)
			if (parsed.token) {
				config.headers.Authorization = `Bearer ${parsed.token}`
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default API
