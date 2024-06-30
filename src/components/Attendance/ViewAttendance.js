import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceRecords } from '../../api/internal';
import { setAttendanceRecords } from '../../store/attendanceSlice';
const ViewAttendance = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); 
  const attendanceRecords = useSelector((state) => state.attendance.records);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const res = await getAttendanceRecords(); 
        dispatch(setAttendanceRecords(res.data));
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    if (user._id) {
      fetchAttendanceRecords();
    }
  }, [user._id, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Attendance Records</h1>
        </div>
        <ul className="space-y-4">
          {attendanceRecords.map((record) => (
            <li
              key={record._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium text-gray-900">{record.date}</div>
                <div className={`text-lg font-medium ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                  {record.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAttendance;
