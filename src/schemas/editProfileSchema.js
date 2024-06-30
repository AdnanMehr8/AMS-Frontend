import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const errorMessage = 'use lowercase, uppercase and digits';

const editProfileSchema = yup.object().shape({
    name: yup.string().max(30),
    email: yup.string().email('enter a valid email'),
    password: yup.string().min(8).max(25).matches(passwordPattern, { message: errorMessage }),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords must match'),
    role: yup.string(),
    // profilePicture: yup.string()
});

export default editProfileSchema;