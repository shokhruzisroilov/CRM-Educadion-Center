import { useSelector } from 'react-redux'
import StudentList from '../components/StudentList'
import TeacherList from '../components/TeacherList'
import GroupAssignment from '../components/GroupAssignment'
import Attendance from '../components/Attendance'
import MyGroups from '../components/MyGroups'

const Dashboard = () => {
	const user = useSelector(state => state.auth.user)
	const isManager = user?.role === 'manager'

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Welcome, {user?.name}</h1>

			{isManager && (
				<>
					<StudentList />
					<TeacherList />
					<GroupAssignment />
				</>
			)}

			{!isManager && <MyGroups />}

			<Attendance />
		</div>
	)
}

export default Dashboard
