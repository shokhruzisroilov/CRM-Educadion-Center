import { useSelector } from 'react-redux'

const MyGroups = () => {
	const user = useSelector(state => state.auth.user)

	// student groups
	const teacherGroups = [
		{
			name: 'Frontend-1',
			students: ['Ali Karimov', 'Dilnoza Omonova'],
		},
		{
			name: 'Backend-1',
			students: ['Sardor Qodirov'],
		},
	]

	return (
		<div className='mb-6'>
			<h2 className='text-xl font-semibold mb-2'>📚 My Groups</h2>
			{teacherGroups.map((group, idx) => (
				<div key={idx} className='border p-4 rounded mb-3 bg-white shadow'>
					<h3 className='font-bold'>{group.name}</h3>
					<ul className='list-disc list-inside text-sm text-gray-700'>
						{group.students.map((s, i) => (
							<li key={i}>{s}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default MyGroups
