import { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import loginSchema from '../../schemas/loginSchema';
import { useFormik } from 'formik';
import { login } from '../../api/internal';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const data = {
            username: values.username,
            password: values.password
        };

        const response = await login(data);

        if (response.status === 201) {
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                role: response.data.user.role, 
                auth: response.data.auth
            };
            dispatch(setUser(user));

            if (response.data.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/student-dashboard');
            }
        } else if (response.code === 'ERR_BAD_REQUEST') {
            // display error message
            setError(response.response.data.message);
        }
    };

    const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginSchema
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
                </div>
                <TextInput
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Username"
                    error={errors.username && touched.username ? 1 : undefined}
                    errormessage={errors.username}
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
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleLogin}
                    disabled={!values.username || !values.password || errors.username || errors.password}
                >
                    Log In
                </button>
                <span className="block text-center mt-2">
                    Don't have an account?{' '}
                    <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </button>
                </span>
                {error !== '' && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
