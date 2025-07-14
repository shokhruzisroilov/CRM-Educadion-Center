import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../utils/axiosInstance'

export const fetchStudents = createAsyncThunk('students/fetch', async () => {
	const res = await axios.get('/students')
	return res.data
})

const studentsSlice = createSlice({
	name: 'students',
	initialState: {
		students: [],
	},
	extraReducers: builder => {
		builder.addCase(fetchStudents.fulfilled, (state, action) => {
			state.students = action.payload
		})
	},
})

export default studentsSlice.reducer
