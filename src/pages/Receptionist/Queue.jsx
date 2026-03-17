import React, { useEffect, useState } from 'react'
import api from '../../utils/api';

function Queue() {
    
    const getToday = () => {
        return new Date().toISOString().split("T")[0];
    }

    const [date, setDate] = useState(getToday());

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (date) {
            fetchAppointments();
        }
    }, [date]);

    const fetchAppointments = async () => {
        try {
            const response = await api.get("queue?date=" + date);

            if (response && !response.error) {
                setAppointments(response.data);
            } else {
                alert(response.error || "Failed to fetch appointments");
            }
        } catch (error) {
            alert(error)
        }
    };

    const getColour = (status) => {
        switch (status) {
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

    const renderAction = (apt) => {
        if (apt.status === "waiting") {
            return (
                <>
                    <button className='btn btn-sm btn-primary me-2' onClick={() => updateStatus(apt.id, "in-progress")}>In Progress</button>
                    <button className='btn btn-sm btn-info' onClick={() => updateStatus(apt.id, "skipped")}>Skip</button>
                </>
            )
        }

        if (apt.status === "in_progress") {
            return (
                <button className='btn btn-sm btn-success' onClick={() => updateStatus(apt.id, "done")}>Done</button>
            )
        }

        return <span>No Actions</span>
    }

    const updateStatus = async (id, status) => {
        try {
            const response = await api.patch("/queue/" + id, { status });

            if (response && !response.error) {
                fetchAppointments();
            } else {
                alert(response.error || "Failed to update appointment status");
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <h1>Queue</h1>

            <form className='card shadow-sm mb-5 p-3'>
                <div className="col">
                    <label className="form-label">Date</label>
                    <span className='text-danger'>*</span>
                    <input type="date" value={date} onChange={(e) => { setDate(e.target.value); console.log(date) }} className="form-control" aria-label="Name" required />
                </div>
            </form>

            <div className="card shadow-sm">

                {appointments.length <= 0 && <b className='text-center'>No Appointments</b>}
                {appointments.length > 0 &&
                    <table className='table table-borderd'>
                        <thead className='table-light'>
                            <tr>
                                <th scope="col">Token</th>
                                <th scope="col">Patient</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Time Slot</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(apt => (
                                <tr key={apt.id}>
                                    <th scope="row">{apt.tokenNumber}</th>
                                    <th scope="row">{apt.appointment.patient.name}</th>
                                    <td>{apt.appointment.patient.phone || "N/A"}</td>
                                    <td>{apt.appointment.timeSlot}</td>
                                    <td><span className={getColour(apt.status)}>{apt.status}</span></td>
                                    <td>{renderAction(apt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}

export default Queue