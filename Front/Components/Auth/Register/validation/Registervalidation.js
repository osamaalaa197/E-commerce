import * as yup from "yup";

const RegistervalidationSchema = yup.object().shape({
  UserName: yup.string().required("Name is required "),
  Email: yup.string().email("Email not valid").required("Email is required"),
  PhoneNumber: yup
    .string()
    .max(11, "Phone number not vaild")
    .required("PhoneNumber is required"),
  Location: yup.string().required("location is required"),
  Password: yup.string().required("Password is required"),
});

export default RegistervalidationSchema;
