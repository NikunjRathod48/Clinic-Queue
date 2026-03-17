import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='d-flex flex-column vh-100'>
        <Header />
        <div className='container-fluid flex-grow-1'>
            <div className='row h-100'>
                <Sidebar />
                <div className='col-md-10 p-4 bg-body-tertiary overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout