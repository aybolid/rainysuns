"use client";

import React from "react";

const useForm = (initialValues: { [key: string]: string }) => {
  const [values, setValues] = React.useState(initialValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    data: values,
    onChange,
    resetForm,
  };
};

export default useForm;
