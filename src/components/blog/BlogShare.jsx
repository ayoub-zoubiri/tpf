import React from 'react';

const BlogShare = () => {
    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-slate-500 text-sm">Share:</span>
            <button className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-500 transition">
                <i className="fa-brands fa-twitter"></i>
            </button>
            <button className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-500 transition">
                <i className="fa-brands fa-facebook-f"></i>
            </button>
            <button className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-500 transition">
                <i className="fa-brands fa-linkedin-in"></i>
            </button>
        </div>
    );
};

export default BlogShare;
