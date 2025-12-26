import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    return (
        <Link 
            to={`/blog/${post.id}`}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition group"
        >
            <div className="aspect-[16/10] overflow-hidden">
                <img 
                    src={post.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">Travel Tips</span>
                    <span>•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.content}</p>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-medium text-slate-600">Toplago Team</span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
