import { createContext, useState } from 'react';
import { usePatients } from '../hooks';
const PatientContext = createContext();

const PatientProvider = ({ children }) => {

    const [currentPatient, setCurrentPatient] = useState(null);
    const data = usePatients();

    return (
        <PatientContext.Provider value={{ ...data, currentPatient, setCurrentPatient }}>
            {children}
        </PatientContext.Provider>
    )
}

export { PatientProvider, PatientContext }