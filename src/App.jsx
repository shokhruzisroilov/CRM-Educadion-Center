import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'

const App = () => {
	const user = useSelector(state => state.auth.user)
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={user ? <Dashboard /> : <Navigate to='/login' />}
				/>
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</Router>
	)
}

export default App
