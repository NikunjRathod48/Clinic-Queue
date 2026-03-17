import React, { useEffect, useState } from 'react'
import api from '../../utils/api';

function Clinic() {

  const [clinic, setClinic] = useState({});

  useEffect(() => {
    fetchClinic();
  }, []);

  const fetchClinic = async () => {
    try {
      const response = await api.get("/admin/clinic");

      if(response && !response.error){
        setClinic(response.data);
      }
      else{
        alert(response.error || "Failed to fetch Clinic Info")
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <h1>My Clinic</h1>
      <div className="card shadow-sm p-3">
        <h4>{clinic.name}</h4>
        <div>Clinic Code : {clinic.code}</div>
        <div>User Count : {clinic.userCount}   Appointments : {clinic.appointmentCount} </div>
      </div>
    </>
  )
}

export default Clinic