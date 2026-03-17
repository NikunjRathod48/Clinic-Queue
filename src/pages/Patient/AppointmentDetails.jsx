import { MoveLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api';
import { useEffect, useState } from 'react';

function AppointmentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetchAppointmentDetails();
    }, []);

    const fetchAppointmentDetails = async () => {
        try {
            const response = await api.get("appointments/" + id);

            if (response && !response.error) {

                console.log(response.data);
                setAppointment(response.data);
            }
            else {
                alert(response.error || "Failed to fetch appointment details")
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <>
            <h1>Appointment Details</h1>
            <button className='btn btn-primary mb-2 mt-2' onClick={() => navigate(-1)}><MoveLeft size={18} />Back</button>
            <div className='card shadow-sm mb-2 p-3'>
                <h5>Appointment</h5>
                <div><b>Date : </b>{appointment.appointmentDate} · <b>Time : </b>{appointment.timeSlot}</div>
                <div><b>Token : </b>{appointment.queueEntry?.tokenNumber} · <b>Status : </b>{appointment.queueEntry?.status}</div>
            </div>

            <div className='card shadow-sm mb-2 p-3'>
                <h5>Medicines (Prescriptions)</h5>
                {appointment.prescription == null && <div>No Prescription Added For this appointment</div>}
                {appointment.prescription != null && (
                    <>
                        <div className="mb-2">
                            <b>Doctor : </b> {appointment.prescription.doctor?.name}
                        </div>

                        <div className="mb-2">
                            <b>Notes : </b> {appointment.prescription.notes}
                        </div>

                        <table className='table table-borderd table-sm'>
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Dosage</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.prescription.medicines?.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.name}</td>
                                        <td>{med.dosage}</td>
                                        <td>{med.duration}</td>
                                    </tr>   
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            <div className='card shadow-sm mb-2 p-3'>
                <h5>Reports</h5>
                {appointment.report == null && <div>No Reports Added For this appointment</div>}
                {appointment.report != null && (
                    <>
                        <div><b>Doctor : </b>{appointment.prescription.doctor?.name}</div>
                        <div><b>Diagnosis : </b>{appointment.report.diagnosis}</div>
                        <div><b>Test Recommended : </b>{appointment.report.testRecommended || 'Not Recommended'}</div>
                        <div><b>Remarks : </b>{appointment.report.remarks || "No Remarks"}</div>
                    </>
                )}
            </div>
        </>
    )
}

export default AppointmentDetails