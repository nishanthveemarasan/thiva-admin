import CIcon from "@coreui/icons-react";
import { CInputGroup, CInputGroupText, CFormInput, CFormLabel } from "@coreui/react";

const FormInputItem = ({
  autoComplete,
  type="text",
  value,
  input,
  change,
  valid = true,
  error=null,
  placeholder="",
  icon= null,
  formLable = null,
  className="",
  appendIcon = false,
  clickAppend
}) => {
  return (
    <div className={`mb-3 ${className}`}>
     {formLable && <CFormLabel htmlFor="exampleFormControlTextarea1">{formLable}</CFormLabel>}
      <CInputGroup>
        {icon && <CInputGroupText>
          <CIcon icon={icon} />
        </CInputGroupText>}
        <CFormInput
          placeholder={placeholder}
          autoComplete={autoComplete}
          type={type}
          value={value}
          onChange={(e) => change(e.target.value, input)}
        />
        {appendIcon && <CInputGroupText onClick={clickAppend}><CIcon icon={appendIcon} /></CInputGroupText>}
      </CInputGroup>
      {valid && <p style={{ color: "red", fontSize: "10px" }}>{error}</p>}
    </div>
  );
};
export default FormInputItem;
