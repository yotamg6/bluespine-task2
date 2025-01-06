import { PatientInfo, SubheaderPaper } from "./styledComponents";

interface PatientSubheaderProps {
  patientId: string;
  gender: string;
  age: number | string; // TODO: control again all OR's, since it is mostly to fit the json typings. Perhaps declarying the json according to my type will help
}

const PatientDetailsBar = ({
  patientId,
  gender,
  age,
}: PatientSubheaderProps) => {
  return (
    <SubheaderPaper elevation={1}>
      <PatientInfo variant="subtitle1">
        Patient: <span>{patientId}</span> ({gender}, {age} years old)
      </PatientInfo>
    </SubheaderPaper>
  );
};

export default PatientDetailsBar;
