import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import BlogHeader from '../components/blog/BlogHeader';
import BlogCard from '../components/blog/BlogCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/blog');
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching blog posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                <BlogHeader />

                {/* Content */}
                <div className="container mx-auto px-6 py-12 max-w-6xl">
                    {loading ? (
                        <div className="text-center py-16">
                            <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl mb-4"></i>
                            <p className="text-slate-500">Loading posts...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fa-regular fa-newspaper text-blue-600 text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No posts yet</h3>
                            <p className="text-slate-500">Check back later for travel stories!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
