import { useEffect, useState } from 'react'

const GroupsPage = () => {
	const [groups, setGroups] = useState([])
	const [newGroup, setNewGroup] = useState({
		name: '',
		user_id: '',
		days: '',
		teacher_id: '',
	})
	const [editingId, setEditingId] = useState(null)

	const fakeApi = {
		data: [
			{
				id: 1,
				name: 'Frontend 1',
				user_id: 101,
				days: 'Dushanba, Chorshanba',
				teacher_id: 1001,
			},
		],
		get() {
			return Promise.resolve({ data: this.data })
		},
		post(group) {
			const newData = { ...group, id: Date.now() }
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

	const fetchGroups = async () => {
		const res = await fakeApi.get()
		setGroups(res.data)
	}

	useEffect(() => {
		fetchGroups()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (editingId) {
			await fakeApi.put(editingId, newGroup)
		} else {
			await fakeApi.post(newGroup)
		}
		setNewGroup({ name: '', user_id: '', days: '', teacher_id: '' })
		setEditingId(null)
		fetchGroups()
	}

	const handleEdit = group => {
		setNewGroup(group)
		setEditingId(group.id)
	}

	const handleDelete = async id => {
		if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			await fakeApi.delete(id)
			fetchGroups()
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
					type='number'
					placeholder='Foydalanuvchi ID'
					value={newGroup.user_id}
					onChange={e => setNewGroup({ ...newGroup, user_id: e.target.value })}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='text'
					placeholder='Dars kunlari'
					value={newGroup.days}
					onChange={e => setNewGroup({ ...newGroup, days: e.target.value })}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='number'
					placeholder="O'qituvchi ID"
					value={newGroup.teacher_id}
					onChange={e =>
						setNewGroup({ ...newGroup, teacher_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<button
					type='submit'
					className='bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600'
				>
					{editingId ? 'Yangilash' : "+ Qo'shish"}
				</button>
			</form>

			<table className='w-full border-collapse'>
				<thead className='bg-gray-200'>
					<tr>
						<th className='p-2'>#</th>
						<th className='p-2'>Nomi</th>
						<th className='p-2'>Foydalanuvchi ID</th>
						<th className='p-2'>Kunlar</th>
						<th className='p-2'>O'qituvchi ID</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group, index) => (
						<tr key={group.id} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{group.name}</td>
							<td className='p-2'>{group.user_id}</td>
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
									onClick={() => handleDelete(group.id)}
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
