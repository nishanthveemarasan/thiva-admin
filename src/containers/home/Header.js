import React, { useState, useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getContent, updateContent } from "../../store/reducer/homeReducer";
import { createSelector } from "@reduxjs/toolkit";
import AErrors from "../../components/UI/AErrors";
const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: {
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
      src: "At least one image is required",
      validators: [image],
    },
  });
  const mapStateToProps = createSelector(
    (state) => state.homeStore.content,
    (content) => ({ content })
  );
  const { content } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const loaded = useRef(false);
  useEffect(() => {
    if (!loaded.current) {
      dispatch(getContent(setIsLoading));
      loaded.current = true;
    }
    if (content) {
      setForm((prevState) => {
        const updatedForm = { ...prevState };
        for (const key in content) {
          if (updatedForm[key]) {
            updatedForm[key] = {
              ...updatedForm[key],
              value: content[key],
              valid: true,
            };
          }
        }
        return updatedForm;
      });
      if (content.images) {
        setImages(
          content.images.map((img) => ({
            src: img.full_url,
            title: img.title,
            value: null,
            uuid: img.uuid,
          }))
        );
      }
    }
  }, [content]);

  const onChangeHandler = (value, name) => {
    let isValid = true;
    form[name].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm((prevState) => {
      let copyState = { ...prevState };
      copyState[name] = {
        ...prevState[name],
        value,
        valid: isValid,
      };
      return copyState;
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
    setErrors([]);
    for (const key in form) {
      let valid = true;
      form[key].validators.forEach((validator) => {
        if (
          key === "image" &&
          form[key].value === "" &&
          content?.title
        ) {
          return;
        }
        valid = validator(form[key].value);
      });
      if (!valid) {
        setErrors((prevErrors) => [...prevErrors, form[key].error]);
      }
      isFormValid = isFormValid && valid;
    }
    if (isFormValid) {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key].value);
      }
      // images.forEach((img, index) => {
      //   formData.append(`image[${index}][file]`, img.value);
      //   formData.append(`image[${index}][title]`, img.title);
      //   formData.append(`image[${index}][action]`, 'add');
      // });

      images.forEach((img, index) => {
        if (img.action === "delete") {
          formData.append(`images[${index}][action]`, "delete");
          formData.append(`images[${index}][uuid]`, img.uuid);
        } else {
          if(img.value){
            formData.append(`images[${index}][file]`, img.value);
          }
          formData.append(`images[${index}][title]`, img.title);
          formData.append(
            `images[${index}][action]`,
            img?.uuid ? "update" : "add"
          );

          if (img.uuid) {
            formData.append(`images[${index}][uuid]`, img.uuid);
          }
        }
      });
      dispatch(updateContent(formData, setIsSubmitting));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <AButton
          disabled={isSubmitting}
          click={onSubmitHandler}
          btnLabel={
            <>
              <span className="me-2">Save</span>
            </>
          }
        />
      </div>
      {errors.length > 0 && <AErrors errors={errors}  />}
      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">Header</div>
        <MyCKEditor
          value={form.title.value}
          onChange={onChangeHandler}
          placeholder={"Header content"}
          type="title"
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
