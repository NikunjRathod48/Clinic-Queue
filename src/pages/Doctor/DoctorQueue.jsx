import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';

function DoctorQueue() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/doctor/queue");

      if (response && !response.error) {
        setAppointments(response.data);
      } else {
        alert(response.error || "Failed to fetch appointments");
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
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

  return (
    <>
      <h1>Today's Queue</h1>

      {loading && <Loading />}

      {!loading &&
        <div className="card shadow-sm">

          {appointments.length <= 0 && <b className='text-center'>No Appointments</b>}
          {appointments.length > 0 &&
            <table className='table table-borderd'>
              <thead className='table-light'>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">Patient</th>
                  <th scope="col">Status</th>
                  <th scope="col">Appointment ID</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(apt => (
                  <tr key={apt.id}>
                    <th scope="row">{apt.tokenNumber}</th>
                    <th scope="row">{apt.patientName}</th>
                    <td><span className={getColour(apt.status)}>{apt.status}</span></td>
                    <td>{apt.id}</td>
                    <td>
                      {apt.status === "in_progress" &&
                        <>
                          <Link to={"/doctor/prescription?appointmentid="+apt.id} className='btn btn-sm btn-success me-2'>Add Medicine</Link>
                          <Link to={"/doctor/report?appointmentid="+apt.id} className='btn btn-sm btn-info'>Add Report</Link>
                        </>
                      }
                      {apt.status !== "in_progress" && <div>Not Arrived</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      }
    </>
  )
}

export default DoctorQueue