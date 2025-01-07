import { StyledInfo, SubheaderPaper } from "../styles/styles";

interface PatientSubheaderProps {
  subHeaderInfo: JSX.Element;
}

const InfoBar = ({ subHeaderInfo }: PatientSubheaderProps) => {
  return (
    <SubheaderPaper elevation={1}>
      <StyledInfo variant="subtitle1">{subHeaderInfo} </StyledInfo>
    </SubheaderPaper>
  );
};

export default InfoBar;
