import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginRequest } from '../services/authServices'
import { setAuthData, getAuthData, clearAuthData } from '../utils/tokenStorage'

const savedAuth = getAuthData()

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
	token: savedAuth?.token || null,
	id: savedAuth?.id || null,
	role: savedAuth?.role || null,
	token_type: savedAuth?.token_type || 'bearer',
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.token = null
			state.role = null
			state.id = null
			state.token_type = null
			clearAuthData()
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				const { id, access_token, role, token_type } = action.payload

				state.loading = false
				state.token = access_token
				state.role = role
				state.id = id
				state.token_type = token_type

				setAuthData({ id, access_token, role, token_type })
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
