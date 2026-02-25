import { CButton } from "@coreui/react";


const AButton = ({block=false, btnLabel, click, color="primary", className}) => {
  return (
    <div className={`${block ? 'd-grid gap-2' : null} ${className}`}>
      <CButton color={color} onClick={click}>
        {btnLabel}
      </CButton>
    </div>
  );
};
export default AButton;
