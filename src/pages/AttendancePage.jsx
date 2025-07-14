import { useEffect, useState } from 'react'

const AttendancePage = () => {
	const [records, setRecords] = useState([])
	const [newRecord, setNewRecord] = useState({
		user_id: '',
		date_time: '',
		student_id: '',
		status: '',
		groupa_id: '',
	})
	const [editingId, setEditingId] = useState(null)

	const fakeApi = {
		data: [
			{
				id: 1,
				user_id: 100,
				date_time: '2025-07-14',
				student_id: 200,
				status: 'Bor',
				groupa_id: 300,
			},
		],
		get() {
			return Promise.resolve({ data: this.data })
		},
		post(record) {
			const newData = { ...record, id: Date.now() }
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

	const fetchRecords = async () => {
		const res = await fakeApi.get()
		setRecords(res.data)
	}

	useEffect(() => {
		fetchRecords()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (editingId) {
			await fakeApi.put(editingId, newRecord)
		} else {
			await fakeApi.post(newRecord)
		}
		setNewRecord({
			user_id: '',
			date_time: '',
			student_id: '',
			status: '',
			groupa_id: '',
		})
		setEditingId(null)
		fetchRecords()
	}

	const handleEdit = record => {
		setNewRecord(record)
		setEditingId(record.id)
	}

	const handleDelete = async id => {
		if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
			await fakeApi.delete(id)
			fetchRecords()
		}
	}

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>Davomat</h2>
			<p className='text-gray-600 mb-4'>
				Sana bo'yicha guruhlar uchun davomat yozuvi va ko'rish.
			</p>

			<form onSubmit={handleSubmit} className='mb-6 space-y-2'>
				<input
					type='number'
					placeholder='Foydalanuvchi ID'
					value={newRecord.user_id}
					onChange={e =>
						setNewRecord({ ...newRecord, user_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='date'
					value={newRecord.date_time}
					onChange={e =>
						setNewRecord({ ...newRecord, date_time: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
				<input
					type='number'
					placeholder="O'quvchi ID"
					value={newRecord.student_id}
					onChange={e =>
						setNewRecord({ ...newRecord, student_id: e.target.value })
					}
					required
					className='border px-4 py-2 rounded w-full'
				/>
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
				<input
					type='number'
					placeholder='Guruh ID'
					value={newRecord.groupa_id}
					onChange={e =>
						setNewRecord({ ...newRecord, groupa_id: e.target.value })
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
						<th className='p-2'>Foydalanuvchi ID</th>
						<th className='p-2'>Sana</th>
						<th className='p-2'>O'quvchi ID</th>
						<th className='p-2'>Holat</th>
						<th className='p-2'>Guruh ID</th>
						<th className='p-2'>Amallar</th>
					</tr>
				</thead>
				<tbody>
					{records.map((r, index) => (
						<tr key={r.id} className='border-b'>
							<td className='p-2'>{index + 1}</td>
							<td className='p-2'>{r.user_id}</td>
							<td className='p-2'>{r.date_time}</td>
							<td className='p-2'>{r.student_id}</td>
							<td className='p-2'>{r.status}</td>
							<td className='p-2'>{r.groupa_id}</td>
							<td className='p-2 space-x-2'>
								<button
									onClick={() => handleEdit(r)}
									className='bg-blue-500 text-white px-3 py-1 rounded'
								>
									✏️
								</button>
								<button
									onClick={() => handleDelete(r.id)}
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
