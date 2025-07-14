import { useEffect, useState } from 'react'

const TeachersPage = () => {
	const [teachers, setTeachers] = useState([])
	const [newTeacher, setNewTeacher] = useState({
		subject: '',
		user_id: '',
		date_time: '',
		salary: '',
	})
	const [editingId, setEditingId] = useState(null)

	// 🔄 Fake API for testing
	const fakeApi = {
		data: [
			{
				id: 1,
				subject: 'Matematika',
				user_id: 1001,
				date_time: '2025-07-14T08:00:00',
				salary: 1500000,
			},
		],
		get() {
			return Promise.resolve({ data: this.data })
		},
		post(teacher) {
			const newData = { ...teacher, id: Date.now() }
			this.data.push(newData)
			return Promise.resolve({ data: newData })
		},
		put(id, updated) {
			this.data = this.data.map(t => (t.id === id ? { ...t, ...updated } : t))
			return Promise.resolve()
		},
		delete(id) {
			this.data = this.data.filter(t => t.id !== id)
			return Promise.resolve()
		},
	}

	const fetchTeachers = async () => {
		const res = await fakeApi.get()
		setTeachers(res.data)
	}

	useEffect(() => {
		fetchTeachers()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (editingId) {
			await fakeApi.put(editingId, newTeacher)
		} else {
			await fakeApi.post(newTeacher)
		}
		setNewTeacher({ subject: '', user_id: '', date_time: '', salary: '' })
		setEditingId(null)
		fetchTeachers()
	}

	const handleEdit = teacher => {
		setNewTeacher(teacher)
		setEditingId(teacher.id)
	}

	const handleDelete = async id => {
		if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			await fakeApi.delete(id)
			fetchTeachers()
		}
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
				O'qituvchilar
			</h2>
			<p className='text-gray-600 mb-4'>
				Bu bo'limda o'qituvchilar bilan bog'liq ma'lumotlarni boshqarishingiz
				mumkin.
			</p>

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
				<input
					type='number'
					placeholder='Foydalanuvchi ID'
					value={newTeacher.user_id}
					onChange={e =>
						setNewTeacher({ ...newTeacher, user_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
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
					className='bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600'
				>
					{editingId ? 'Saqlash' : "+ Qo'shish"}
				</button>
			</form>

			<table className='w-full border-collapse'>
				<thead className='bg-gray-200'>
					<tr>
						<th className='p-2'>#</th>
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
							<td className='p-2'>{teacher.subject}</td>
							<td className='p-2'>{teacher.user_id}</td>
							<td className='p-2'>
								{new Date(teacher.date_time).toLocaleString()}
							</td>
							<td className='p-2'>{teacher.salary.toLocaleString()} so'm</td>
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
