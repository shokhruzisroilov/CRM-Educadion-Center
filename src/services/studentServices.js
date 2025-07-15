import API from './api'

export const getStudents = () => API.get('/get_student')
export const createStudent = student => API.post('/create_users', student)
export const updateStudent = (id, student) =>
	API.put(`/student_edit?ident=${id}`, student)
export const archiveStudent = id => API.patch(`/archive/${id}`)
export const deleteStudent = id => API.delete(`/delete_student?ident=${id}`)
