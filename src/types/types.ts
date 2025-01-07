export interface MedicalClaim {
  id: number | string;
  patient_id: number;
  rend_provider_id: number;
  dob: number | string;
  gender: string;
  billing_class: string;
  line: number;
  dos_from: string;
  revcode: string | number;
  code: string | number;
  dx1: string;
  dx2: string;
  allowed: number;
}

export interface PatientGroupedMedicalClaim {
  patientId: string;
  dob: MedicalClaim["dob"];
  gender: MedicalClaim["gender"];
  dosFrom: Record<MedicalClaim["dos_from"], number>;
}

export interface ClaimByDate {
  diagnosis: string[];
  codes: (string | number)[];
  numOfVisits: number;
  totalAllowed: number;
}

export interface ClaimsByDateResponse {
  claims: Record<string, ClaimByDate>;
  currentIndex: number;
}
