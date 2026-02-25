import React, { useState } from "react";
import MyCKEditor from "../../components/UI/MyCKEditor";
import { image, required } from "../../components/Helper/Validator";
import FormFileItem from "../../components/UI/FormFileItem";
import CIcon from "@coreui/icons-react";
import {
  cilArrowCircleBottom,
  cilArrowCircleTop,
  cilTrash,
} from "@coreui/icons";
import AIcon from "../../components/UI/AIcon";
import FormInputItem from "../../components/UI/FormInputItem";
import classes from "./Home.module.css";
import AButton from "../../components/UI/AButton";

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

  const onChangeHandler = (value, name) => {
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
      setImages([
        ...images,
        { src: URL.createObjectURL(value), value, title: "" },
      ]);
    }
  };

  const onDeleteImageHandler = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const onMoveImageHandler = (index, direction) => {
    setImages((prevImages) => {
      const isMovingUp = direction === "up";

      if (
        (isMovingUp && index === 0) ||
        (!isMovingUp && index === prevImages.length - 1)
      ) {
        return prevImages;
      }

      const newImages = [...prevImages];
      const newIndex = isMovingUp ? index - 1 : index + 1;

      [newImages[index], newImages[newIndex]] = [
        newImages[newIndex],
        newImages[index],
      ];

      return newImages;
    });
  };

  const onSubmitHandler = () => {
    let isFormValid = true;
    for (const key in form) {
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      }
      );
    }
      if (isFormValid) {
        const formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key].value);
        }
        images.forEach((img, index) => {
          formData.append(`image[${index}][file]`, img.value);
          formData.append(`image[${index}][title]`, img.title);
          formData.append(`image[${index}][action]`, 'add');
        });

      //   images.forEach((img, index) => {
      //     // If the image is being deleted, we only need the action and the uuid
      //     if (img.action === 'delete') {
      //         formData.append(`image[${index}][action]`, 'delete');
      //         formData.append(`image[${index}][uuid]`, img.uuid);
      //     } else {
      //         // Otherwise, it's an 'add' or 'update'
      //         formData.append(`image[${index}][file]`, img.value); // The actual File object
      //         formData.append(`image[${index}][title]`, img.title);
      //         formData.append(`image[${index}][action]`, img.action || 'add');
              
      //         if (img.uuid) {
      //             formData.append(`image[${index}][uuid]`, img.uuid);
      //         }
      //     }
      // });
        console.log(formData);
      }
  }

  return (
    <>
      <div className="d-flex justify-content-end">
        <AButton
          click={onSubmitHandler}
          btnLabel={
            <>
              <span className="me-2">Save</span>
            </>
          }
        />
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Header</div>
        <MyCKEditor
          value={form.heading.value}
          onChange={onChangeHandler}
          placeholder={"Header content"}
          type="heading"
        />
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Description</div>
        <MyCKEditor
          value={form.description.value}
          onChange={onChangeHandler}
          placeholder={"Header Description"}
          type="description"
        />
      </div>
      <div className="mb-4">
        <FormFileItem
          change={onChangeHandler}
          btnLabel={<span className="text-white">Add Image</span>}
        />
      </div>
      {images.length > 0 && (
        <div className="mb-4">
          <div className="text-2xl font-bold mb-1">Images</div>
          <>
            {images.map((img, index) => (
              <div key={index} className="d-flex flex-row align-items-center">
                <div>
                  <img
                    src={img.src}
                    alt={`Uploaded ${index}`}
                    className={`${classes.imageHeight} mb-1`}
                  />
                  <FormInputItem
                    autoComplete="image-title"
                    value={images[index].title}
                    change={(value, name) => {
                      setImages((prevImages) => {
                        const newImages = [...prevImages];
                        newImages[index][name] = value;
                        return newImages;
                      });
                    }}
                    input="title"
                    className={classes.inputWidth}
                  />
                </div>
                <div className="flex items-center">
                  <AIcon
                    icon={cilTrash}
                    size="xxl"
                    className="me-2"
                    click={() => onDeleteImageHandler(index)}
                  />
                  {index !== 0 && (
                    <AIcon
                      icon={cilArrowCircleTop}
                      size="xxl"
                      className="me-2"
                      click={() => onMoveImageHandler(index, "up")}
                    />
                  )}
                  {index < images.length - 1 && images.length !== 1 && (
                    <AIcon
                      icon={cilArrowCircleBottom}
                      size="xxl"
                      click={() => onMoveImageHandler(index, "down")}
                    />
                  )}
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
