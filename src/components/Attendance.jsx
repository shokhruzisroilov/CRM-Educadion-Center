import { useState } from 'react'
import { useSelector } from 'react-redux'

const Attendance = () => {
	const user = useSelector(state => state.auth.user)
	if (!user) return null

	// Only Teacher
	const isTeacher = user.role === 'teacher'

	const [groups] = useState([
		{ id: 1, name: 'Frontend-1', students: ['Ali Karimov', 'Dilnoza Omonova'] },
		{ id: 2, name: 'Backend-1', students: ['Sardor Qodirov'] },
	])

	const [selectedGroup, setSelectedGroup] = useState('')
	const [date, setDate] = useState(new Date().toISOString().split('T')[0])
	const [attendance, setAttendance] = useState({})

	const handleMark = (student, present) => {
		setAttendance(prev => ({
			...prev,
			[student]: present,
		}))
	}

	const handleSave = () => {
		const data = {
			group: selectedGroup,
			date,
			attendance: Object.entries(attendance).map(([student, present]) => ({
				student,
				present,
			})),
		}

		console.log('✅ Attendance saved:', data)
		alert('Davomat saqlandi (console.log)')
	}

	const selected = groups.find(g => g.name === selectedGroup)

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-semibold mb-2'>📅 Attendance</h2>

			<div className='flex gap-4 mb-4'>
				<div>
					<label className='block mb-1'>Guruh tanlang:</label>
					<select
						className='border p-2 rounded w-64'
						value={selectedGroup}
						onChange={e => setSelectedGroup(e.target.value)}
					>
						<option value=''>-- Tanlang --</option>
						{groups.map(g => (
							<option key={g.id} value={g.name}>
								{g.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className='block mb-1'>Sana:</label>
					<input
						type='date'
						className='border p-2 rounded'
						value={date}
						onChange={e => setDate(e.target.value)}
					/>
				</div>
			</div>

			{selected && (
				<div>
					<table className='w-full border text-left'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='p-2 border'>#</th>
								<th className='p-2 border'>Ismi</th>
								<th className='p-2 border'>Holati</th>
							</tr>
						</thead>
						<tbody>
							{selected.students.map((student, index) => (
								<tr key={index}>
									<td className='p-2 border'>{index + 1}</td>
									<td className='p-2 border'>{student}</td>
									<td className='p-2 border'>
										<label className='mr-2'>
											<input
												type='radio'
												name={`attendance-${student}`}
												checked={attendance[student] === true}
												onChange={() => handleMark(student, true)}
											/>{' '}
											Keldi
										</label>
										<label>
											<input
												type='radio'
												name={`attendance-${student}`}
												checked={attendance[student] === false}
												onChange={() => handleMark(student, false)}
											/>{' '}
											Kelmadi
										</label>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<button className='btn mt-4' onClick={handleSave}>
						Saqlash
					</button>
				</div>
			)}
		</div>
	)
}

export default Attendance
