import { AuthContext } from '@/AuthProvider/AuthProvider';
import UseSingleAdmin from '@/Hooks/UseSingleAdmin';
import UseSuperAdmin from '@/Hooks/UseSuperAdmin';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSuperAdmin, isPending] = UseSuperAdmin();
    const [admin, idSingleAdminPending] = UseSingleAdmin();
    const location = useLocation();
    // console.log("User:", user);
    // console.log("Loading:", loading);
    // console.log("Is Super Admin:", isSuperAdmin, "Is Pending:", isPending);
    // console.log("Is Admin:", admin, "Is Admin Pending:", idSingleAdminPending);
    if (loading || isPending || idSingleAdminPending) {
        return <p>Loading...</p>
    }
    if (isSuperAdmin || admin) {
        return children
    }
    console.log(location)
    return <Navigate state={location?.pathname} to={'/login'}></Navigate>;
};

export default AdminRoute;