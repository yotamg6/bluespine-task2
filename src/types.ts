export interface MedicalClaim {
  // TODO: am I using this
  id: number | string;
  patient_id: number;
  rend_provider_id: number;
  // dob: number;
  dob: number | string; // adjusted to json typings
  gender: string;
  // gender: "F" | "M"; //according to data
  // billing_class: "professional" | "institutional"; //according to data
  billing_class: string;
  line: number;
  dos_from: string;
  // revcode: string;
  revcode: string | number; // adjusted to json typings
  code: string | number;
  dx1: string; //TODO: both are needed?
  dx2: string;
  allowed: number;
}

export interface PatientGroupedMedicalClaim {
  patientId: string;
  dob: MedicalClaim["dob"];
  gender: MedicalClaim["gender"];
  dosFrom: Record<MedicalClaim["dos_from"], number>;
  codes: Record<MedicalClaim["dos_from"], MedicalClaim["code"][]>;
  diagnosis: Record<
    MedicalClaim["dos_from"],
    (MedicalClaim["dx1"] | MedicalClaim["dx2"])[] // TODO: needed? can do just with one, no?
  >;
  // claimsByDate: Record<string, ClaimByDate>; // TODO: Remove
}

export interface ClaimByDate {
  diagnosis: string[];
  codes: (string | number)[];
  numOfVisits: number;
  totalAllowed: number;
}

export interface ClaimsByDateResponse {
  claim: Record<string, ClaimByDate>;
  currentIndex: number;
}
