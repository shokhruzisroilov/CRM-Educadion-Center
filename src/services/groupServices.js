import API from './api'

export const getGroups = () => API.get('/get_kurish')
export const createGroup = group => API.post('/admin_guruh_yaratish', group)
export const updateGroup = group =>
	API.put(`/admin_yangilash_guruh?ident=${group.id}`, group)
export const deleteGroup = id => API.delete(`/admin_guruh_uchirsh?ident=${id}`)
