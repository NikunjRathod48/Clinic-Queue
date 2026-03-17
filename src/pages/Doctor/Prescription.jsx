import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../utils/api';

function Prescription() {

    const [searchparams] = useSearchParams();
    const id = searchparams.get("appointmentid")
    const navigate = useNavigate();

    const [prescription, setPrescription] = useState({
        medicines: [
            {
                name: "",
                dosage: "",
                duration: ""
            }
        ],
        notes: "After food"
    });

    const handleMedicineChange = (index, field, value) => {
        const updatedMedicines = [...prescription.medicines];
        updatedMedicines[index][field] = value;

        setPrescription({
            ...prescription,
            medicines: updatedMedicines
        })
    };

    const addMedicine = () => {
        setPrescription({
            ...prescription,
            medicines: [
                ...prescription.medicines,
                {
                    name: "",
                    dosage: "",
                    duration: ""
                }
            ]
        })
    };

    const removeMedicine = (index) => {
        const updatedMedicine = prescription.medicines.filter((_, i) => i !== index);

        setPrescription({
            ...prescription,
            medicines: updatedMedicine
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/prescriptions/" + id, prescription);

            if (response && !response.error) {
                setPrescription({
                    medicines: [
                        {
                            name: "",
                            dosage: "",
                            duration: ""
                        }
                    ],
                    notes: "After food"
                });

                navigate("/doctor/queue");
            }
            else {
                alert(response.error || "Failed to provide prescription");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <h1>Add Prescription (Appointment ID : {id})</h1>

            <form className='card shadow-sm mb-5 p-3' onSubmit={handleSubmit}>

                <h5 className='mb-3'>Medicines</h5>

                {prescription.medicines.map((med, index) => (
                    <div className="row mb-3 align-items-end" key={index}>
                        <div className="col-md-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className='form-control'
                                value={med.name}
                                onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Dosage</label>
                            <input
                                type="text"
                                className='form-control'
                                value={med.dosage}
                                onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Duration</label>
                            <input
                                type="text"
                                className='form-control'
                                value={med.duration}
                                onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            {index > 0 && (
                                <button type="button" className='btn btn-danger' onClick={() => removeMedicine(index)}>Remove</button>
                            )}
                        </div>
                    </div>
                ))}

                <button type='button' className='btn btn-outline-primarymb-3' onClick={addMedicine}>
                    + Add Medicine
                </button>

                <div className="mb-3">
                    <label className="form-label">Notes(Optional)</label>
                    <textarea className='form-control' value={prescription.notes} onChange={(e) => setPrescription({...prescription, notes : e.target.value})} />
                </div>

                <div className="row">
                    <div className="col-3">
                        <button type='submit' className='btn btn-primary'>Save Prescription</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Prescription