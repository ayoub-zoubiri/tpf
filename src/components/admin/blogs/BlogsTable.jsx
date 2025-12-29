import React from 'react';

const BlogsTable = ({ blogs, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                        <th className="p-4">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                            <td className="p-4">
                                <div className="font-medium text-slate-900 text-sm">{blog.title}</div>
                                <div className="text-slate-400 text-xs">#{blog.id}</div>
                            </td>
                            <td className="p-4">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
                                    {blog.category}
                                </span>
                            </td>
                            <td className="p-4 text-slate-600 text-sm">{blog.author}</td>
                            <td className="p-4 text-slate-400 text-xs">{new Date(blog.created_at).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                                <button onClick={() => onEdit(blog)} className="text-slate-400 hover:text-blue-600 p-2 transition" >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={() => onDelete(blog.id)}className="text-slate-400 hover:text-red-600 p-2 transition">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogsTable;
