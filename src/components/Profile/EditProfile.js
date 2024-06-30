import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../api/internal';
import editProfileSchema from '../../schemas/editProfileSchema';
import TextInput from '../../components/TextInput/TextInput';
import { setUser } from '../../store/userSlice';
import { useFormik } from 'formik';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [photo, setPhoto] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      profilePicture: null,
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'profilePicture' && photo) {
            formData.append('profilePicture', photo);
          } else {
            formData.append(key, values[key]);
          }
        });

        await updateUserProfile(user.accessToken, formData);
        setSuccessMessage('Profile updated successfully');
        const response = await getUserProfile(user.accessToken, user._id);
        const profile = response.data;
        dispatch(setUser({
          _id: profile._id,
          email: profile.email,
          username: profile.name,
          profilePicturePath: profile.profilePicturePath,
          auth: true
        }));
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Profile update failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { values, touched, handleChange, handleBlur, errors, handleSubmit, setFieldValue, isSubmitting } = formik;

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
      setFieldValue('profilePicture', file);  
    };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(user.accessToken, user._id);
        const profile = response.data;
        setFieldValue('name', profile.name || '');
        setFieldValue('email', profile.email || '');
        setFieldValue('role', profile.role || '');
        setPhoto(profile.profilePicturePath || '');
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    if (user.auth) {
      fetchProfile();
    }
  }, [user.auth, dispatch, user.accessToken, user._id, setFieldValue]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Profile</h2>
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
              accept="image/jpg, image/jpeg, image/png"
              onChange={getPhoto}
              className="input-field"
            />
            {photo && <img src={photo} alt="Profile Preview" className="mt-2 rounded-lg" style={{ maxWidth: '150px', maxHeight: '150px' }} />}
            <p className="text-red-500 text-xs mt-1">{errors.profilePicture}</p>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length !== 0 || Object.keys(touched).length === 0}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Submitting...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
