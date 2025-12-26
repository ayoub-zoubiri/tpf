import React from 'react';
import { Link } from 'react-router-dom';

const TripsTable = ({ trips, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                        <th className="p-4">Trip</th>
                        <th className="p-4">Destination</th>
                        <th className="p-4">User</th>
                        <th className="p-4">Duration</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip => (
                        <tr key={trip.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                            <td className="p-4">
                                <div className="font-medium text-slate-900 text-sm">{trip.trip_title}</div>
                                <div className="text-slate-400 text-xs">#{trip.id}</div>
                            </td>
                            <td className="p-4 text-slate-600 text-sm">{trip.destination}</td>
                            <td className="p-4">
                                {trip.user?.name ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                            {trip.user.name.charAt(0)}
                                        </div>
                                        <span className="text-slate-600 text-sm">{trip.user.name}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-400 text-sm">Guest</span>
                                )}
                            </td>
                            <td className="p-4 text-slate-600 text-sm">{trip.duration}d</td>
                            <td className="p-4 text-right">
                                <Link 
                                    to={`/trips/${trip.id}`}
                                    target="_blank"
                                    className="text-slate-400 hover:text-blue-600 p-2 inline-block transition"
                                >
                                    <i className="fa-solid fa-eye"></i>
                                </Link>
                                <button 
                                    onClick={() => onEdit(trip)}
                                    className="text-slate-400 hover:text-green-600 p-2 transition"
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button 
                                    onClick={() => onDelete(trip.id)}
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

export default TripsTable;
