import React, { useEffect, useState } from 'react'
import api from '../../utils/api';

function PatientReport() {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, [])

    const fetchReports = async () => {
        try {
            const response = await api.get("/reports/my");

            if (response && !response.error) {
                setReports(response.data);
            }
            else {
                alert(response.error || "Failed to fetch reports");
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
            <h4>My Reports</h4>

            {reports.length === 0 && <div className='text-center'>No Reports Found</div>}

            {
                reports.map(rep => (
                    <div key={rep.id} className='card shadow-sm mb-4 p-3'>
                        <div className="d-flex justify-content-between mb-2">
                            <div>
                                <b>Date : </b> {rep.appointment?.appointmentDate}
                            </div>
                            <div>
                                <b>Time : </b> {rep.appointment?.timeSlot}
                            </div>
                        </div>

                        <div className="mb-2">
                            <b>Doctor : </b> {rep.doctor?.name}
                        </div>

                        <div className="mb-2">
                            <b>Diagnosis : </b> {rep.diagnosis}
                        </div>

                        <div className="mb-2">
                            <b>Test Recommended : </b> {rep.testRecommended || "No Test Recommended"}
                        </div>

                        <div className="mb-2">
                            <b>Remarks : </b> {rep.remarks || "No Remarks"}
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default PatientReport