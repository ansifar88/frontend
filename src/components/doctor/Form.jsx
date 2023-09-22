import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
} from "@material-tailwind/react";

import adminRequest from "../../utils/adminRequest";
import { useQuery } from "@tanstack/react-query";

import { ProfileUpdateSchema } from "../../yup/validation";
import { updateProfile } from "../../api/doctorApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

export function Form() {
  const { doctorInfo } = useSelector((state) => state.doctor);
  const id = doctorInfo.id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const initialValues = {
    currentHospital: "",
    department: "",
    qualification: "",
    experience: "",
    description: "",
    certificates: [],
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ProfileUpdateSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("currentHospital", values.currentHospital);
      formData.append("department", values.department);
      formData.append("qualification", values.qualification);
      formData.append("experience", values.experience);
      formData.append("description", values.description);

      for (let i = 0; i < values.certificates.length; i++) {
        formData.append("certificates", values.certificates[i]);
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await updateProfile(formData, id);
      console.log(response);
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["department"],
    queryFn: () => adminRequest.get("/department").then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div>
        <Spinner color="blue" className="h-10 w-10 " />
      </div>
    );
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Complete Profile
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="rounded-none"
      >
        <DialogHeader>COMPLETE PROFILE AND VERIFY</DialogHeader>
        <DialogBody className="flex justify-center ">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-4">
                <Input
                  size="lg"
                  variant="standard"
                  name="currentHospital"
                  label="Current Hospital"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currentHospital}
                />
                {touched.currentHospital && errors.currentHospital && (
                  <div className="text-red-500 text-sm ">
                    {errors.currentHospital}
                  </div>
                )}

                <Select
                  variant="standard"
                  name="department"
                  label="Select Department"
                  value={values.department}
                  onChange={(selectedValue) => {
                    setFieldValue("department", selectedValue);
                  }}
                >
                  {data.data.map((dep) => (
                    <Option value={dep._id} key={dep._id}>
                      {dep.departmentName}
                    </Option>
                  ))}
                </Select>


                {touched.department && errors.department && (
                  <div className="text-red-500 text-sm ">
                    {errors.department}
                  </div>
                )}

                <div className="flex justify-between gap-2">
                  <Input
                    size="lg"
                    variant="standard"
                    name="qualification"
                    label="Qualification"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.qualification}
                  />
                  {touched.qualification && errors.qualification && (
                    <div className="text-red-500 text-sm ">
                      {errors.qualification}
                    </div>
                  )}

                  <Input
                    size="lg"
                    variant="standard"
                    name="experience"
                    label="experience"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.experience}
                  />
                  {touched.experience && errors.experience && (
                    <div className="text-red-500 text-sm ">
                      {errors.experience}
                    </div>
                  )}
                </div>

                <Textarea
                  size="lg"
                  variant="standard"
                  name="description"
                  label="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {touched.description && errors.description && (
                  <div className="text-red-500 text-sm ">
                    {errors.description}
                  </div>
                )}

                <Typography># a short description about you .</Typography>

                <Input
                  size="lg"
                  type="file"
                  variant="standard"
                  name="certificates"
                  label="certificates"
                  multiple
                  onChange={(e) => {
                    const selectedFiles = e.currentTarget.files;
                    setFieldValue("certificates", selectedFiles);
                  }}
                />

                <Typography>
                  # Upload All of your Certificates including experience and
                  Graduation .
                </Typography>
              </div>
            </div>
            <Button variant="gradient" type="submit" color="green">
              <span>Confirm</span>
            </Button>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
