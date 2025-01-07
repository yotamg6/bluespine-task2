import PageHeader from "./PageHeader";
import TimeLine from "./TimeLine";
import usePatients from "../hooks/usePatients";
import { PATIENT_HEADER } from "../utils/constants";
import { getPersonSubHeaderText } from "../utils/utils";
import InfoBar from "./InfoBar";
import { useEffect } from "react";

const Patient = () => {
  const { currentPatient } = usePatients();
  const subHeaderInfo = getPersonSubHeaderText(
    "Patient",
    currentPatient.patientId,
    currentPatient.gender,
    currentPatient.dob
  );

  useEffect(() => {
    document.title = "Bluespine - Task-2";
  });
  return (
    <>
      <PageHeader header={PATIENT_HEADER} />
      <InfoBar subHeaderInfo={subHeaderInfo} />
      <TimeLine patientId={currentPatient.patientId} />
    </>
  );
};

export default Patient;
