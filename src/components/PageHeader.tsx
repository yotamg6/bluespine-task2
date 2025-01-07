import React from "react";
import { Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  HeaderContent,
  HeaderPaper,
  IconWrapper,
  TextContent,
} from "../styles/styles";

interface PageHeaderProps {
  header: string;
}

const PageHeader = ({ header }: PageHeaderProps) => {
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
            {header}
          </Typography>
        </TextContent>
      </HeaderContent>
    </HeaderPaper>
  );
};

export default PageHeader;
