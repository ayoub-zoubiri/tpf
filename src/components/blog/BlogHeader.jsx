import React from 'react';

const BlogHeader = () => {
    return (
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Travel Blog</h1>
                <p className="text-slate-300 max-w-xl mx-auto">
                    Expert advice, insider guides, and travel inspiration for your next adventure.
                </p>
            </div>
        </div>
    );
};

export default BlogHeader;
