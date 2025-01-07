import { useEffect, useState } from "react";
import _ from "lodash";
import { PatientGroupedMedicalClaim } from "../types/types";
import { patientsApi } from "../api/patientsApi";
import { getCurrentYear } from "../utils/utils";

const usePatients = () => {
  const [patientsData, setPatientsData] = useState<
    PatientGroupedMedicalClaim[]
  >([]);
  const [currentPatient, setCurrentPatient] =
    useState<PatientGroupedMedicalClaim>({} as PatientGroupedMedicalClaim);

  useEffect(() => {
    const fetchData = async () => {
      const allPatients = await patientsApi.getPatients();
      const groupedPatients = _.groupBy(allPatients, "patient_id");
      const patientsClaims = Object.entries(groupedPatients).map(
        ([patientId, claimsData]) => {
          return {
            patientId,
            dob: getCurrentYear(claimsData[0].dob),
            dosFrom: claimsData.reduce<Record<string, number>>((acc, cur) => {
              if (acc[cur.dos_from]) {
                acc[cur.dos_from]++;
              } else {
                acc[cur.dos_from] = 1;
              }
              return acc;
            }, {}),
            gender: claimsData[0].gender,
          };
        }
      );
      setPatientsData(patientsClaims);
      setCurrentPatient(patientsClaims[0]); //for now as there are no other patients. In a later version the set could be passed to a component with a dropdwon of patients, setting upon seletion
    };
    fetchData();
  }, []);
  return {
    patientsData,
    currentPatient,
  };
};
export default usePatients;
