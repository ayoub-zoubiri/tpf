import React from 'react';

const RecentUsers = ({ users }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-4">Recent Users</h3>
            {users && users.length > 0 ? (
                <div className="space-y-3">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-grow">
                                <div className="font-medium text-slate-800 text-sm">{user.name}</div>
                                <div className="text-slate-400 text-xs">{user.email}</div>
                            </div>
                            <div className="text-slate-400 text-xs">
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-400 text-sm text-center py-4">No users yet</p>
            )}
        </div>
    );
};

export default RecentUsers;
