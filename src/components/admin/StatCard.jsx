import React from 'react';

const StatCard = ({ icon, colorClass, bgClass, label, value }) => {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${bgClass} ${colorClass} rounded-xl flex items-center justify-center`}>
                <i className={`${icon} text-lg`}></i>
            </div>
            <div>
                <p className="text-slate-500 text-sm">{label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;
