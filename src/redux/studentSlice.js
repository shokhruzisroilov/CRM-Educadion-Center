import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getStudents,
	createStudent,
	updateStudent,
	archiveStudent,
	deleteStudent,
} from '../services/studentServices'

export const fetchStudents = createAsyncThunk('students/fetch', async () => {
	const res = await getStudents()
	return res.data
})

export const addStudent = createAsyncThunk('students/add', async student => {
	const res = await createStudent(student)
	return res.data
})

export const editStudent = createAsyncThunk('students/edit', async student => {
	const { id, ...data } = student
	await updateStudent(id, data)
	return { id, ...data }
})

export const archiveStudentById = createAsyncThunk(
	'students/archive',
	async id => {
		await archiveStudent(id)
		return id
	}
)

export const removeStudent = createAsyncThunk('students/remove', async id => {
	await deleteStudent(id)
	return id
})

const studentSlice = createSlice({
	name: 'students',
	initialState: {
		students: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchStudents.pending, state => {
				state.loading = true
			})
			.addCase(fetchStudents.fulfilled, (state, action) => {
				state.students = action.payload
				state.loading = false
			})
			.addCase(fetchStudents.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(addStudent.fulfilled, (state, action) => {
				state.students.push(action.payload)
			})
			.addCase(editStudent.fulfilled, (state, action) => {
				const idx = state.students.findIndex(s => s.id === action.payload.id)
				if (idx !== -1) state.students[idx] = action.payload
			})
			.addCase(archiveStudentById.fulfilled, (state, action) => {
				const student = state.students.find(s => s.id === action.payload)
				if (student) student.is_archived = true
			})
			.addCase(removeStudent.fulfilled, (state, action) => {
				state.students = state.students.filter(s => s.id !== action.payload)
			})
	},
})

export default studentSlice.reducer
