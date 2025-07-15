import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../services/userServices'

// 🔸 GET /view_users
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
	const res = await getUsers()
	return res.data
})

const userSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.loading = true
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload
				state.loading = false
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
	},
})

export default userSlice.reducer
