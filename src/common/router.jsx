import { createBrowserRouter } from 'react-router-dom'
import Root from '../routes/Root.jsx'
import Patient from '../routes/Patients.jsx'
import Appointment from '../routes/Appointment.jsx'

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
      },
      {
        id: 2,
        name: "Appointments",
        path: "appointments/",
        element: <Appointment />,
      },
      // {
      //   path: "logout/",
      //   element: <Logout />,
      // },
    ]
  }
])