import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogin = role => {
		dispatch(
			loginSuccess({
				user: { name: 'Test User', role },
				token: 'dummy-token',
			})
		)
		navigate('/')
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen space-y-4'>
			<h1 className='text-3xl font-bold'>Login Page</h1>
			<button className='btn' onClick={() => handleLogin('manager')}>
				Login as Manager
			</button>
			<button className='btn' onClick={() => handleLogin('teacher')}>
				Login as Teacher
			</button>
		</div>
	)
}

export default LoginPage
