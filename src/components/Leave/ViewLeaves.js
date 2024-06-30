import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLeaveRequests } from '../../api/internal';

const ViewLeaves = () => {
  const user = useSelector((state) => state.user); 
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const res = await getLeaveRequests(user);
        setLeaveRequests(res.data);
      } catch (error) {
        console.error('Error fetching leave requests:',  error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchLeaveRequests();
    }
  }, [user]);

  if (loading) {
    return <div>Loading leave requests...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Leave Requests</h1>
      {leaveRequests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <ul className="list-disc list-inside">
          {leaveRequests.map((leave) => (
            <li key={leave._id} className="mb-2">
              <span className="font-semibold">{leave.startDate} to {leave.endDate}: </span>{leave.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewLeaves;
