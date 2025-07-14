import { FaUsers, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa'

const HomePage = () => {
	return (
		<div>
			<h2 className='text-3xl font-bold text-gray-800 mb-6'>Bosh sahifa</h2>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* O'quvchilar */}
				<div className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
					<div className='flex items-center space-x-4'>
						<div className='bg-orange-100 text-orange-600 p-4 rounded-full'>
							<FaUsers size={24} />
						</div>
						<div>
							<p className='text-gray-600'>Jami o'quvchilar</p>
							<h3 className='text-xl font-semibold text-gray-800'>120</h3>
						</div>
					</div>
				</div>

				{/* O'qituvchilar */}
				<div className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
					<div className='flex items-center space-x-4'>
						<div className='bg-orange-100 text-orange-600 p-4 rounded-full'>
							<FaChalkboardTeacher size={24} />
						</div>
						<div>
							<p className='text-gray-600'>Jami o'qituvchilar</p>
							<h3 className='text-xl font-semibold text-gray-800'>12</h3>
						</div>
					</div>
				</div>

				{/* Davomat */}
				<div className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
					<div className='flex items-center space-x-4'>
						<div className='bg-orange-100 text-orange-600 p-4 rounded-full'>
							<FaClipboardList size={24} />
						</div>
						<div>
							<p className='text-gray-600'>Bugungi davomat</p>
							<h3 className='text-xl font-semibold text-gray-800'>98%</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
