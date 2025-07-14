import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginRequest } from '../services/authServices'
import { getToken, setToken, clearToken } from '../utils/tokenStorage'

// 🔹 Login thunk
export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const data = await loginRequest(username, password)
			return data
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Login xatosi')
		}
	}
)

const initialState = {
	token: getToken() || null,
	role: 'admin',
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.token = null
			clearToken()
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false
				state.token = action.payload.access_token
				state.role = action.payload.role
				setToken(action.payload.access_token)
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
