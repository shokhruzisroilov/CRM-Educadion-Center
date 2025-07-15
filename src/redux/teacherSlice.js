import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getTeachers,
	createTeacher,
	updateTeacher,
	deleteTeacher,
} from '../services/teacherServices'

// 🔸 GET
export const fetchTeachers = createAsyncThunk('teachers/fetch', async () => {
	const res = await getTeachers()
	return res.data
})

// 🔸 POST
export const addTeacher = createAsyncThunk('teachers/add', async teacher => {
	const res = await createTeacher(teacher)
	return res.data
})

// 🔸 PUT
export const editTeacher = createAsyncThunk(
	'teachers/edit',
	async ({ id, data }) => {
		await updateTeacher(id, data)
		return { id, data }
	}
)

// 🔸 DELETE
export const removeTeacher = createAsyncThunk('teachers/remove', async id => {
	await deleteTeacher(id)
	return id
})

const teacherSlice = createSlice({
	name: 'teachers',
	initialState: {
		teachers: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTeachers.pending, state => {
				state.loading = true
			})
			.addCase(fetchTeachers.fulfilled, (state, action) => {
				state.teachers = action.payload
				state.loading = false
			})
			.addCase(fetchTeachers.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(addTeacher.fulfilled, (state, action) => {
				state.teachers.push(action.payload)
			})
			.addCase(editTeacher.fulfilled, (state, action) => {
				const index = state.teachers.findIndex(t => t.id === action.payload.id)
				if (index !== -1) {
					state.teachers[index] = {
						id: action.payload.id,
						...action.payload.data,
					}
				}
			})
			.addCase(removeTeacher.fulfilled, (state, action) => {
				state.teachers = state.teachers.filter(t => t.id !== action.payload)
			})
	},
})

export default teacherSlice.reducer
