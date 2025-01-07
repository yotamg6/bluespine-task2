import { useEffect, useRef } from "react";
import TimelineItem from "./TimeLineElement";
import { CircularProgress } from "@mui/material";
import { TIMELINE_PAGE_SIZE } from "../utils/constants";
import useClaims from "../hooks/useClaims";

interface TimeLineContainerProps {
  patientId: string;
}

//TODO: timeline should be dumb . All patient specifics should happen at the Patient component, passing the data here

const TimeLine = ({ patientId }: TimeLineContainerProps) => {
  const containerRef = useRef(null);
  const { claims, currentIndex, setPage, isLoading, hasMore } = useClaims({
    patientId: Number(patientId),
    numOfClaims: TIMELINE_PAGE_SIZE,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (elements) => {
        const target = elements[0];
        if (!isLoading && target.isIntersecting && hasMore) {
          setPage(currentIndex);
        }
      },
      {
        threshold: 0.5,
      }
    );
    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [isLoading, currentIndex, claims, hasMore, setPage]);

  return (
    <div
      style={{
        backgroundColor: Object.keys(claims).length === 0 ? "white" : "#0096FF",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {Object.entries(claims).map(([date, claimDetails], index) => (
        <TimelineItem
          claim={claimDetails}
          key={index}
          date={date}
          isLeft={index % 2 === 0}
        />
      ))}

      <div
        ref={containerRef}
        style={{
          minHeight: "20px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <CircularProgress size="3rem" color="secondary" />}
      </div>
    </div>
  );
};
export default TimeLine;
