import { useEffect, useState } from 'react'

const StudentsPage = () => {
	const [students, setStudents] = useState([])
	const [newStudent, setNewStudent] = useState({
		full_name: '',
		groupa_id: '',
		is_archived: 'false',
	})
	const [editingId, setEditingId] = useState(null)
	const [loading, setLoading] = useState(false)

	// 🔄 Fake API
	const fakeApi = {
		data: [
			{ id: 1, full_name: 'Ali Valiyev', groupa_id: 101, is_archived: 'false' },
			{
				id: 2,
				full_name: 'Dilnoza Karimova',
				groupa_id: 102,
				is_archived: 'true',
			},
		],
		get() {
			return Promise.resolve({ data: this.data })
		},
		post(student) {
			const newStudent = { ...student, id: Date.now() }
			this.data.push(newStudent)
			return Promise.resolve({ data: newStudent })
		},
		put(id, updated) {
			this.data = this.data.map(s => (s.id === id ? { ...s, ...updated } : s))
			return Promise.resolve()
		},
		delete(id) {
			this.data = this.data.filter(s => s.id !== id)
			return Promise.resolve()
		},
	}

	const fetchStudents = async () => {
		const res = await fakeApi.get()
		setStudents(res.data)
	}

	useEffect(() => {
		fetchStudents()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		if (editingId) {
			await fakeApi.put(editingId, newStudent)
		} else {
			await fakeApi.post(newStudent)
		}
		setNewStudent({ full_name: '', groupa_id: '', is_archived: 'false' })
		setEditingId(null)
		fetchStudents()
		setLoading(false)
	}

	const handleEdit = student => {
		setNewStudent(student)
		setEditingId(student.id)
	}

	const handleDelete = async id => {
		if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			await fakeApi.delete(id)
			fetchStudents()
		}
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>O'quvchilar</h2>
			<p className='text-gray-600 mb-4'>
				Bu yerda o'quvchilarni qo'shish, tahrirlash va arxivga o'tkazish mumkin.
			</p>

			<form onSubmit={handleSubmit} className='mb-6 space-y-2'>
				<input
					type='text'
					placeholder='F.I.Sh'
					value={newStudent.full_name}
					onChange={e =>
						setNewStudent({ ...newStudent, full_name: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='number'
					placeholder='Guruh ID'
					value={newStudent.groupa_id}
					onChange={e =>
						setNewStudent({ ...newStudent, groupa_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<select
					value={newStudent.is_archived}
					onChange={e =>
						setNewStudent({ ...newStudent, is_archived: e.target.value })
					}
					className='border px-4 py-2 rounded w-full'
				>
					<option value='false'>Aktiv</option>
					<option value='true'>Arxivda</option>
				</select>
				<button
					type='submit'
					disabled={loading}
					className='bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600'
				>
					{editingId ? 'Saqlash' : "Qo'shish"}
				</button>
			</form>

			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-gray-200 text-left'>
						<th className='p-2'>#</th>
						<th className='p-2'>F.I.Sh</th>
						<th className='p-2'>Guruh ID</th>
						<th className='p-2'>Holat</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, index) => (
						<tr key={student.id} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{student.full_name}</td>
							<td className='p-2'>{student.groupa_id}</td>
							<td className='p-2'>
								{student.is_archived === 'true' ? (
									<span className='text-red-500'>Arxivda</span>
								) : (
									<span className='text-green-600'>Aktiv</span>
								)}
							</td>
							<td className='p-2 space-x-2'>
								<button
									onClick={() => handleEdit(student)}
									className='bg-blue-500 text-white px-3 py-1 rounded'
								>
									✏️
								</button>
								<button
									onClick={() => handleDelete(student.id)}
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

export default StudentsPage
