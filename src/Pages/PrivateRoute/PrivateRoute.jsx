import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <h1 className='text-2xl font-bold text-center text-white'>Loading....</h1>
            </div>
        )
    }
    if (user) {
        return children
    }
    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRoute;