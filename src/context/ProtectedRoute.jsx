import React from 'react'
import { useAuth } from './AuthContext'
import Loading from '../components/Loading';
import Login from '../pages/Login';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children , allowedRoles = []}) {

    const { user, loading } = useAuth();

    if(loading){
        return <Loading />
    }

    if(!user){
        return <Navigate to={"/login"} replace />
    }

    if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
        return <Navigate to={"/"} replace />
    }

  return children;
}

export default ProtectedRoute