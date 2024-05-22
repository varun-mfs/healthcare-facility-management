import { createBrowserRouter } from 'react-router-dom'
import Root from '../pages/Root.jsx'
import Patient from '../pages/Patients.jsx'
import Appointment from '../pages/Appointment.jsx'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Signup from '../pages/Signup.jsx'
import Login from '../pages/Login.jsx'
import RequireAuth from '../shared/components/RequireAuth.jsx'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Root /></RequireAuth>,
    children: [
      {
        id: 1,
        name: "Patients",
        // path: "patients/",
        index: true,
        element: <Patient />,
        icon: AccessibilityIcon,
      },
      {
        id: 2,
        name: "Appointments",
        path: "appointments/",
        element: <Appointment />,
        icon: AccessAlarmsIcon,
      },
      // {
      //   path: "logout/",
      //   element: <Logout />,
      // },
    ]
  },
  {
    path: "register/",
    element: <Signup />,
  },
  {
    path: "login/",
    element: <Login />,
  },
])