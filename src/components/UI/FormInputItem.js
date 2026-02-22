import CIcon from "@coreui/icons-react";
import { CInputGroup, CInputGroupText, CFormInput } from "@coreui/react";

const FormInputItem = ({
  placeholder,
  autoComplete,
  type,
  value,
  input,
  change,
  icon,
  valid,
  error,
}) => {
  return (
    <div className="mb-3">
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={icon} />
        </CInputGroupText>
        <CFormInput
          placeholder={placeholder}
          autoComplete={autoComplete}
          type={type}
          value={value}
          onChange={(e) => change(e.target.value, input)}
        />
      </CInputGroup>
      {valid && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
    </div>
  );
};
export default FormInputItem;
