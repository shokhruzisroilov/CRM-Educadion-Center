import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import studentsReducer from './studentSlice'
import teachersReducer from './teacherSlice'
import groupsReducer from './groupSlice'
import attendanceReducer from './attendanceSlice'
import userReducer from './userSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		students: studentsReducer,
		teachers: teachersReducer,
		groups: groupsReducer,
		attendance: attendanceReducer,
		users: userReducer,
	},
})

export default store
