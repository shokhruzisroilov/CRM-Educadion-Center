import { useState } from 'react'
import { useSelector } from 'react-redux'

const StudentList = () => {
	const user = useSelector(state => state.auth.user)
	if (user?.role !== 'manager') return null

	const [students, setStudents] = useState([
		{ id: 1, name: 'Ali Karimov', group: 'Frontend-1', archived: false },
		{ id: 2, name: 'Dilnoza Omonova', group: 'Backend-1', archived: false },
	])

	const [newStudentName, setNewStudentName] = useState('')

	const handleAddStudent = () => {
		if (newStudentName.trim()) {
			const newStudent = {
				id: Date.now(),
				name: newStudentName,
				group: '',
				archived: false,
			}
			setStudents(prev => [...prev, newStudent])
			setNewStudentName('')
		}
	}

	const handleDelete = id => {
		setStudents(prev => prev.filter(s => s.id !== id))
	}

	const handleArchive = id => {
		setStudents(prev =>
			prev.map(s => (s.id === id ? { ...s, archived: true } : s))
		)
	}

	const handleAssignGroup = (id, group) => {
		setStudents(prev => prev.map(s => (s.id === id ? { ...s, group } : s)))
	}

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-semibold mb-2'>📘 Student Management</h2>

			<div className='flex items-center gap-2 mb-4'>
				<input
					type='text'
					className='border p-2 rounded w-64'
					placeholder='New student name'
					value={newStudentName}
					onChange={e => setNewStudentName(e.target.value)}
				/>
				<button className='btn' onClick={handleAddStudent}>
					Add
				</button>
			</div>

			<table className='w-full border'>
				<thead>
					<tr className='bg-gray-100 text-left'>
						<th className='p-2 border'>#</th>
						<th className='p-2 border'>Name</th>
						<th className='p-2 border'>Group</th>
						<th className='p-2 border'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{students.map((s, i) => (
						<tr key={s.id} className={s.archived ? 'text-gray-400 italic' : ''}>
							<td className='p-2 border'>{i + 1}</td>
							<td className='p-2 border'>{s.name}</td>
							<td className='p-2 border'>
								<input
									type='text'
									className='border p-1 rounded'
									value={s.group}
									onChange={e => handleAssignGroup(s.id, e.target.value)}
									disabled={s.archived}
								/>
							</td>
							<td className='p-2 border space-x-2'>
								<button
									className='btn bg-red-500 hover:bg-red-600'
									onClick={() => handleDelete(s.id)}
								>
									Delete
								</button>
								{!s.archived && (
									<button
										className='btn bg-yellow-500 hover:bg-yellow-600'
										onClick={() => handleArchive(s.id)}
									>
										Archive
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default StudentList
