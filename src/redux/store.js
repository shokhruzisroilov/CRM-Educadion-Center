import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import studentsReducer from './studentsSlice'
// import teachersReducer from './teachersSlice'
// import attendanceReducer from './attendanceSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		students: studentsReducer,
		// teachers: teachersReducer,
		// attendance: attendanceReducer,
	},
})

export default store
