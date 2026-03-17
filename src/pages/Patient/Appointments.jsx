import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import { Calendar } from 'lucide-react';
import Loading from '../../components/Loading';
import { Link, Navigate } from 'react-router-dom';

function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [createAppointment, setCreateAppointment] = useState({
        appointmentDate: "",
        timeSlot: ""
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);

            const response = await api.get("/appointments/my");

            if (!response.error) {
                setAppointments(response.data);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError("Failed to fetch appointments")
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/appointments", createAppointment);

            if (response && !response.error) {
                fetchAppointments();

                setCreateAppointment({
                    appointmentDate: "",
                    timeSlot: ""
                })
            }
            else {
                alert(response.error || "Failed to create appointment");
            }
        } catch (error) {
            alert(error);
        }
    };

    const getColour = (status) => {
        switch(status){
            case "waiting":
                return "badge bg-warning text-dark"
            case "in_progress":
                return "badge bg-primary"
            case "skipped":
                return "badge bg-secondary"
            case "done":
                return "badge bg-success"
            default:
                return "badge bg-dark"
        }
    };

    return (
        <>
            <h1><Calendar size={35} />Appointments List</h1>

            {loading && <Loading />}

            {error && (
                <div className='mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3'>
                    {error}
                </div>
            )}

            <form className='card shadow-sm mb-5 p-3' onSubmit={handleSubmit}>
                <div className="row mb-2">
                    <div className="col">
                        <label className="form-label">Appointment Date</label>
                        <span className='text-danger'>*</span>
                        <input type="date" value={createAppointment.appointmentDate} onChange={(e) => setCreateAppointment({ ...createAppointment, appointmentDate: e.target.value })} className="form-control" placeholder="Name" aria-label="Name" required />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <label className="form-label">Role</label>
                        <span className='text-danger'>*</span>
                        <select className="form-select" value={createAppointment.timeSlot} onChange={(e) => setCreateAppointment({ ...createAppointment, timeSlot: e.target.value })} aria-label="Default select example" required>
                            <option value="" disabled>Select Slot</option>
                            <option value="09:00-09:15">09:00-09:15</option>
                            <option value="09:15-09:30">09:15-09:30</option>
                            <option value="09:30-09:45">09:30-09:45</option>
                            <option value="09:45-10:00">09:45-10:00</option>
                            <option value="10:00-10:15">10:00-10:15</option>
                            <option value="10:15-10:30">10:15-10:30</option>
                            <option value="10:30-10:45">10:30-10:45</option>
                            <option value="10:45-11:00">10:45-11:00</option>
                            <option value="11:00-11:15">11:00-11:15</option>
                            <option value="11:15-11:30">11:15-11:30</option>
                            <option value="11:30-11:45">11:30-11:45</option>
                            <option value="11:45-12:00">11:45-12:00</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <button type='submit' className='btn btn-primary'>Book Appointment</button>
                    </div>
                </div>
            </form>

            {appointments.length <= 0 && <div className='text-center'>No Appointments Booked, Try to Book Your First Appontment</div>}

            {appointments.length > 0 &&
                <table className='table table-borderd'>
                    <thead className='table-light'>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Token</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(apt => (
                            <tr key={apt.id}>
                                <th scope="row">{apt.appointmentDate}</th>
                                <td>{apt.timeSlot}</td>
                                <td>{apt.queueEntry.tokenNumber}</td>
                                <td><span className={getColour(apt.queueEntry.status)}>{apt.queueEntry.status}</span></td>
                                <td><Link className='btn btn-primary' to={`/patient/appointments/${apt.id}`}>Medicine & Report</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default Appointments