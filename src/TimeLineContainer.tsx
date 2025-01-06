import { useEffect, useRef } from "react";
import TimelineItem from "./TimeLineElement";
import useClaims from "./useClaims";
import { TIMELINE_PAGE_SIZE } from "./utils";
import { Box, CircularProgress, styled } from "@mui/material";

interface TimeLineContainerProps {
  patientId: string;
}

const TimeLineContainer = ({ patientId }: TimeLineContainerProps) => {
  const containerRef = useRef(null);
  const { claims, currentIndex, setPage, isLoading, hasMore, setIsLoading } =
    useClaims({
      patientId: Number(patientId), //TODO: see if necessary to parse, maybe it canbe a string throughout
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
  }, [isLoading, currentIndex, claims]);

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
          key={`${date}-${claimDetails.numOfVisits}`} // TODO key!
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
export default TimeLineContainer;
