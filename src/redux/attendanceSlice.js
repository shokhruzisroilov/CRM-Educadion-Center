import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getAttendance,
	createAttendance,
	updateAttendance,
	deleteAttendance,
} from '../services/attendanceServices'

export const fetchAttendance = createAsyncThunk(
	'attendance/fetch',
	async () => {
		const res = await getAttendance()
		return res.data
	}
)

export const addAttendance = createAsyncThunk(
	'attendance/add',
	async record => {
		const res = await createAttendance(record)
		return res.data
	}
)

export const editAttendance = createAsyncThunk(
	'attendance/edit',
	async record => {
		await updateAttendance(record)
		return record
	}
)

export const removeAttendance = createAsyncThunk(
	'attendance/remove',
	async record => {
		await deleteAttendance(record)
		return record
	}
)

const attendanceSlice = createSlice({
	name: 'attendance',
	initialState: {
		records: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchAttendance.pending, state => {
				state.loading = true
			})
			.addCase(fetchAttendance.fulfilled, (state, action) => {
				state.records = action.payload
				state.loading = false
			})
			.addCase(fetchAttendance.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(addAttendance.fulfilled, (state, action) => {
				state.records.push(action.payload)
			})
			.addCase(editAttendance.fulfilled, (state, action) => {
				const idx = state.records.findIndex(r => r.id === action.payload.id)
				if (idx !== -1) {
					state.records[idx] = action.payload
				}
			})
			.addCase(removeAttendance.fulfilled, (state, action) => {
				state.records = state.records.filter(r => r.id !== action.payload.id)
			})
	},
})

export default attendanceSlice.reducer
