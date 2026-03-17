import { Calendar, Clipboard, Hospital, LayoutDashboard, Package, Pill, ShoppingCart, User, Users } from 'lucide-react';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {

    const { user } = useAuth();

    const menu = [
        {
            title: "Dashboard",
            path: '/',
            icon: <LayoutDashboard size={18} />,
            roles: ["admin", "patient", "doctor", "receptionist"]
        },
        {
            title: "Clinic",
            path: '/admin/clinic',
            icon: <Hospital size={18} />,
            roles: ["admin"]
        },
        {
            title: "Users",
            path: '/admin/users',
            icon: <Users size={18} />,
            roles: ["admin"]
        },
        {
            title: "Appointments",
            path: '/patient/appointments',
            icon: <Calendar size={18} />,
            roles: ["patient"]
        },
        {
            title: "Queue",
            path: '/receptionist/queue',
            icon: <User size={18} />,
            roles: ["receptionist"]
        },
        {
            title: "Queue",
            path: '/doctor/queue',
            icon: <User size={18} />,
            roles: ["doctor"]
        },
        {
            title: "Prescriptions",
            path: '/patient/prescriptions',
            icon: <Pill size={18} />,
            roles: ["patient"]
        },
        {
            title: "Reports",
            path: '/patient/reports',
            icon: <Clipboard size={18} />,
            roles: ["patient"]
        },
    ];

    const filteredMenu = menu.filter(item => {
        return item.roles.includes(user?.role);
    });

    return (
        <div className="col-md-2 bg-light border-end pt-3">
            <h6 className="text-center text-muted mb-4">
                MENU
            </h6>

            <ul className='nav flex-column'>
                {filteredMenu.map((item, i) => (
                    <li key={i} className="nav-item">
                        <button type='button' className='btn d-flex align-items-center gap-2 px-3 ho'>
                            <NavLink className="nav-link" to={item.path}>
                                {item.icon}
                                {item.title}
                            </NavLink>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar