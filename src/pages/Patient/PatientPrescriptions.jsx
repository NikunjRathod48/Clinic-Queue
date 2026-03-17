import React, { useEffect, useState } from 'react'
import api from '../../utils/api';

function PatientPrescription() {

  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, [])

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get("/prescriptions/my");

      if (response && !response.error) {
        setPrescriptions(response.data);
      }
      else {
        alert(response.error || "Failed to fetch prescriptions");
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <h4>My Prescriptions</h4>

      {prescriptions.length === 0 && <div className='text-center'>No Prescriptions Found</div>}

      {
        prescriptions.map(pres => (
          <div key={pres.id} className='card shadow-sm mb-4 p-3'>
            <div className="d-flex justify-content-between mb-2">
              <div>
                <b>Date : </b> {pres.appointment?.appointmentDate}
              </div>
              <div>
                <b>Time : </b> {pres.appointment?.timeSlot}
              </div>
            </div>

            <div className="mb-2">
              <b>Doctor : </b> {pres.doctor?.name}
            </div>

            <div className="mb-2">
              <b>Notes : </b> {pres.notes || "No Notes"}
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
                {pres.medicines?.map((med, index) => (
                  <tr key={index}>
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      }
    </>
  )
}

export default PatientPrescription