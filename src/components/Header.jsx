import React from 'react'
import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react';

function Header() {

    const { logout } = useAuth();

    return (
        <nav className='navbar navbar-dark bg-dark px-4'>
            <span className='navbar-brand fw-semibold'>Clinic Queue</span>

            <button className='btn btn-outline-light btn-sm d-flex align-items-center gap-2' onClick={logout}>
                <LogOut size={18} />
                LogOut
            </button>
        </nav>
    )
}

export default Header