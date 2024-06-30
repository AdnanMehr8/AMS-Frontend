import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setGradingCriteria } from '../../api/internal';

const SetGradingCriteria = () => {
  const user = useSelector((state) => state.user);
  const [gradingData, setGradingData] = useState({
    attendancePercentage: '',
    grade: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { attendancePercentage, grade } = gradingData;

  const onChange = (e) => setGradingData({ ...gradingData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await setGradingCriteria(user._id, { attendancePercentage, grade });
      alert('Grading criteria set successfully');
    } catch (error) {
      console.error('Error setting grading criteria:',  error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Set Grading Criteria</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Attendance Percentage</label>
          <input
            type="number"
            name="attendancePercentage"
            value={attendancePercentage}
            onChange={onChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
            max="100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Grade</label>
          <input
            type="text"
            name="grade"
            value={grade}
            onChange={onChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Set Grading Criteria'}
        </button>
      </form>
    </div>
  );
};

export default SetGradingCriteria;
