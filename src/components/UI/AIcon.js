import React from "react";
import CIcon from "@coreui/icons-react";

const AIcon = ({icon, size="lg", className, click}) => {
    return <CIcon icon={icon} size={size} className={className} onClick={click}/>
} 
export default AIcon;
