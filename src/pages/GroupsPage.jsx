import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchGroups,
	addGroup,
	editGroup,
	removeGroup,
} from '../redux/groupSlice'
import { getAuthData } from '../utils/tokenStorage'
import { fetchUsers } from '../redux/userSlice'

const GroupsPage = () => {
	const dispatch = useDispatch()
	const { groups, loading } = useSelector(state => state.groups)
	const { users } = useSelector(state => state.users)

	const [newGroup, setNewGroup] = useState({
		name: '',
		days: '',
		teacher_id: '',
	})

	const [editing, setEditing] = useState(null)

	useEffect(() => {
		dispatch(fetchGroups())
		dispatch(fetchUsers())
	}, [dispatch])

	const handleSubmit = e => {
		e.preventDefault()

		const auth = getAuthData()

		const payload = {
			name: newGroup.name,
			user_id: Number(auth?.id),
			days: newGroup.days,
			teacher_id: Number(newGroup.teacher_id),
			id: editing,
		}

		if (editing) {
			dispatch(editGroup(payload)).then(() => dispatch(fetchGroups()))
		} else {
			dispatch(addGroup(payload)).then(() => dispatch(fetchGroups()))
		}

		setNewGroup({
			name: '',
			days: '',
			teacher_id: '',
		})
		setEditing(null)
	}

	const handleEdit = group => {
		setNewGroup({
			name: group.name,
			days: group.days,
			teacher_id: group.teacher_id,
		})
		setEditing(group.id)
	}

	const handleDelete = group => {
		if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			dispatch(removeGroup(group.id)).then(() => {
				dispatch(fetchGroups())
			})
		}
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>Guruhlar</h2>
			<p className='text-gray-600 mb-4'>
				Bu sahifada guruhlar bilan ishlashingiz mumkin.
			</p>

			<form onSubmit={handleSubmit} className='mb-6 space-y-2'>
				<input
					type='text'
					placeholder='Guruh nomi'
					value={newGroup.name}
					onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='text'
					placeholder='Dars kunlari (masalan: Du-Ch-Pay)'
					value={newGroup.days}
					onChange={e => setNewGroup({ ...newGroup, days: e.target.value })}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<select
					value={newGroup.teacher_id}
					onChange={e =>
						setNewGroup({ ...newGroup, teacher_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				>
					<option value=''>O'qituvchini tanlang</option>
					{users &&
						users
							.filter(user => user.role === 'teacher')
							.map(user => (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							))}
				</select>

				<button
					type='submit'
					disabled={loading}
					className='bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600'
				>
					{editing ? 'Yangilash' : "+ Qo'shish"}
				</button>
			</form>

			<table className='w-full border-collapse'>
				<thead className='bg-gray-200 text-left'>
					<tr>
						<th className='p-2'>#</th>
						<th className='p-2'>ID</th>
						<th className='p-2'>Nomi</th>
						<th className='p-2'>Kunlar</th>
						<th className='p-2'>O'qituvchi ID</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group, index) => (
						<tr key={group.name} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{group.id}</td>
							<td className='p-2'>{group.name}</td>
							<td className='p-2'>{group.days}</td>
							<td className='p-2'>{group.teacher_id}</td>
							<td className='p-2 space-x-2'>
								<button
									onClick={() => handleEdit(group)}
									className='bg-blue-500 text-white px-3 py-1 rounded'
								>
									✏️
								</button>
								<button
									onClick={() => handleDelete(group)}
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

export default GroupsPage
