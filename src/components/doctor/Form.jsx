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

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ProfileUpdateSchema } from "../../yup/validation";
import { updateProfile } from "../../api/doctorApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import doctorRequest from "../../utils/doctorRequest";

export function Form() {
  const { doctorInfo } = useSelector((state) => state.doctor);
  const id = doctorInfo.id;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
      formData.append("cunsultationFee", values.cunsultationFee);

      for (let i = 0; i < values.certificates.length; i++) {
        formData.append("certificates", values.certificates[i]);
      }
      setLoading(true)
      const response = await updateProfile(formData, id);
      if (response) {
        setLoading(false)
        setOpen(!open)
        queryClient.invalidateQueries(["doctor"]);
      }
    },
  });
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ["department"],
    queryFn: () => doctorRequest.get("/department").then((res) => res.data),
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
        <div className="flex justify-center">
        <Typography className="mt-8" variant="h5">COMPLETE PROFILE AND VERIFY</Typography>
        </div>
        <DialogBody className="flex justify-center ">
          <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96 ">
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
                <div className="flex justify-between gap-2">

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
                  <div className="flex flex-col">
                    <Input
                      size="lg"
                      variant="standard"
                      name="cunsultationFee"
                      label="cunsultation Fee"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cunsultationFee}
                    />
                    {touched.cunsultationFee && errors.cunsultationFee && (
                      <div className="text-red-500 text-sm ">
                        {errors.cunsultationFee}
                      </div>
                    )}
                  </div>
                </div>
                {touched.department && errors.department && (
                  <div className="text-red-500 text-sm ">
                    {errors.department}
                  </div>
                )}

                <div className="flex justify-between gap-2">
                  <div className="flex flex-col">
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
                  </div>
                  <div className="flex flex-col">
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

                <Typography className="text-xs"># a short description about you .</Typography>

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
                {touched.certificates && errors.certificates && (
                  <div className="text-red-500 text-sm ">
                    {errors.certificates}
                  </div>
                )}
                <Typography className="text-xs" >
                  # Upload All of your Certificates including experience and
                  Graduation .
                </Typography>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>

              {loading ?
                <Button variant="filled" color="green" disabled>
                <span>please wait .......</span>
              </Button>
              :
                <Button variant="filled" type="submit" color="green">
                <span>update & verify</span>
              </Button>
              }

            </DialogFooter>
          </form>
        </DialogBody>

      </Dialog>
    </>
  );
}
