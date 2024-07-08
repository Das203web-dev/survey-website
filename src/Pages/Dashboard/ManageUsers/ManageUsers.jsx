import UserData from '@/Hooks/UserData';
import SectionTitle from '@/Shared/SectionTitle/SectionTitle';
import React, { useContext, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MdDelete } from "react-icons/md";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UseAxios from '@/Hooks/UseAxios';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import showToast from '@/components/Toast/toast';
import UseSuperAdmin from '@/Hooks/UseSuperAdmin';
import { GrUserAdmin } from "react-icons/gr";
import UseAdmin from '@/Hooks/UseAdmin';
import { AuthContext } from '@/AuthProvider/AuthProvider';

const ManageUsers = () => {
    const [userInfos, refetch] = UserData();
    const { user } = useContext(AuthContext);
    const [openAlert, setOpenAlert] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const axiosSecure = UseAxios();
    const axiosPublic = UseAxiosPublic();
    const [isSuperAdmin] = UseSuperAdmin();
    const [adminEmail, setAdminEmail] = useState(null); // State for storing the email of the user to be made admin
    const [deleteUserId, setDeleteUserId] = useState(null); // State for storing the id of the user to be deleted
    const [isAdmin] = UseAdmin();
    console.log(isAdmin, 'line 176');

    const handleDeleteUser = (id) => {
        if ((isAdmin || isSuperAdmin)) {
            console.log(isAdmin, "or", isSuperAdmin);
            const userIdForDelete = userInfos.find(user => user._id === id);
            console.log(userIdForDelete, 'line 50');
            if ((user._id !== id && userIdForDelete.role !== "Admin") || isSuperAdmin) {
                console.log(id);
                setDeleteUserId(id); // Store the id to be used in the confirmation dialog
                setOpenAlert(true);
            }
            else {
                showToast("You don't have permission to delete an Admin", "error")
            }
        }
    };

    const handleMakeAdmin = (email) => {
        if (!isSuperAdmin) {
            showToast("You don't have permission", "error");
            return;
        } else {
            const isUserAdmin = userInfos.find(user => user.email === email);
            console.log(isUserAdmin, 'line 68');
            if (isUserAdmin?.role !== 'Admin') {
                setAdminEmail(email); // Store the email to be used in confirmation dialog
                setOpenAlert(true); // Open the alert dialog for confirmation
            }
            else {
                showToast("This user is already an admin", "error")
            }
        }
    };

    useEffect(() => {
        const processConfirmation = async () => {
            if (confirmation) {
                if (adminEmail) {
                    // Perform the make admin action
                    try {
                        const response = await axiosSecure.patch(`/user/admin/${adminEmail}`);
                        if (response.status === 200) {
                            showToast("User is now an admin", "success");
                            refetch();
                        }
                    } catch (error) {
                        showToast("Failed to make user an admin", "error");
                    }
                    setAdminEmail(null); // Reset state after processing
                } else if (deleteUserId) {
                    // Perform the delete action
                    try {
                        const res = await axiosPublic.delete(`/userData/${deleteUserId}`);
                        if (res.data.deletedCount) {
                            showToast("The user deleted successfully", "success");
                            refetch();
                        }
                    } catch (error) {
                        showToast("Failed to delete user", "error");
                    }
                    setDeleteUserId(null); // Reset state after processing
                }
                setConfirmation(false); // Reset confirmation state
                setOpenAlert(false); // Close alert dialog
            }
        };

        processConfirmation();
    }, [confirmation, adminEmail, deleteUserId, axiosSecure, axiosPublic, refetch]);

    return (
        <div className='md:p-10 pt-2'>
            <SectionTitle title={'Manage Users'}></SectionTitle>
            <Table>
                <TableCaption>A list Users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Make Admin</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userInfos.map((user, index) => (
                        <TableRow key={index} className={`${index % 2 === 1 ? "bg-white" : "bg-slate-100"}`}>
                            <TableCell className="font-medium text-nowrap">{user.userName}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.role}</TableCell>
                            <TableCell>
                                {user?.role === "Super Admin" ? "" : (
                                    <button onClick={() => handleMakeAdmin(user?.email)} className='p-2 bg-[#2f855a] text-white font-bold rounded-full'>
                                        <GrUserAdmin />
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.role === "Super Admin" ? "" : (
                                    <button onClick={() => handleDeleteUser(user?._id)} className='text-black hover:text-red-600'>
                                        <MdDelete className='text-center text-xl' />
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {openAlert && (
                <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Do you want to proceed with this action?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => { setConfirmation(false); setAdminEmail(null); setDeleteUserId(null); }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => setConfirmation(true)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};

export default ManageUsers;

