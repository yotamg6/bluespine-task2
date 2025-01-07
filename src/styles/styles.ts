import { alpha, styled } from "@mui/material/styles";
import { Box, Card, Paper, Typography } from "@mui/material";

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  padding: theme.spacing(3),
  borderRadius: 0,
  margin: 0,
  boxShadow: "none",
}));

export const HeaderContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const TextContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const StyledInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& span": {
    color: theme.palette.text.secondary,
  },
}));

export const SubheaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6395ee",
  borderLeft: `4px solid ${theme.palette.secondary.main}`,
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: alpha("#ffb5c0", 0.25),
  },
  margin: 0,
  borderRadius: 0,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2),
  backgroundColor: "beige",
  "&:hover": {
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));
