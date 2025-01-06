import usePatients from "./usePatients";
import Patient from "./Patient";

const PatientsContainer = () => {
  const { currentPatient } = usePatients();
  return <Patient patient={currentPatient} />;
};
export default PatientsContainer;
