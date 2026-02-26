import { CButton, CSpinner } from "@coreui/react";


const AButton = ({block=false, btnLabel, click, color="primary", className, disabled}) => {
  return (
    <div className={`${block ? 'd-grid gap-2' : ""} ${className}`}>
      <CButton color={color} onClick={click} disabled={disabled}>
        {disabled && <CSpinner size="sm" className="me-1" />}{btnLabel}
      </CButton>
    </div>
  );
};
export default AButton;
