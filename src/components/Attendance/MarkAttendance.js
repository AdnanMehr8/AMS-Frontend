import React from 'react';
import { useSelector } from 'react-redux';
import { markAttendance } from '../../api/internal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MarkAttendance = () => {

  const user = useSelector((state) => state.user); 

  const initialValues = {
    status: '',
  };

  const attendanceSchema = Yup.object().shape({
    status: Yup.string().required('Status is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await markAttendance(user.accessToken, { status: values.status });
      alert('Attendance marked successfully');
      resetForm();
    } catch (error) {
      console.error('Error marking attendance:',error);
      alert('Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Mark Attendance</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={attendanceSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="status" className="sr-only">
                    Status
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    autoComplete="status"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                  >
                    <option value="">Select status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Submitting...' : 'Mark Attendance'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MarkAttendance;
