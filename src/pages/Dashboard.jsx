import React from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard() {

    const { user } = useAuth();
  return (
    <>
        <h1 className="mb-4">Dashboard</h1>
        <h4 className='mb-4'>Welcome, {user.role.toUpperCase()}</h4>
    </>
  )
}

export default Dashboard