import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLeaveRequests, manageLeaveRequest } from '../../api/internal';

const ApproveLeaveRequests = () => {
  const user = useSelector((state) => state.user);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const res = await getLeaveRequests(user._id);
        setLeaveRequests(res.data);
      } catch (error) {
        console.error('Error fetching leave requests:',  error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [user._id]);

  const approveLeave = async (leaveRequestId) => {
    try {
      await manageLeaveRequest(user._id, { leaveRequestId, status: 'approved' });
      setLeaveRequests(leaveRequests.filter((leave) => leave._id !== leaveRequestId));
    } catch (error) {
      console.error('Error approving leave request:',  error);
    }
  };

  const rejectLeave = async (leaveRequestId) => {
    try {
      await manageLeaveRequest(user._id, { leaveRequestId, status: 'rejected' });
      setLeaveRequests(leaveRequests.filter((leave) => leave._id !== leaveRequestId));
    } catch (error) {
      console.error('Error rejecting leave request:',  error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Approve Leave Requests</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : leaveRequests.length === 0 ? (
        <p>No leave requests to display</p>
      ) : (
        <ul className="space-y-4">
          {leaveRequests.map((leave) => (
            <li key={leave._id} className="bg-white shadow-md rounded-md p-4 flex items-center justify-between">
              <div>
                <p className="font-bold">{leave.startDate} to {leave.endDate}</p>
                <p>{leave.reason}</p>
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2"
                  onClick={() => approveLeave(leave._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => rejectLeave(leave._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApproveLeaveRequests;
