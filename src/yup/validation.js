import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    email : Yup.string().email().required("Please Enter Your email id"),
    password: Yup.string().min(4).required("Please enter password")
})

export const SignupSchema = Yup.object({
    name: Yup.string().min(2).max(20).required("Please Enter Your Name"),
    email: Yup.string().email().required("Please Enter Your email"),
    mobile: Yup.string().required("Please Enter Your Mobile Number").
    matches(/^\d{10}$/,"Mobile number must have 10 digits"),
    password: Yup.string().min(4).required("Please enter password")
})

export const DepartmentSchema = Yup.object({
    departmentName:Yup.string().min(2).max(30).required("Please enter department Name"),
    description:Yup.string().min(2).max(30).required("Please enter description")
})