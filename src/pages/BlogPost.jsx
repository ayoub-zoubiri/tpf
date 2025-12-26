import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import BlogPostHero from '../components/blog/BlogPostHero';
import BlogPostContent from '../components/blog/BlogPostContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error("Error fetching blog post", err);
                setError("Failed to load blog post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-16">
                    <div className="text-center">
                        <i className="fa-solid fa-spinner animate-spin text-blue-600 text-3xl mb-4"></i>
                        <p className="text-slate-500">Loading post...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-6 pt-16">
                    <div className="bg-white rounded-2xl p-12 text-center max-w-md">
                        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Post Not Found</h2>
                        <p className="text-slate-500 mb-6">{error || "The blog post does not exist."}</p>
                        <Link to="/blog" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
                            <i className="fa-solid fa-arrow-left"></i> Back to Blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Image */}
            <BlogPostHero post={post} />

            <main className="flex-grow">
                <BlogPostContent post={post} />
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
