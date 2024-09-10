import * as yup from "yup";

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
const passwordRegex=/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRegex,"Password Should be alpha numeric")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Name must be at least 8 characters")
    .max(40, "Name must be at most 40 characters")
    .required("Name is required"),
});
const otpCode = yup.object().shape({
  otp: yup
    .string()
    .max(6, "Otp maximum can be of 6 numbers")
    .min(6, "Otp minimum can be of 6 numbers")
    .required("Otp is required"),
});

const phoneNumberRegex =
  /^(\+?\d{1,4})?[-.\s]?\(?\d{1,5}\)?[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,9}$/;
// Regular expression to validate a phone number (example: (123) 456-7890, 123-456-7890, +1 123 456 7890)

const phoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(phoneNumberRegex, "Invalid phone number format")
    .required("Phone number is required"),
});

const statusSchema = yup.object().shape({
  status: yup.mixed().oneOf(["active", "inactive"], "Invalid status"),
});

const dobSchema = yup.object().shape({
  dob: yup
    .date()
    .max(new Date(), "Date of birth must be in the past")
    .required("Date of birth is required"),
});
export { nameSchema, otpCode, phoneNumberSchema, statusSchema, dobSchema ,emailSchema,passwordSchema};
