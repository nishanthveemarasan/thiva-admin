import React, {useState, useEffect} from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { required } from "../../../components/Helper/Validator";
import FormInputItem from "../../../components/UI/FormInputItem";
import { useDispatch } from "react-redux";
import { login } from "../../../store/reducer/authReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('ax_7689832T');
    if (token) {
      navigate('/')
    }
  }, [])
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    username: {
      value: "",
      valid: false,
      validators: [required],
      error: "* Username is required",
    },
    password: {
      value: "",
      valid: false,
      validators: [required],
      error: "* Password is required",
    },
  });

  const onChangeFormHandler = (value, type) => {
    let isValid = true;
    form[type].validators.forEach((validator) => {
      isValid = isValid && validator(value);
    });
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value: value,
        valid: isValid,
      },
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let isFormValid = true;
    for (const key in form) {
      form[key].validators.forEach((validator) => {
        isFormValid = isFormValid && validator(form[key].value);
      });
    }
    if (isFormValid) {
      const formData = {
        username: form.username.value.trim(),
        password: form.password.value.trim(),
      };
      dispatch(login(formData, navigation));
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">
                      Sign In to your account
                    </p>
                    <FormInputItem
                      type="text"
                      value={form.username.value}
                      change={onChangeFormHandler}
                      input="username"
                      placeholder="Username"
                      autoComplete="username"
                      icon={cilUser}
                      valid={submitted && !form.username.valid }
                      error={form.username.error}
                    />
                    <FormInputItem
                      type="text"
                      value={form.password.value}
                      change={onChangeFormHandler}
                      input="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      icon={cilLockLocked}
                      valid={submitted && !form.password.valid }
                      error={form.password.error}
                    />
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onSubmitHandler}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
