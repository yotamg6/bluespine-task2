import { useEffect, useState } from "react";
import { patientsApi } from "./patientsApi";
import { ClaimByDate } from "./types";

interface UseClaimsProps {
  patientId: number;
  numOfClaims?: number;
}
const useClaims = ({ patientId, numOfClaims }: UseClaimsProps) => {
  const [claims, setClaims] = useState<Record<string, ClaimByDate>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fecthData = async () => {
    if (patientId) {
      setIsLoading(true);
      const patientClaims = await patientsApi.getPatientClaims(
        patientId,
        page,
        numOfClaims
      );

      if (Object.keys(patientClaims.claim).length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      setClaims((prevClaims) => ({
        ...prevClaims,
        ...patientClaims.claim,
      }));
      setCurrentIndex(patientClaims.currentIndex);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fecthData();
  }, [page, patientId, numOfClaims]);
  return {
    claims,
    currentIndex,
    page,
    setPage,
    isLoading,
    hasMore,
    setIsLoading
  };
};
export default useClaims;
