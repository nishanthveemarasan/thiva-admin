import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
const ACard = ({
  title,
  children,
  cardColor = "secondary",
  textColor = "secondary",
}) => {
  return (
    <CCard
      textColor={textColor}
      className={`mb-3 border-top-${cardColor} border-top-3`}
    >
      <CCardHeader>{title}</CCardHeader>
      <CCardBody>{children}</CCardBody>
    </CCard>
  );
};
export default ACard;
