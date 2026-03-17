import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Users from './pages/Admin/Users'
import ProtectedRoute from './context/ProtectedRoute';
import Clinic from './pages/Admin/Clinic';
import Appointments from './pages/Patient/Appointments';
import AppointmentDetails from './pages/Patient/AppointmentDetails';
import Queue from './pages/Receptionist/Queue';
import DoctorQueue from './pages/Doctor/DoctorQueue';
import Prescription from './pages/Doctor/Prescription';
import Report from './pages/Doctor/Report';
import PatientPrescription from './pages/Patient/PatientPrescriptions';
import PatientReport from './pages/Patient/PatientReport';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute allowedRoles={["admin", "patient", "doctor", "receptionist"]}><Dashboard /></ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute allowedRoles={["admin"]}><Users /></ProtectedRoute>} />
            <Route path='/admin/clinic' element={<ProtectedRoute allowedRoles={["admin"]}><Clinic /></ProtectedRoute>} />
            <Route path='/patient/appointments' element={<ProtectedRoute allowedRoles={["patient"]}><Appointments /></ProtectedRoute>} />
            <Route path='/patient/appointments/:id' element={<ProtectedRoute allowedRoles={["patient"]}><AppointmentDetails /></ProtectedRoute>} />
            <Route path='/patient/prescriptions' element={<ProtectedRoute allowedRoles={["patient"]}><PatientPrescription /></ProtectedRoute>} />
            <Route path='/patient/reports' element={<ProtectedRoute allowedRoles={["patient"]}><PatientReport /></ProtectedRoute>} />
            <Route path='/receptionist/queue' element={<ProtectedRoute allowedRoles={["receptionist"]}><Queue /></ProtectedRoute>} />
            <Route path='/doctor/queue' element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorQueue /></ProtectedRoute>} />
            <Route path='/doctor/prescription' element={<ProtectedRoute allowedRoles={["doctor"]}><Prescription /></ProtectedRoute>} />
            <Route path='/doctor/report' element={<ProtectedRoute allowedRoles={["doctor"]}><Report /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
