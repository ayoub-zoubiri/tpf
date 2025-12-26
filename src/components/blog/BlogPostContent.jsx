import React from 'react';
import { Link } from 'react-router-dom';
import BlogShare from './BlogShare';

const BlogPostContent = ({ post }) => {
    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition">
                <i className="fa-solid fa-arrow-left text-sm"></i> Back to Blog
            </Link>

            <article className="bg-white rounded-2xl p-8 md:p-12 border border-slate-100">
                <div className="prose prose-slate prose-lg max-w-none">
                    {post.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-slate-600 leading-relaxed mb-4">{paragraph}</p>
                    ))}
                </div>
            </article>

            <BlogShare />
        </div>
    );
};

export default BlogPostContent;
