import React, { useState } from "react";
import MyCKEditor from "../../components/UI/MyCKEditor";
import { image, required } from "../../components/Helper/Validator";
import FormFileItem from "../../components/UI/FormFileItem";
import CIcon from "@coreui/icons-react";
import { cilArrowCircleBottom, cilArrowCircleTop, cilTrash } from "@coreui/icons";
import AIcon from "../../components/UI/AIcon";

const Header = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    heading: {
      value: "",
      error: "Heading is required",
      valid: false,
      validators: [required],
    },
    description: {
      value: "",
      error: "Description is required",
      valid: false,
      validators: [required],
    },
    image: {
      value: "",
      valid: false,
      src: "",
      validators: [image],
    },
  });
  console.log(content);

  const onChangeHandler = (value, name, src=null) => {
    let isValid = true;
    form[name].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value,
        valid: isValid,
      },
    });
    if (name === "image") {
        setImages([...images, {src, value}]);
    }
  };

    const onDeleteImageHandler = (index) => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        })
    }

    const onMoveImageHandler = (index, direction) => {
        setImages(prevImages => {
          const isMovingUp = direction === "up";
      
          if (
            (isMovingUp && index === 0) ||
            (!isMovingUp && index === prevImages.length - 1)
          ) {
            return prevImages; 
          }
      
          const newImages = [...prevImages];
          const newIndex = isMovingUp ? index - 1 : index + 1;
      
          [newImages[index], newImages[newIndex]] =
            [newImages[newIndex], newImages[index]];
      
          return newImages;
        });
      };



  return (
    <>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Header</div>
        <MyCKEditor
          value={form.heading.value}
          onChange={onChangeHandler}
          placeholder={"Header content"}
        />
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Description</div>
        <MyCKEditor
          value={form.description.value}
          onChange={onChangeHandler}
          placeholder={"Header Description"}
        />
      </div>
      <div className="mb-4">
        <FormFileItem
        change={onChangeHandler}
          btnLabel={
            <span className="text-white">
              Add Image
            </span>
          }
        />
      </div>
      {images.length > 0 && (
        <div className="mb-4">
          <div className="text-2xl font-bold mb-1">Images</div>
          <>
            {images.map((img, index) => (
              <div key={index} className="d-flex flex-row align-items-center" >
                <img src={img.src} alt={`Uploaded ${index}`} style={{width:"200px", height:"200px"}}/>
                <div className="flex items-center">
                    <AIcon icon={cilTrash} size="xxl" className="me-2" click={() => onDeleteImageHandler(index)}/>
                    {index !== 0 && <AIcon icon={cilArrowCircleTop} size="xxl" className="me-2" click={() => onMoveImageHandler(index, "up")}/>}
                    {index < images.length - 1 && images.length !== 1 && <AIcon icon={cilArrowCircleBottom} size="xxl" click={() => onMoveImageHandler(index, "down")}/>}
                </div>
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
};
export default Header;
