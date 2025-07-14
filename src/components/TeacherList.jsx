import { useState } from 'react'
import { useSelector } from 'react-redux'

const TeacherList = () => {
	const user = useSelector(state => state.auth.user)
	if (user?.role !== 'manager') return null

	const [teachers, setTeachers] = useState([
		{ id: 1, name: 'Javohir Qodirov', groups: ['Frontend-1'], archived: false },
		{ id: 2, name: 'Zarnigor Mamadaliyeva', groups: [], archived: false },
	])

	const [newTeacherName, setNewTeacherName] = useState('')

	const handleAddTeacher = () => {
		if (newTeacherName.trim()) {
			const newTeacher = {
				id: Date.now(),
				name: newTeacherName,
				groups: [],
				archived: false,
			}
			setTeachers(prev => [...prev, newTeacher])
			setNewTeacherName('')
		}
	}

	const handleDelete = id => {
		setTeachers(prev => prev.filter(t => t.id !== id))
	}

	const handleArchive = id => {
		setTeachers(prev =>
			prev.map(t => (t.id === id ? { ...t, archived: true } : t))
		)
	}

	const handleGroupChange = (id, groupIndex, value) => {
		setTeachers(prev =>
			prev.map(t =>
				t.id === id
					? {
							...t,
							groups: t.groups.map((g, i) => (i === groupIndex ? value : g)),
					  }
					: t
			)
		)
	}

	const handleAddGroup = id => {
		setTeachers(prev =>
			prev.map(t => (t.id === id ? { ...t, groups: [...t.groups, ''] } : t))
		)
	}

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-semibold mb-2'>👨‍🏫 Teacher Management</h2>

			<div className='flex items-center gap-2 mb-4'>
				<input
					type='text'
					className='border p-2 rounded w-64'
					placeholder='New teacher name'
					value={newTeacherName}
					onChange={e => setNewTeacherName(e.target.value)}
				/>
				<button className='btn' onClick={handleAddTeacher}>
					Add
				</button>
			</div>

			<table className='w-full border'>
				<thead>
					<tr className='bg-gray-100 text-left'>
						<th className='p-2 border'>#</th>
						<th className='p-2 border'>Name</th>
						<th className='p-2 border'>Groups</th>
						<th className='p-2 border'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{teachers.map((t, i) => (
						<tr key={t.id} className={t.archived ? 'text-gray-400 italic' : ''}>
							<td className='p-2 border'>{i + 1}</td>
							<td className='p-2 border'>{t.name}</td>
							<td className='p-2 border space-y-1'>
								{t.groups.map((g, idx) => (
									<input
										key={idx}
										type='text'
										value={g}
										disabled={t.archived}
										onChange={e => handleGroupChange(t.id, idx, e.target.value)}
										className='border p-1 rounded block'
									/>
								))}
								{!t.archived && (
									<button
										className='btn text-xs mt-1'
										onClick={() => handleAddGroup(t.id)}
									>
										+ Add Group
									</button>
								)}
							</td>
							<td className='p-2 border space-x-2'>
								<button
									className='btn bg-red-500 hover:bg-red-600'
									onClick={() => handleDelete(t.id)}
								>
									Delete
								</button>
								{!t.archived && (
									<button
										className='btn bg-yellow-500 hover:bg-yellow-600'
										onClick={() => handleArchive(t.id)}
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

export default TeacherList
