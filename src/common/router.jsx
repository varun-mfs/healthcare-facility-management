import { createBrowserRouter } from 'react-router-dom'
import Root from '../routes/Root.jsx'
import Patient from '../routes/Patients.jsx'
import Appointment from '../routes/Appointment.jsx'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Signup from '../routes/Signup.jsx'
import Login from '../routes/Login.jsx'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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