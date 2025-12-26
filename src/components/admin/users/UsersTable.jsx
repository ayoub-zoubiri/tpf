import React from 'react';

const UsersTable = ({ users, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                        <th className="p-4">User</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Joined</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-slate-900">{user.name}</span>
                                </div>
                            </td>
                            <td className="p-4 text-slate-600 text-sm">{user.email}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                    user.role === 'admin' 
                                        ? 'bg-purple-50 text-purple-600' 
                                        : 'bg-blue-50 text-blue-600'
                                }`}>
                                    {user.role || 'user'}
                                </span>
                            </td>
                            <td className="p-4 text-slate-400 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                                <button 
                                    onClick={() => onEdit(user)}
                                    className="text-slate-400 hover:text-blue-600 p-2 transition"
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button 
                                    onClick={() => onDelete(user.id)}
                                    className="text-slate-400 hover:text-red-600 p-2 transition"
                                >
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

export default UsersTable;
