import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchStudents,
	addStudent,
	editStudent,
	archiveStudentById,
	removeStudent,
} from '../redux/studentSlice'
import { fetchGroups } from '../redux/groupSlice' // 🔹 Guruhlarni olish

const StudentsPage = () => {
	const dispatch = useDispatch()
	const { students, loading } = useSelector(state => state.students)
	const { groups } = useSelector(state => state.groups) // 🔹 Guruhlar

	const [newStudent, setNewStudent] = useState({
		full_name: '',
		groupa_id: '',
		is_archived: false,
	})

	const [editingId, setEditingId] = useState(null)

	useEffect(() => {
		dispatch(fetchStudents())
		dispatch(fetchGroups()) // 🔹 Guruhlarni yuklash
	}, [dispatch])

	const handleSubmit = e => {
		e.preventDefault()
		const payload = {
			...newStudent,
			groupa_id: Number(newStudent.groupa_id),
			is_archived: Boolean(newStudent.is_archived),
		}

		if (editingId) {
			payload.id = editingId
			dispatch(editStudent(payload)).then(() => dispatch(fetchStudents()))
		} else {
			dispatch(addStudent(payload)).then(() => dispatch(fetchStudents()))
		}

		setNewStudent({ full_name: '', groupa_id: '', is_archived: false })
		setEditingId(null)
	}

	const handleEdit = student => {
		setNewStudent({
			full_name: student.full_name,
			groupa_id: student.groupa_id,
			is_archived: student.is_archived,
		})
		setEditingId(student.id)
	}

	const handleDelete = id => {
		if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			dispatch(removeStudent(id))
		}
	}

	const handleArchive = id => {
		if (confirm("Arxivga o'tkazilsinmi?")) {
			dispatch(archiveStudentById(id))
		}
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>O'quvchilar</h2>
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

				{/* 🔽 Guruh select */}
				<select
					value={newStudent.groupa_id}
					onChange={e =>
						setNewStudent({ ...newStudent, groupa_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				>
					<option value=''>Guruh tanlang</option>
					{groups.map(group => (
						<option key={group.id} value={group.id}>
							{group.name}
						</option>
					))}
				</select>

				<select
					value={newStudent.is_archived ? 'true' : 'false'}
					onChange={e =>
						setNewStudent({
							...newStudent,
							is_archived: e.target.value === 'true',
						})
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
						<th className='p-2'>ID</th>
						<th className='p-2'>F.I.Sh</th>
						<th className='p-2'>Guruh</th>
						<th className='p-2'>Holat</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, index) => (
						<tr key={student.id} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{student.id}</td>
							<td className='p-2'>{student.full_name}</td>
							<td className='p-2'>
								{groups.find(g => g.id === student.groupa_id)?.name ||
									student.groupa_id}
							</td>
							<td className='p-2'>
								{student.is_archived ? (
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
									onClick={() => handleArchive(student.id)}
									className='bg-yellow-500 text-white px-3 py-1 rounded'
								>
									📦
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
