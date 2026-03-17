import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../utils/api';

function Report() {
    const [searchparams] = useSearchParams();
    const id = searchparams.get("appointmentid")
    const navigate = useNavigate();

    const [report, setReport] = useState({
        diagnosis: "",
        testRecommended: "",
        remarks: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/reports/" + id, report);

            if (response && !response.error) {
                setReport({
                    diagnosis: "",
                    testRecommended: "",
                    remarks: ""
                });

                navigate("/doctor/queue");
            }
            else {
                alert(response.error || "Failed to provide report");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <h1>Add Report (Appointment ID : {id})</h1>

            <form className='card shadow-sm mb-5 p-3' onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Diagnosis</label>
                    <span className='text-danger'>*</span>
                    <input className='form-control' value={report.diagnosis} onChange={(e) => setReport({ ...report, diagnosis: e.target.value })} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Test Recommended(Optional)</label>
                    <input className='form-control' value={report.testRecommended} onChange={(e) => setReport({ ...report, testRecommended: e.target.value })} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Remarks(Optional)</label>
                    <input className='form-control' value={report.remarks} onChange={(e) => setReport({ ...report, remarks: e.target.value })} />
                </div>

                <div className="row">
                    <div className="col-3">
                        <button type='submit' className='btn btn-primary'>Save Report</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Report