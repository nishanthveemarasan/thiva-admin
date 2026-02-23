import CIcon from "@coreui/icons-react";
import { CFormTextarea, CFormLabel } from "@coreui/react";

const FormTextArea = ({
  autoComplete,
  value,
  input,
  change,
  valid,
  error,
  placeholder="",
  formLable = null,
  className="",
  rows=3
}) => {
  return (
    <div className={`mb-3 ${className}`}>
     {formLable && <CFormLabel>{formLable}</CFormLabel>}
        <CFormTextarea
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          rows={rows}
          onChange={(e) => change(e.target.value, input)}
        />
      {valid && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
    </div>
  );
};
export default FormTextArea;
