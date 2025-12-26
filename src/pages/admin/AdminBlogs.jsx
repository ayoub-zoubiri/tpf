import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import BlogsTable from '../../components/admin/blogs/BlogsTable';
import BlogModal from '../../components/admin/blogs/BlogModal';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: 'Travel Tips',
        author: 'Admin'
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/admin/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this blog post?')) {
            try {
                await api.delete(`/admin/blogs/${id}`);
                setBlogs(blogs.filter(blog => blog.id !== id));
            } catch (error) {
                console.error("Error deleting blog", error);
            }
        }
    };

    const handleCreateClick = () => {
        setSelectedBlog(null);
        setFormData({ title: '', excerpt: '', content: '', image_url: '', category: 'Travel Tips', author: 'Admin' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditClick = (blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt || '',
            content: blog.content,
            image_url: blog.image_url || '',
            category: blog.category,
            author: blog.author
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await api.put(`/admin/blogs/${selectedBlog.id}`, formData);
                setBlogs(blogs.map(b => b.id === selectedBlog.id ? response.data : b));
            } else {
                const response = await api.post('/admin/blogs', formData);
                setBlogs([response.data, ...blogs]);
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error saving blog", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl"></i>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleCreateClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i> New Post
                </button>
            </div>

            <BlogsTable 
                blogs={blogs} 
                onEdit={handleEditClick} 
                onDelete={handleDelete} 
            />

            <BlogModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                isEditing={isEditing}
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </div>
    );
};

export default AdminBlogs;
