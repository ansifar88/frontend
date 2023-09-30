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
    departmentName:Yup.string().min(2).max(50).required("Please enter department Name"),
    description:Yup.string().min(2).max(100).required("Please enter description")
})

export const ProfileUpdateSchema = Yup.object({
    currentHospital:Yup.string().min(3).max(30).required("Please enter your current hospital"),
    department:Yup.string(),
    qualification:Yup.string().min(2).required("enter qualifiation"),
    experience:Yup.string().required("enter years of experience"),
    description:Yup.string().min(10).max(50).required("please provide a description"),
    certificates: Yup.mixed().required("upload certificates"),

})

export const dpUpdateSchema = Yup.object({
    dp: Yup.mixed().required("choose a Photo"),

})

export const userProfileUpdateSchema =Yup.object({
    gender : Yup.string().required("Choose Gender"),
    city : Yup.string().required("Choose city"),
    dob: Yup.string().required("Choose DOB"),
    height : Yup.number().max(400).required("Enter your Height"),
    weight : Yup.number().max(300).required("Enter your Weight"),
    blood : Yup.string().required("Enter your Blood Group"),

})