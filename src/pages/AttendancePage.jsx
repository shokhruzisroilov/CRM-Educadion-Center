import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAttendance,
	addAttendance,
	editAttendance,
	removeAttendance,
} from '../redux/attendanceSlice'
import { fetchStudents } from '../redux/studentSlice'
import { fetchGroups } from '../redux/groupSlice'
import { getAuthData } from '../utils/tokenStorage'

const AttendancePage = () => {
	const dispatch = useDispatch()
	const { records, loading } = useSelector(state => state.attendance)
	const { students } = useSelector(state => state.students)
	const { groups } = useSelector(state => state.groups)

	const [newRecord, setNewRecord] = useState({
		date_time: '',
		student_id: '',
		status: '',
		groupa_id: '',
	})

	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		dispatch(fetchAttendance())
		dispatch(fetchStudents())
		dispatch(fetchGroups())
	}, [dispatch])

	const handleSubmit = async e => {
		e.preventDefault()
		const auth = getAuthData()

		const payload = {
			user_id: Number(auth?.id),
			date_time: newRecord.date_time,
			student_id: Number(newRecord.student_id),
			status: newRecord.status,
			groupa_id: Number(newRecord.groupa_id),
		}

		if (isEditing) {
			await dispatch(editAttendance(payload))
		} else {
			await dispatch(addAttendance(payload))
		}

		await dispatch(fetchAttendance()) // <-- Bu qatorni qo‘shing

		setNewRecord({
			date_time: '',
			student_id: '',
			status: '',
			groupa_id: '',
		})
		setIsEditing(false)
	}

	const handleEdit = record => {
		setNewRecord({
			date_time: record.date_time,
			student_id: record.student_id,
			status: record.status,
			groupa_id: record.groupa_id,
		})
		setIsEditing(true)
	}

	const handleDelete = record => {
		if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			dispatch(removeAttendance(record))
		}
	}

	const getStudentName = id => {
		const student = students.find(s => s.id === id)
		return student ? student.full_name : `ID: ${id}`
	}

	const getGroupName = id => {
		const group = groups.find(g => g.id === id)
		return group ? group.name : `ID: ${id}`
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>Davomat</h2>
			<p className='text-gray-600 mb-4'>
				Sana bo'yicha guruhlar uchun davomat yozuvi va ko'rish.
			</p>

			<form onSubmit={handleSubmit} className='mb-6 space-y-2'>
				<input
					type='date'
					value={newRecord.date_time}
					onChange={e =>
						setNewRecord({ ...newRecord, date_time: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>

				<select
					value={newRecord.student_id}
					onChange={e =>
						setNewRecord({ ...newRecord, student_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				>
					<option value=''>-- O‘quvchini tanlang --</option>
					{students.map(student => (
						<option key={student.id} value={student.id}>
							{student.full_name}
						</option>
					))}
				</select>

				<select
					value={newRecord.status}
					onChange={e => setNewRecord({ ...newRecord, status: e.target.value })}
					required
					className='border px-4 py-2 rounded w-full'
				>
					<option value=''>-- Holatni tanlang --</option>
					<option value='Bor'>Bor</option>
					<option value="Yo'q">Yo'q</option>
				</select>

				<select
					value={newRecord.groupa_id}
					onChange={e =>
						setNewRecord({ ...newRecord, groupa_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				>
					<option value=''>-- Guruhni tanlang --</option>
					{groups.map(group => (
						<option key={group.id} value={group.id}>
							{group.name}
						</option>
					))}
				</select>

				<button
					type='submit'
					className='bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600'
				>
					{isEditing ? 'Yangilash' : "+ Qo'shish"}
				</button>
			</form>

			<table className='w-full border-collapse'>
				<thead className='bg-gray-200 text-left'>
					<tr>
						<th className='p-2'>#</th>
						<th className='p-2'>Sana</th>
						<th className='p-2'>O'quvchi</th>
						<th className='p-2'>Holat</th>
						<th className='p-2'>Guruh</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{records.map((r, index) => (
						<tr key={index} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{r.date_time}</td>
							<td className='p-2'>{getStudentName(r.student_id)}</td>
							<td className='p-2'>{r.status}</td>
							<td className='p-2'>{getGroupName(r.groupa_id)}</td>
							<td className='p-2 space-x-2'>
								<button
									onClick={() => handleEdit(r)}
									className='bg-blue-500 text-white px-3 py-1 rounded'
								>
									✏️
								</button>
								<button
									onClick={() => handleDelete(r)}
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

export default AttendancePage
