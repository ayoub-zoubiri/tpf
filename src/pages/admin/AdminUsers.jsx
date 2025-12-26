import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import UsersTable from '../../components/admin/users/UsersTable';
import UserModal from '../../components/admin/users/UserModal';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    const handleCreateClick = () => {
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', role: 'user' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, password: '', role: user.role });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await api.put(`/admin/users/${selectedUser.id}`, formData);
                setUsers(users.map(u => u.id === selectedUser.id ? response.data : u));
            } else {
                const response = await api.post('/admin/users', formData);
                setUsers([response.data, ...users]);
            }
            setShowModal(false);
            setFormData({ name: '', email: '', password: '', role: 'user' });
        } catch (error) {
            console.error("Error saving user", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    <i className="fa-solid fa-plus"></i> Add User
                </button>
            </div>

            <UsersTable 
                users={users} 
                onEdit={handleEditClick} 
                onDelete={handleDelete} 
            />

            <UserModal 
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

export default AdminUsers;
