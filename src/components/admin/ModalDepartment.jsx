import React from "react";
import {  AcademicCapIcon } from "@heroicons/react/24/solid";
import { DepartmentSchema } from "../../yup/validation";
import { addDepartment } from "../../api/adminApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
 
export function ModalDepartment() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const queryClient = useQueryClient();

  
  const initialValues = {
    departmentName:"",
    description:""
  }
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues:initialValues,
    validationSchema:DepartmentSchema,
    onSubmit: async (values,{resetForm}) => {
        if(values){
            setOpen(!open);
            const response = await addDepartment(values)
            resetForm()
            queryClient.invalidateQueries("department");
            console.log(response);
        }
    }
  })
  return (
    <>
    <Button onClick={handleOpen} className="flex items-center gap-3 bg-[#305861]" size="sm">
              <AcademicCapIcon strokeWidth={2} className="h-4 w-4 "  /> Add department
            </Button>
      <Dialog open={open} handler={handleOpen} size="sm" className="bg-[#CAF0F8]">
        <form onSubmit={handleSubmit}>
        <DialogHeader>ADD DEPARTMENT</DialogHeader>
        <DialogBody className="flex justify-center">
        <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-4">
          <Input size="lg" name="departmentName" label="Department Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.departmentName}
          />
          {touched.departmentName && errors.departmentName && (
            <div className="text-red-500 text-sm ">{errors.departmentName}</div>
          )}
          <Input size="lg" name="description" label="Description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          />
          {touched.description && errors.description && (
            <div className="text-red-500 text-sm ">{errors.description}</div>
          )}
        </div>
        </div>
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
          <Button variant="filled" type="submit" color="green">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}