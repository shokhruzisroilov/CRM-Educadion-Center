import { useState } from 'react'
import { useSelector } from 'react-redux'

const GroupAssignment = () => {
	const user = useSelector(state => state.auth.user)
	if (user?.role !== 'manager') return null

	const [groups, setGroups] = useState([
		{
			id: 1,
			name: 'Frontend-1',
			teacher: 'Javohir Qodirov',
			students: ['Ali Karimov', 'Dilnoza Omonova'],
		},
		{
			id: 2,
			name: 'Backend-1',
			teacher: '',
			students: [],
		},
	])

	const [newGroupName, setNewGroupName] = useState('')
	const [teachers] = useState(['Javohir Qodirov', 'Zarnigor Mamadaliyeva'])
	const [students] = useState([
		'Ali Karimov',
		'Dilnoza Omonova',
		'Sardor Qodirov',
	])

	const handleAddGroup = () => {
		if (newGroupName.trim()) {
			setGroups(prev => [
				...prev,
				{
					id: Date.now(),
					name: newGroupName,
					teacher: '',
					students: [],
				},
			])
			setNewGroupName('')
		}
	}

	const handleAssignTeacher = (groupId, teacherName) => {
		setGroups(prev =>
			prev.map(g => (g.id === groupId ? { ...g, teacher: teacherName } : g))
		)
	}

	const handleAssignStudent = (groupId, studentName) => {
		setGroups(prev =>
			prev.map(g =>
				g.id === groupId && !g.students.includes(studentName)
					? { ...g, students: [...g.students, studentName] }
					: g
			)
		)
	}

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-semibold mb-2'>📘 Group Assignment</h2>

			<div className='flex items-center gap-2 mb-4'>
				<input
					type='text'
					placeholder='New group name'
					value={newGroupName}
					onChange={e => setNewGroupName(e.target.value)}
					className='border p-2 rounded w-64'
				/>
				<button className='btn' onClick={handleAddGroup}>
					Add Group
				</button>
			</div>

			<div className='space-y-4'>
				{groups.map(group => (
					<div key={group.id} className='border p-4 rounded bg-white shadow'>
						<h3 className='text-lg font-semibold mb-2'>{group.name}</h3>

						<div className='mb-2'>
							<label className='mr-2 font-medium'>Assign Teacher:</label>
							<select
								className='border p-1 rounded'
								value={group.teacher}
								onChange={e => handleAssignTeacher(group.id, e.target.value)}
							>
								<option value=''>-- Select Teacher --</option>
								{teachers.map((t, idx) => (
									<option key={idx} value={t}>
										{t}
									</option>
								))}
							</select>
						</div>

						<div className='mb-2'>
							<label className='mr-2 font-medium'>Add Student:</label>
							<select
								className='border p-1 rounded'
								onChange={e => handleAssignStudent(group.id, e.target.value)}
							>
								<option value=''>-- Select Student --</option>
								{students.map((s, idx) => (
									<option key={idx} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>

						<div>
							<p className='font-medium'>Students:</p>
							<ul className='list-disc list-inside text-sm text-gray-700'>
								{group.students.map((s, idx) => (
									<li key={idx}>{s}</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default GroupAssignment
