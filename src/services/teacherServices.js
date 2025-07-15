import API from './api'

// GET
export const getTeachers = () => API.get('/get_teacher')

// POST
export const createTeacher = teacher => API.post('/create_teachers', teacher)

// PUT (edit)
export const updateTeacher = (id, teacher) =>
	API.put(`/teachers_edit?ident=${id}`, teacher)

// DELETE
export const deleteTeacher = id => API.delete(`/teachers_vomiting?ident=${id}`)
