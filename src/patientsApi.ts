import _ from "lodash";
import patientsData from "./patientsData.json";
import { groupClaimsByDate, sortStringDate } from "./utils";
import { MedicalClaim } from "./types";

const DELAY = 500; //MS

const withDelay = async <T>(data: T): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return data;
};

export const patientsApi = {
  //TODO:  should I have here some form of endpoints instead? and a mapper indicating each endpoint to functionality?
  getPatients: async () => {
    return await withDelay(patientsData);
  },

  getPatientById: async (patientId: number): Promise<MedicalClaim[]> => {
    const patients = await patientsApi.getPatients();
    const patient = patients.filter((data) => data.patient_id === patientId);
    return await withDelay(patient);
  },
  getPatientClaims: async (
    patientId: number,
    page?: number, //TODO: eventually make optional again in all places
    pageSize?: number
  ) => {
    const patient = (await patientsApi.getPatientById(patientId)).sort(
      sortStringDate
    );
    const claimdata = groupClaimsByDate(patient, page, pageSize);
    return claimdata;
  },
};
