import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { User } from 'lucide-react';

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createUser, setCreateUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "receptionist",
    phone: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/users");

      if (!response.error) {
        setUsers(response.data);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError("Failed to fetch Users")
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/admin/users", createUser);

      if (response && !response.error) {
        fetchUsers();

        setCreateUser({
          name: "",
          email: "",
          password: "",
          role: "receptionist",
          phone: ""
        })
      }
      else {
        alert(response.error || "Failed to create user");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1><User size={35} />Users List</h1>

      {loading && <Loading />}

      {error && (
        <div className='mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3'>
          {error}
        </div>
      )}

      <form className='card shadow-sm mb-5 p-3' onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col">
            <label className="form-label">Name</label>
            <span className='text-danger'>*</span>
            <input type="text" value={createUser.name} onChange={(e) => setCreateUser({ ...createUser, name: e.target.value })} className="form-control" placeholder="Name" aria-label="Name" required />
          </div>
          <div className="col">
            <label className="form-label">Email</label>
            <span className='text-danger'>*</span>
            <input type="email" value={createUser.email} onChange={(e) => setCreateUser({ ...createUser, email: e.target.value })} className="form-control" placeholder="Email" aria-label="Email" required />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label className="form-label">Password</label>
            <span className='text-danger'>*</span>
            <input type="password" value={createUser.password} onChange={(e) => setCreateUser({ ...createUser, password: e.target.value })} className="form-control" placeholder="Password" aria-label="Password" required />
          </div>
          <div className="col">
            <label className="form-label">Role</label>
            <span className='text-danger'>*</span>
            <select className="form-select" value={createUser.role} onChange={(e) => setCreateUser({ ...createUser, role: e.target.value })} aria-label="Default select example" required>
              <option value="receptionist">Receptionist</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">Phone(Optional)</label>
            <input type="tel" value={createUser.phone} onChange={(e) => setCreateUser({ ...createUser, phone: e.target.value })} className="form-control" aria-label="Phone" />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <button type='submit' className='btn btn-primary'>Add User</button>
          </div>
        </div>
      </form>

      <table className='table table-borderd'>
        <thead className='table-light'>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.name}</th>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users