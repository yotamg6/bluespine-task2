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
import { ClaimByDate } from "../types/types";
import { getCodeLinks, getTags, getTagsCount } from "../utils/utils";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { StyledCard } from "../styles/styles";

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
      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: claim.totalAllowed > 5000 ? "red" : "primary.main",
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mb: 1 }}
        >
          {date}
        </Typography>
        <StyledCard>
          <CardContent>
            <Stack direction="row" justifyContent="center">
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                style={{
                  color: claim.totalAllowed > 5000 ? "red" : "inherit",
                }}
                align="center"
              >
                ${claim.totalAllowed}
              </Typography>
            </Stack>
            <Box sx={{ marginTop: 1, textAlign: "center" }}>
              <Typography component="span">Diagnosis: </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  marginTop: 1,
                  justifyContent: "center",
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
              sx={{ marginTop: 2, fontWeight: "bold", textAlign: "center" }}
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
                justifyContent: "center",
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
                        <Typography key={idx}>
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              color: "#007BFF",
                              fontWeight: "bold",
                            }}
                          >
                            {link.shortenedCode}
                          </a>
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
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {Object.entries(tagsCount).map(([tag, count], idx) => (
                <Chip
                  key={idx}
                  label={count > 1 ? `${tag} (${count})` : tag}
                  icon={<LocalOfferIcon />}
                  size="small"
                  sx={{
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
