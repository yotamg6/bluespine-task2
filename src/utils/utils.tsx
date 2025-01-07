import {
  ClaimByDate,
  ClaimsByDateResponse,
  MedicalClaim,
} from "../types/types";
import { PROCEDURE_FAMILIES } from "./constants";

export const getGroupedClaimsByData = () => {};
const parseDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
};
export const getCurrentYear = (date: string) => {
  const parsedString: Date = parseDate(date);
  return new Date().getFullYear() - parsedString.getFullYear();
};

const claimOperations = {
  getFinalDiagnosis: (claim: MedicalClaim): string => {
    return claim.dx2?.trim() ? claim.dx2 : claim.dx1;
  },

  updateExistingClaim: (
    existingClaim: ClaimByDate,
    claimRow: MedicalClaim,
    finalDiagnosis: string
  ): void => {
    existingClaim.codes.push(claimRow.code);
    existingClaim.diagnosis = Array.from(
      new Set([...existingClaim.diagnosis, finalDiagnosis])
    );
    existingClaim.numOfVisits++;
    existingClaim.totalAllowed += claimRow.allowed;
  },

  createNewClaim: (
    claimRow: MedicalClaim,
    finalDiagnosis: string
  ): ClaimByDate => {
    return {
      diagnosis: [finalDiagnosis],
      codes: [claimRow.code],
      numOfVisits: 1,
      totalAllowed: claimRow.allowed,
    };
  },
};

export const groupClaimsByDate = (
  data: MedicalClaim[],
  startIndex: number = 0,
  limit?: number
): ClaimsByDateResponse => {
  if (startIndex >= data.length - 1) {
    return { claims: {}, currentIndex: startIndex };
  }

  const claims: Record<string, ClaimByDate> = {};
  let currentIndex = startIndex;

  for (let i = startIndex; i < data.length; i++) {
    // Update currentIndex if we're at the last element
    if (i >= data.length - 1) {
      currentIndex = i;
    }

    const claimRow = data[i];
    const finalDiagnosis = claimOperations.getFinalDiagnosis(claimRow);
    const dateKey = claimRow.dos_from;

    if (dateKey in claims) {
      claimOperations.updateExistingClaim(
        claims[dateKey],
        claimRow,
        finalDiagnosis
      );
    } else {
      // Check limit before creating a new date entry
      if (limit && Object.keys(claims).length >= limit) {
        currentIndex = i;
        break;
      }
      claims[dateKey] = claimOperations.createNewClaim(
        claimRow,
        finalDiagnosis
      );
    }
  }

  return { claims, currentIndex };
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

export const getPersonSubHeaderText = (
  title: string,
  id: string,
  gender: string,
  age: number | string
) => {
  return (
    <>
      {title}: <span>{id}</span> {gender}, {age} years old
    </>
  );
};
