import React from 'react';
import { toast } from 'react-toastify';

const showToast = (message, status) => {
    switch (status) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
        case 'warning':
            toast.warn(message);
            break;
        default:
            toast(message);
    }
}


export default showToast;