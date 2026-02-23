import React from "react";
import { CBadge } from "@coreui/react";

const ABadge = ({color="primary", badgeLabel, className}) => {
  return (
    <CBadge color={color} className={className}>
      {badgeLabel}
    </CBadge>
  );
};
export default ABadge;