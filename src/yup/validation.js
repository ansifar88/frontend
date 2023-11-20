import * as Yup from "yup";
const imageFormats = ["image/jpeg", "image/png", "image/avif"];

export const LoginSchema = Yup.object({
  email: Yup.string().trim().email().required("Please Enter Your email id"),
  password: Yup.string().trim().min(4).required("Please enter password"),
});

export const SignupSchema = Yup.object({
  name: Yup.string().trim().min(2).max(20).required("Please Enter Your Name"),
  email: Yup.string().trim().email().required("Please Enter Your email"),
  mobile: Yup.string().trim()
    .required("Please Enter Your Mobile Number")
    .matches(/^\d{10}$/, "Mobile number must have 10 digits"),
  password: Yup.string().trim().min(4).required("Please enter password"),
});

export const DepartmentSchema = Yup.object({
  departmentName: Yup.string().trim()
    .min(2)
    .max(50)
    .required("Please enter department Name"),
  description: Yup.string().trim()
    .min(2)
    .max(100)
    .required("Please enter description"),
});

export const ProfileUpdateSchema = Yup.object({
  currentHospital: Yup.string()
    .min(3)
    .max(30)
    .required("Please enter your current hospital"),
  department: Yup.string(),
  qualification: Yup.string().trim().min(2).required("enter qualifiation"),
  experience: Yup.string().trim().required("enter years of experience"),
  cunsultationFee: Yup.string().trim().required("enter your cunsultation Fee"),
  description: Yup.string().trim()
    .min(10)
    .max(1000)
    .required("please provide a description"),

  certificates: Yup.mixed()
    .test("is-image", "Only image files are allowed", (value) => {
      if (value) {
        for (let i = 0; i < value.length; i++) {
          if (!imageFormats.includes(value[i].type)) {
            return false;
          }
        }
      }
      return true;
    })
    .required("Upload certificates"),
});

export const doctorEditProfileSchema = Yup.object({
  name: Yup.string().trim().min(3).required("please Enter Your name"),
  currentHospital: Yup.string().trim()
    .min(3)
    .max(30)
    .required("Please enter your current hospital"),
  department: Yup.string().required("choose a department"),
  qualification: Yup.string().trim().min(2).required("enter qualifiation"),
  experience: Yup.string().trim().required("enter years of experience"),
  cunsultationFee: Yup.string().trim().required("enter your cunsultation Fee"),
  description: Yup.string().trim()
    .min(10)
    .max(1000)
    .required("please provide a description"),
});

export const dpUpdateSchema = Yup.object({
  dp: Yup.mixed()
    .test("is-image", "Only image files are allowed", (value) => {
      if (value) {
        return imageFormats.includes(value.type);
      }
      return true;
    })
    .required("choose a Photo"),
});

export const userProfileUpdateSchema = Yup.object({
  gender: Yup.string().required("Choose Gender"),
  city: Yup.string().required("Choose city"),
  dob: Yup.string().required("Choose DOB"),
  height: Yup.number().max(400).required("Enter your Height"),
  weight: Yup.number().max(300).required("Enter your Weight"),
  blood: Yup.string().trim().required("Enter your Blood Group"),
});
export const userEditProfileSchema = Yup.object({
  name: Yup.string().trim().required("Enter Your Name"),
  gender: Yup.string().required("Choose Gender"),
  city: Yup.string().required("Choose city"),
  dob: Yup.string().required("Choose DOB"),
  height: Yup.number().max(400).required("Enter your Height"),
  weight: Yup.number().max(300).required("Enter your Weight"),
  blood: Yup.string().trim().required("Enter your Blood Group"),
});

export const rejectDoctorSchema = Yup.object({
  reason: Yup.string().trim().max(100).required("Please Give a Reason for Rejection"),
});

export const slotSchema = Yup.object().shape({
  startdate: Yup.date()
    .required("Start date is required")
    .test("is-future", "Start date must be in the future", (value) => {
      const now = new Date();
      return value > now;
    })
    ,
  enddate: Yup.date()
    .required("End date is required")
    .test(
      "is-future",
      "End date must be in the future",
      (value, { parent }) => {
        // Ensure enddate is greater than or equal to startdate
        return value >= parent.startdate;
      }
    )
    ,
  startTimeHour: Yup.string().required("Start Time Hour is required"),
  startTimeMinute: Yup.string().required("Start Time Minute is required"),
  startTimeAmPm: Yup.string().required("Start Time AM/PM is required"),
  endTimeHour: Yup.string().required("End Time Hour is required"),
  endTimeMinute: Yup.string().required("End Time Minute is required"),
  endTimeAmPm: Yup.string().required("End Time AM/PM is required"),
});

export const chooseDateSchema = Yup.object({
  date: Yup.string().required("choose a date"),
});
