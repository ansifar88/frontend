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

export const ProfileUpdateSchema =Yup.object({
    currentHospital:Yup.string().min(3).max(30).required("Please enter your current hospital"),
    department:Yup.string(),
    qualification:Yup.string().min(2).required("enter qualifiation"),
    experience:Yup.string().required("enter years of experience"),
    description:Yup.string().min(10).max(50).required("please provide a description"),
    certificates: Yup.mixed().required("upload certificates"),

})