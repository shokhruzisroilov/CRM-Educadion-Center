import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import DashboardLayout from './components/layout/DashboardLayout'
import StudentsPage from './pages/StudentsPage'
import AttendancePage from './pages/AttendancePage'
import TeachersPage from './pages/TeachersPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import GroupsPage from './pages/GroupsPage'

function App() {
	const token = useSelector(state => state.auth.token)

	return (
		<Router>
			<Routes>
				<Route
					path='/login'
					element={!token ? <LoginPage /> : <Navigate to='/' replace />}
				/>

				{token && (
					<Route path='/' element={<DashboardLayout />}>
						<Route index element={<HomePage />} />
						<Route path='students' element={<StudentsPage />} />
						<Route path='attendance' element={<AttendancePage />} />
						<Route path='teachers' element={<TeachersPage />} />
						<Route path='groups' element={<GroupsPage />} />
					</Route>
				)}

				<Route
					path='*'
					element={<Navigate to={token ? '/' : '/login'} replace />}
				/>
			</Routes>
		</Router>
	)
}

export default App
