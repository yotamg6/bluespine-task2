import { useEffect, useState } from "react";
import { PatientGroupedMedicalClaim } from "./types";
import { patientsApi } from "./patientsApi";
import _ from "lodash";
import { groupClaimsByDate, getCurrentYear } from "./utils";

const usePatients = () => {
  const [patientsData, setPatientsData] = useState<
    PatientGroupedMedicalClaim[]
  >([]);
  const [currentPatient, setCurrentPatient] =
    useState<PatientGroupedMedicalClaim>({} as PatientGroupedMedicalClaim);

  useEffect(() => {
    const fetchData = async () => {
      const allPatients = await patientsApi.getPatients();
      const groupedPatients = _.groupBy(allPatients, "patient_id"); // TODO: is this the right way?
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
            codes: claimsData.reduce<Record<string, (string | number)[]>>( // TODO: redundant?
              (acc, cur) => {
                if (acc[cur.dos_from]) {
                  acc[cur.dos_from].push(cur.code);
                } else {
                  acc[cur.dos_from] = [cur.code];
                }
                return acc;
              },
              {}
            ),
            diagnosis: claimsData.reduce<Record<string, string[]>>( // TODO: redundant?
              (acc, cur) => {
                const finalDiagnosis = cur.dx2 ? cur.dx2 : cur.dx1;
                const existingDiagnosis = acc[cur.dos_from] || [];
                acc[cur.dos_from] = Array.from(
                  new Set([...existingDiagnosis, finalDiagnosis])
                );
                return acc;
              },
              {}
            ),
            gender: claimsData[0].gender,
            // claimsByDate: groupClaimsByDate(claimsData), // TODO: redundant?
          };
        }
      );
      setPatientsData(patientsClaims);
      setCurrentPatient(patientsClaims[0]); // TODO: for now as there are no other patients. In a later version the set could be passed to a component with a dropdwon of patients, setting upon seletion
    };
    fetchData();
  }, []);
  return {
    patientsData,
    currentPatient,
  };
};
export default usePatients;
