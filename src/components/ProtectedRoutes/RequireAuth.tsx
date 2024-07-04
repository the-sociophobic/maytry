import { Navigate } from 'react-router-dom'

import useStore from '../../hooks/useStore'


export type RequireAuthProps = {
	children: React.ReactNode
}


const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
	const currentUser = useStore(state => state.user)

	if (!currentUser) {
		return <Navigate to='/login' />
	}

	return <>{children}</>
}


export default RequireAuth
