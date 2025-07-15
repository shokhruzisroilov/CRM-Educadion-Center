import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getGroups,
	createGroup,
	updateGroup,
	deleteGroup,
} from '../services/groupServices'

export const fetchGroups = createAsyncThunk('groups/fetch', async () => {
	const res = await getGroups()
	return res.data
})

export const addGroup = createAsyncThunk('groups/add', async group => {
	const res = await createGroup(group)
	return res.data
})

export const editGroup = createAsyncThunk('groups/edit', async group => {
	await updateGroup(group)
	return group
})

export const removeGroup = createAsyncThunk('groups/remove', async id => {
	await deleteGroup(id)
	return id
})

const groupSlice = createSlice({
	name: 'groups',
	initialState: {
		groups: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGroups.pending, state => {
				state.loading = true
			})
			.addCase(fetchGroups.fulfilled, (state, action) => {
				state.groups = action.payload
				state.loading = false
			})
			.addCase(fetchGroups.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(addGroup.fulfilled, (state, action) => {
				state.groups.push(action.payload)
			})
			.addCase(editGroup.fulfilled, (state, action) => {
				const idx = state.groups.findIndex(g => g.name === action.payload.name)
				if (idx !== -1) state.groups[idx] = action.payload
			})
			.addCase(removeGroup.fulfilled, (state, action) => {
				state.groups = state.groups.filter(
					g =>
						g.name !== action.payload.name &&
						g.user_id !== action.payload.user_id
				)
			})
	},
})

export default groupSlice.reducer
