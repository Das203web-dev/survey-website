import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useContext } from 'react';
import UseAxiosPublic from './UseAxiosPublic';
import showToast from '@/components/Toast/toast';
import { useLocation, useNavigate } from 'react-router-dom';

const UseGoogleLogIn = () => {
    const { googleSignInPopup } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(location);

    const handleGoogleLogin = async () => {
        try {
            const res = await googleSignInPopup();
            if (res.user) {
                // Extracting user information from the Google response
                const { displayName: userName, email } = res.user;
                // Preparing the user data to be posted to the server
                const userInfo = {
                    userName,
                    email,
                    phone: res.user.phoneNumber || ''
                };
                // Sending user data to the server
                const response = await axiosPublic.post('/userData', userInfo);
                console.log(response);

                if (response.data.acknowledged || response.status === 200) {
                    showToast(`Welcome ${userName}`, 'success');
                    navigate(location.state ? location.state : "/");
                }
            }
        } catch (error) {
            showToast('Failed to log in with Google', 'error');
        }
    };

    return handleGoogleLogin;
};

export default UseGoogleLogIn;
