import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  HeaderContent,
  HeaderPaper,
  IconWrapper,
  TextContent,
} from "./styledComponents";

const PatientPageHeader = () => {
  return (
    <HeaderPaper elevation={3}>
      <HeaderContent>
        <IconWrapper>
          <LocalHospitalIcon sx={{ fontSize: 40 }} />
        </IconWrapper>
        <TextContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "common.white", fontWeight: "bold" }}
          >
            Patient Medical History
          </Typography>
        </TextContent>
      </HeaderContent>
    </HeaderPaper>
  );
};

export default PatientPageHeader;
