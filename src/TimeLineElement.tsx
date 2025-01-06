import React from "react";
import {
  Badge,
  Box,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ClaimByDate } from "./types";
import { getCodeLinks, getTags, getTagsCount } from "./utils";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import { StyledCard } from "./styledComponents";

interface TimeLineItemProps {
  claim: ClaimByDate;
  date: string;
  isLeft: boolean;
}

const TimelineElement = ({ claim, date, isLeft }: TimeLineItemProps) => {
  const tags = getTags(claim.codes);
  const tagsCount = getTagsCount(tags);
  const codeLinks = getCodeLinks(claim.codes);
  const visibleCodes = codeLinks.slice(0, 3);
  const hiddenCodes = codeLinks.slice(3);

  return (
    <TimelineItem position={isLeft ? "left" : "right"}>
      <TimelineOppositeContent>
        <Typography variant="body2" color="textSecondary">
          {date}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: claim.totalAllowed > 5000 ? "red" : "primary.main",
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <StyledCard>
          <CardContent>
            <Stack
              direction="row"
              justifyContent={isLeft ? "flex-end" : "flex-start"}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                style={{
                  color: claim.totalAllowed > 5000 ? "red" : "inherit",
                }}
                textAlign={isLeft ? "right" : "left"}
              >
                {/*TODO: change to k, or add comma after 2 first decimals */}$
                {claim.totalAllowed}
              </Typography>
            </Stack>
            <Box sx={{ marginTop: 1 }}>
              <Typography component="span">Diagnosis: </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  marginTop: 1,
                  justifyContent: isLeft ? "flex-end" : "flex-start",
                }}
              >
                {claim.diagnosis.map((diag, idx) => (
                  <Badge
                    key={idx}
                    badgeContent={diag}
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        position: "relative",
                        transform: "none",
                      },
                    }}
                  ></Badge>
                ))}
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              Codes:
            </Typography>
            <Box
              component="ul"
              sx={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                justifyContent: isLeft ? "flex-end" : "flex-start",
              }}
            >
              {visibleCodes.map((code, idx) => (
                <li key={idx} style={{ marginRight: "8px" }}>
                  <a
                    href={code.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#007BFF",
                      fontWeight: "bold",
                    }}
                  >
                    {code.shortenedCode}
                  </a>
                </li>
              ))}
              {hiddenCodes.length > 0 && (
                <Tooltip
                  title={
                    <Box>
                      {hiddenCodes.map((link, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          {link.shortenedCode}
                        </Typography>
                      ))}
                    </Box>
                  }
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "#5F9EA0",
                        "& .MuiTooltip-arrow": {
                          color: "#5F9EA0",
                        },
                      },
                    },
                  }}
                >
                  <Chip
                    label={`+${hiddenCodes.length}`}
                    size="small"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                  />
                </Tooltip>
              )}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              {Object.entries(tagsCount).map(([tag, count], idx) => (
                <Chip
                  key={idx}
                  label={`${tag} (${count})`}
                  icon={<LocalOfferIcon />}
                  size="small"
                  sx={{
                    marginRight: 1,
                    marginBottom: 1,
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </StyledCard>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelineElement;
