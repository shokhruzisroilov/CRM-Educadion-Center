import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout } from '../redux/authSlice'

const LoginPage = () => {
	const dispatch = useDispatch()
	const { token, loading, error } = useSelector(state => state.auth)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(loginUser({ username, password }))
	}

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
			<div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-xl'>
				<h2 className='text-3xl font-bold text-center mb-6 text-gray-900 tracking-tight'>
					{token ? 'Tizimga Kirilgan' : 'Xush kelibsiz'}
				</h2>

				{token ? (
					<div className='text-center'>
						<p className='text-orange-600 font-medium mb-4 break-words'>
							✅ Muvaffaqiyatli kirildi! <br />
							<code className='text-sm text-gray-700'>{token}</code>
						</p>
						<button
							onClick={handleLogout}
							className='w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition'
						>
							Chiqish
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className='space-y-5'>
						<input
							type='text'
							placeholder='Username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900'
						/>
						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900'
						/>
						<button
							type='submit'
							disabled={loading}
							className='w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? 'Yuklanmoqda...' : 'Kirish'}
						</button>
						{error && (
							<p className='text-red-500 text-sm text-center font-medium'>
								❌ {error}
							</p>
						)}
					</form>
				)}
			</div>
		</div>
	)
}

export default LoginPage
