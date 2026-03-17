export const getUserRole = () => {
    const token = localStorage.getItem("token");

    // User Not Logged - In
    if(!token){
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.user.UserRole;
    } catch (error) {
        return error || null;
    }
};

export const hasRole = (allowedRoles) => {
    const role = getUserRole();
    return allowedRoles.includes(role);
}