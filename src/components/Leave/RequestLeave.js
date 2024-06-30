import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { requestLeave } from '../../api/internal';

const RequestLeave = () => {
  const user = useSelector((state) => state.user);
  const [leaveData, setLeaveData] = useState({
    reason: '',
    startDate: '',
    endDate: '',
  });

  const { reason, startDate, endDate } = leaveData;

  const onChange = (e) => setLeaveData({ ...leaveData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const leaveRequestData = {
        reason,
        startDate,
        endDate,
      };

      await requestLeave(user.accessToken, leaveRequestData);
      alert('Leave request submitted successfully');
      setLeaveData({
        reason: '',
        startDate: '',
        endDate: '',
      });
    } catch (error) {
      console.error('Error submitting leave request:',  error);
      alert('Failed to submit leave request');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Request Leave</h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="reason" className="sr-only">
                Reason
              </label>
              <input
                id="reason"
                name="reason"
                type="text"
                value={reason}
                onChange={onChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Reason"
              />
            </div>
            <div>
              <label htmlFor="startDate" className="sr-only">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={startDate}
                onChange={onChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="sr-only">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={endDate}
                onChange={onChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={!reason || !startDate || !endDate}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLeave;
