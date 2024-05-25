import { useContext } from "react"
import { PatientContext } from "../provider"

const usePatientContext = () => {
    const context = useContext(PatientContext);

    if (!context) {
        throw new Error('usePatientContext must be called within PatientProvider')
    }

    return {
        patients: context.patients,
        loading: context.loading,
        error: context.error,
        addPatient: context.addPatient,
        updatePatient: context.updatePatient,
        deletePatient: context.deletePatient,
        searchPatient: context.searchPatient,
        currentPatient: context.currentPatient,
        setCurrentPatient: context.setCurrentPatient,
    };
}

export { usePatientContext }