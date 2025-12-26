import React from 'react';

const BlogPostHero = ({ post }) => {
    return (
        <div className="relative h-72 md:h-96 bg-slate-900 mt-16">
            <img 
                src={post.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"} 
                alt={post.title} 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
                <div className="max-w-3xl">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide mb-4">
                        {post.category || 'Travel Tips'}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                        <span className="flex items-center gap-2">
                            <i className="fa-regular fa-user"></i> {post.author || 'Toplago Team'}
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fa-regular fa-calendar"></i> {new Date(post.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostHero;
