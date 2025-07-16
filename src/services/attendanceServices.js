import API from './api'

export const getAttendance = () => API.get('/get_attendance')

export const createAttendance = data => API.post('/create_atendance', data)

export const updateAttendance = data =>
	API.put('/update_atendance', data, {
		params: { ident: data.id },
	})

export const deleteAttendance = data =>
	API.delete('/delete_atendance', { data })
