import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchTeachers,
	addTeacher,
	editTeacher,
	removeTeacher,
} from '../redux/teacherSlice'
import { fetchUsers } from '../redux/userSlice'

const TeachersPage = () => {
	const dispatch = useDispatch()
	const { teachers, loading } = useSelector(state => state.teachers)
	const { users } = useSelector(state => state.users)

	const [newTeacher, setNewTeacher] = useState({
		subject: '',
		user_id: '',
		date_time: '',
		salary: '',
	})
	const [editingId, setEditingId] = useState(null)

	useEffect(() => {
		dispatch(fetchTeachers())
		dispatch(fetchUsers()) // ✅ userlarni olish
	}, [dispatch])

	const handleSubmit = e => {
		e.preventDefault()
		const data = {
			...newTeacher,
			user_id: Number(newTeacher.user_id),
			salary: Number(newTeacher.salary),
		}

		if (editingId) {
			dispatch(editTeacher({ id: editingId, data })).then(() => {
				dispatch(fetchTeachers())
			})
		} else {
			dispatch(addTeacher(data)).then(() => {
				dispatch(fetchTeachers())
			})
		}

		setNewTeacher({ subject: '', user_id: '', date_time: '', salary: '' })
		setEditingId(null)
	}

	const handleEdit = teacher => {
		setNewTeacher({
			subject: teacher.subject,
			user_id: teacher.user_id,
			date_time: teacher.date_time,
			salary: teacher.salary,
		})
		setEditingId(teacher.id)
	}

	const handleDelete = id => {
		if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			dispatch(removeTeacher(id)).then(() => {
				dispatch(fetchTeachers())
			})
		}
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
				O'qituvchilar
			</h2>
			<form onSubmit={handleSubmit} className='mb-6 space-y-2'>
				<input
					type='text'
					placeholder='Fan nomi'
					value={newTeacher.subject}
					onChange={e =>
						setNewTeacher({ ...newTeacher, subject: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>

				{/* 🔽 Foydalanuvchini tanlash select orqali */}
				<select
					value={newTeacher.user_id}
					onChange={e =>
						setNewTeacher({ ...newTeacher, user_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				>
					<option value=''>Foydalanuvchini tanlang</option>
					{users.map(user => (
						<option key={user.id} value={user.id}>
							{user.username || user.full_name || `User ${user.id}`}
						</option>
					))}
				</select>

				<input
					type='datetime-local'
					value={newTeacher.date_time}
					onChange={e =>
						setNewTeacher({ ...newTeacher, date_time: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='number'
					placeholder='Maosh'
					value={newTeacher.salary}
					onChange={e =>
						setNewTeacher({ ...newTeacher, salary: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<button
					type='submit'
					disabled={loading}
					className='bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600'
				>
					{editingId ? 'Saqlash' : "+ Qo'shish"}
				</button>
			</form>

			{/* Jadval */}
			<table className='w-full border-collapse'>
				<thead className='bg-gray-200 text-left'>
					<tr>
						<th className='p-2'>#</th>
						<th className='p-2'>ID</th>
						<th className='p-2'>Fan</th>
						<th className='p-2'>Foydalanuvchi ID</th>
						<th className='p-2'>Boshlanish vaqti</th>
						<th className='p-2'>Maosh</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{teachers.map((teacher, index) => (
						<tr key={teacher.id} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{teacher.id}</td>
							<td className='p-2'>{teacher.subject}</td>
							<td className='p-2'>{teacher.user_id}</td>
							<td className='p-2'>
								{new Date(teacher.date_time).toLocaleString()}
							</td>
							<td className='p-2'>
								{Number(teacher.salary).toLocaleString()} so'm
							</td>
							<td className='p-2 space-x-2'>
								<button
									onClick={() => handleEdit(teacher)}
									className='bg-blue-500 text-white px-3 py-1 rounded'
								>
									✏️
								</button>
								<button
									onClick={() => handleDelete(teacher.id)}
									className='bg-red-500 text-white px-3 py-1 rounded'
								>
									🗑️
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TeachersPage
