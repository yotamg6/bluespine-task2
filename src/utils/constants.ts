export const DELAY = 500; //MS
export const TIMELINE_PAGE_SIZE = 5;

export const PROCEDURE_FAMILIES: Record<string, string> = {
  // Evaluation and Management (E/M)
  "992": "E/M",

  // Surgery
  "110": "Surgery",
  "114": "Surgery",

  // Radiology
  "710": "Radiology",
  "730": "Radiology",

  // Laboratory
  "800": "LAB - General",
  "830": "LAB - Hemoglobin; glycosylated",

  // Medicine
  "907": "Medicine",
  "930": "Medicine",

  // Miscellaneous
  A45: "Miscellaneous",
  J11: "Miscellaneous",

  // Anesthesia
  "001": "Anesthesia",

  // Physical Medicine and Rehabilitation
  "971": "Rehab",

  // Immunizations
  "906": "Immunizations",

  // Ophthalmology
  "920": "Ophthalmology",
};

export const PATIENT_HEADER = "Patient Medical History";
