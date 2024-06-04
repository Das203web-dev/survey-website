import React from 'react';

const Cover = ({ title, image, description }) => {
    return (
        <div className='h-[300px]' style={{ backgroundImage: `${image}` }}>
            <h1>{title}</h1>
            {
                description ? <p>{description}</p> : ""
            }
        </div>
    );
};

export default Cover;