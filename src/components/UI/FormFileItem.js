import { CButton, CFormInput, CFormLabel, CInputGroup } from "@coreui/react";

const FormFileItem = ({btnLabel, imgId="selectImageFile", change}) => {
    const uploadImageHandler = () => {
        const fileInput = document.getElementById(imgId);
        fileInput.click();
    }

    const onChangeImageHandler = (e) => {
        if (e.target.files.length > 0) {
            let value = e.target.files[0];
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = function (e) {
              change(e.target.result, "image", (URL.createObjectURL(value)));
            }
            // previewImg(URL.createObjectURL(value));
          }
        };

  return (
    <div className="mb-3">
      <CInputGroup>
        <CButton color="success" onClick={uploadImageHandler}>
              {btnLabel}
        </CButton>
        <div className="mb-3 d-none">
            <CFormLabel htmlFor={imgId}>Default file input example</CFormLabel>
            <CFormInput type="file" id={imgId} onChange={(e) => onChangeImageHandler(e)} />
        </div>
      </CInputGroup>
    </div>
  );
};
export default FormFileItem;
