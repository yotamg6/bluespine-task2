import React from "react";
import { PatientGroupedMedicalClaim } from "./types";
import PatientPageHeader from "./PatientPageHeader";
import PatientSubheader from "./PatientDetailsBar";
import TimeLineContainer from "./TimeLineContainer";

interface PatientProps {
  patient: PatientGroupedMedicalClaim;
}

const Patient = ({ patient }: PatientProps) => {
  return (
    <>
      <PatientPageHeader />
      <PatientSubheader
        patientId={patient.patientId}
        gender={patient.gender}
        age={patient.dob}
      />
      <TimeLineContainer
        patientId={patient.patientId}
      />
    </>
  );
};

export default Patient;
