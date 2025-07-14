import { Outlet, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const DashboardLayout = () => {
	const dispatch = useDispatch()
	const role = useSelector(state => state.auth.role)
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const isAdmin = role === 'admin'
	const isTeacher = role === 'teacher'
	const isUser = role === 'user'

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

	return (
		<div className='flex min-h-screen bg-gray-100'>
			{/* Sidebar */}
			<aside
				className={`fixed min-h-screen md:static z-40 md:z-auto top-0 left-0 h-full w-64 bg-white shadow-md p-4 transform ${
					sidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 ease-in-out md:translate-x-0`}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-2xl font-bold text-orange-500'>Maktab</h2>
					<button className='md:hidden text-gray-700' onClick={toggleSidebar}>
						<X />
					</button>
				</div>

				<nav className='flex flex-col space-y-3'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive
								? 'text-white bg-orange-500 px-4 py-2 rounded'
								: 'text-gray-700 hover:text-orange-500 px-4 py-2 rounded'
						}
					>
						Bosh sahifa
					</NavLink>

					{isAdmin && (
						<>
							<NavLink to='/students' className={navClass}>
								O'quvchilar
							</NavLink>
							<NavLink to='/teachers' className={navClass}>
								O'qituvchilar
							</NavLink>
						</>
					)}

					{(isAdmin || isTeacher) && (
						<>
							<NavLink to='/groups' className={navClass}>
								Guruhlar
							</NavLink>
							<NavLink to='/attendance' className={navClass}>
								Davomat
							</NavLink>
						</>
					)}

					<button
						onClick={() => dispatch(logout())}
						className='mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
					>
						Chiqish
					</button>
				</nav>
			</aside>

			{/* Main content */}
			<div className='flex-1 flex flex-col'>
				{/* Header */}
				<header className='bg-white shadow px-6 py-4 flex items-center justify-between md:justify-end'>
					<div className='md:hidden'>
						<button onClick={toggleSidebar} className='text-gray-700'>
							<Menu />
						</button>
					</div>
					<p className='text-sm text-gray-700 font-semibold'>
						👤 {role?.toUpperCase()}
					</p>
				</header>

				<main className='p-6 bg-gray-50 flex-1 overflow-auto'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

// Common NavLink class
const navClass = ({ isActive }) =>
	isActive
		? 'text-white bg-orange-500 px-4 py-2 rounded'
		: 'text-gray-700 hover:text-orange-500 px-4 py-2 rounded'

export default DashboardLayout
