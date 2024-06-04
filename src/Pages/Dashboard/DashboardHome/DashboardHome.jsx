import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useContext } from 'react';
import dashImg from "../../../assets/images/dashboardImage/dashHome1.png"

const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='bg-white h-screen bg-opacity-5 text-center shadow rounded-lg shadow-slate-400 p-5'>
            <h1 className='text-3xl'>
                Welcome to Dashboard {user?.email}
            </h1>
            <img className='' src={dashImg} alt="" />
        </div>
    );
};

export default DashboardHome;