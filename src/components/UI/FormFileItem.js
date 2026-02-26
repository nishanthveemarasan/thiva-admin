import { CButton, CFormInput, CFormLabel, CInputGroup } from "@coreui/react";

const FormFileItem = ({btnLabel, imgId="selectImageFile", change, valid=true, error=null}) => {
    const uploadImageHandler = () => {
        const fileInput = document.getElementById(imgId);
        fileInput.click();
    }

    const onChangeImageHandler = (e) => {
        if (e.target.files.length > 0) {
            let value = e.target.files[0];
            change(value, "image");
          }
        };

  return (
    <div className="mb-3">
        {valid && error && <div className="text-danger mb-2">{error}</div>}
        <CButton color="success" onClick={uploadImageHandler}>
              {btnLabel}
        </CButton>
        <div className="mb-3 d-none">
            <CFormLabel htmlFor={imgId}>Default file input example</CFormLabel>
            <CFormInput type="file" accept="image/*" id={imgId} onChange={(e) => onChangeImageHandler(e)} />
        </div>
     </div>
  );
};
export default FormFileItem;
