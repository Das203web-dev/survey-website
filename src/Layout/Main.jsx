import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import TopBar from '../Shared/TopBar/TopBar';
import Starfield from 'react-starfield';
import './Main.css'
import Footer from '@/Shared/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '@/AuthProvider/AuthProvider';

const Main = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='m-0 p-0'>
            <TopBar></TopBar>
            <Navbar></Navbar>
            <div className='text-[#212121] bg-[#fff] relative'>
                {/* <Starfield

                    starCount={1000}
                    starColor={[218, 27, 96, 0.1]}
                    speedFactor={0.05}
                    backgroundColor="transparent">
                </Starfield> */}
                <div className='z-30 relative'>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;