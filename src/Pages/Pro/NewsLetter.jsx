import { Button } from '@/components/ui/button';
import React from 'react';

const NewsLetter = () => {
    return (
        <div className="newsletter-section my-10 bg-[#2ab16e] text-white space-y-5 py-10 px-5 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-5">Stay Updated</h2>
            <p className="text-lg mb-5">Subscribe to our newsletter to get the latest surveys and updates directly in your inbox.</p>
            <input type="email" placeholder="Enter your email" className="text-black px-3 py-2 focus:outline-none rounded-md" />
            <Button className="bg-white text-primary/90 hover:text-white font-bold py-2 px-5 rounded-md transition-all ml-2">
                Subscribe
            </Button>
        </div>
    );
};

export default NewsLetter;