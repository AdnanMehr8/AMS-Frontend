import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput/TextInput';
import signupSchema from '../../schemas/signupSchema';
import { signup } from '../../api/internal';


const Register = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [photo, setPhoto] = useState('');

    const { values, touched, handleChange, handleBlur, errors, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            profilePicture: null,
        },
        validationSchema: signupSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();

            Object.keys(values).forEach(key => {
                if (key === 'profilePicture') {
                    if (photo) {
                        formData.append('profilePicture', photo);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            });

            try {
                await signup(formData);
                setSuccessMessage('Registration successful!');
                navigate('/login');
            } catch (error) {
                console.error(error.message);
                setErrorMessage(error.response?.data?.message || 'Registration failed');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
                </div>
                {successMessage && <p className="text-center text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <TextInput
                        type="text"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Name"
                        error={errors.name && touched.name ? 1 : undefined}
                        errormessage={errors.name}
                    />
                    <TextInput
                        type="text"
                        name="username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Username"
                        error={errors.username && touched.username ? 1 : undefined}
                        errormessage={errors.username}
                    />
                    <TextInput
                        type="email"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Email address"
                        error={errors.email && touched.email ? 1 : undefined}
                        errormessage={errors.email}
                    />
                    <TextInput
                        type="password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Password"
                        error={errors.password && touched.password ? 1 : undefined}
                        errormessage={errors.password}
                    />
                    <TextInput
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
                        errormessage={errors.confirmPassword}
                    />
                    <TextInput
                        type="text"
                        name="role"
                        value={values.role}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Role"
                        error={errors.role && touched.role ? 1 : undefined}
                        errormessage={errors.role}
                    />
                    <div>
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            onChange={getPhoto}
                            className="input-field"
                        />
                        {photo && <img src={photo} alt="Profile Preview" className="mt-2 rounded-lg" style={{ maxWidth: '150px', maxHeight: '150px' }} />}
                        <p className="text-red-500 text-xs mt-1">{errors.profilePicture}</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
