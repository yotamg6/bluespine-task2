import _ from "lodash";
import { ClaimByDate, ClaimsByDateResponse, MedicalClaim } from "./types";

export const TIMELINE_PAGE_SIZE = 5;

const PROCEDURE_FAMILIES: Record<string, string> = {
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

export const getGroupedClaimsByData = () => {};
const parseDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
};
export const getCurrentYear = (date: string) => {
  const parsedString: Date = parseDate(date);
  return new Date().getFullYear() - parsedString.getFullYear();
};
export const groupClaimsByDate = (
  //TODO see if possible to clean
  data: MedicalClaim[],
  startIndex?: number,
  limit?: number
): ClaimsByDateResponse => {
  let currentIndex = 0;
  const start = startIndex ? startIndex : 0;

  const claim: Record<string, ClaimByDate> = {};
  if (start >= data.length - 1) {
    return { claim, currentIndex: start };
  }
  for (let i = start; i < data.length; i++) {
    if (i >= data.length - 1) {
      currentIndex = i;
    }
    const claimRow = data[i];
    const finalDiagnosis = claimRow.dx2 ? claimRow.dx2 : claimRow.dx1;
    if (claim[claimRow.dos_from]) {
      claim[claimRow.dos_from].codes.push(claimRow.code);
      claim[claimRow.dos_from].diagnosis = Array.from(
        new Set([...claim[claimRow.dos_from].diagnosis, finalDiagnosis])
      );
      claim[claimRow.dos_from].numOfVisits++;
      claim[claimRow.dos_from].totalAllowed += claimRow.allowed;
    } else {
      if (limit && Object.keys(claim).length >= limit) {
        currentIndex = i;
        break;
      }
      claim[claimRow.dos_from] = {
        diagnosis: [finalDiagnosis],
        codes: [claimRow.code],
        numOfVisits: 1,
        totalAllowed: claimRow.allowed,
      };
    }
  }
  const claimData = { claim, currentIndex };
  return claimData;
};

export const getProcedureFamily = (code: string | number) => {
  const prefix = code.toString().substring(0, 3);
  return PROCEDURE_FAMILIES[prefix];
};

export const getCodeLinks = (codes: (string | number)[]) => {
  return codes
    .map((code) => {
      const shortenedCode = code.toString().substring(0, 4);
      const link = `https://www.aapc.com/codes/cpt-codes/${code}`;
      return {
        shortenedCode,
        link,
      };
    })
    .filter((codeLink) => Boolean(codeLink.shortenedCode));
};

export const getTags = (codes: (string | number)[]) =>
  codes.map((code) => getProcedureFamily(code)).filter(Boolean);

export const getTagsCount = (tags: string[]) => {
  return tags.reduce<Record<string, number>>((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
};

export const sortStringDate = (a: MedicalClaim, b: MedicalClaim) => {
  const [dayA, monthA, yearA] = a.dos_from.split("/");
  const [dayB, monthB, yearB] = b.dos_from.split("/");

  const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
  const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

  return dateA.getTime() - dateB.getTime();
};

// TODO: have another function to group by date range?
