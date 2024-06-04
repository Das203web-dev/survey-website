import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import React from 'react';

const Test = () => {
    const axsiosPublic = UseAxiosPublic()
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value
        console.log(name, email, phone, address)
        const userInfo = { name, email, phone, address };
        axsiosPublic.post("/test", userInfo)
            .then(res => console.log(res.data));
    }
    return (
        <div>
            <form onSubmit={handleForm} className='flex flex-col gap-5 mx-auto w-2/3 text-red-700'>
                <label htmlFor="name">Name</label>
                <input placeholder='Name' type="text" name="name" id="name" />
                <label htmlFor="email">Email</label>
                <input placeholder='Email' type="email" name="email" id="email" />
                <label htmlFor="phone">Phone</label>
                <input placeholder='Phone' type="number" name="phone" id="phone" />
                <label htmlFor="address">Address</label>
                <input placeholder='Address' type="text" name="address" id="address" />
                <input className='bg-white p-2 text-black' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Test;