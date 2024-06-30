import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllStudents, createAttendance, updateAttendance, deleteAttendance, getAttendanceRecords } from '../../api/internal';

const ManageAttendance = () => {
  const user = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({ userId: '', status: '', date: '' });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const res = await getAllStudents(user._id);
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching students:',  error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAttendanceRecords = async () => {
      try {
        setIsLoading(true);
        const res = await getAttendanceRecords(user._id);
        setAttendanceRecords(res.data);
      } catch (error) {
        console.error('Error fetching attendance records:',  error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
    fetchAttendanceRecords();
  }, [user._id]);

  const { userId, status, date } = attendanceData;

  const onChange = (e) => setAttendanceData({ ...attendanceData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (isEditing) {
        await updateAttendance(user._id, { id: editId, date, status });
        alert('Attendance updated successfully');
        setIsEditing(false);
        setEditId(null);
      } else {
        await createAttendance(user._id, { userId, status, date });
        alert('Attendance created successfully');
      }
      setAttendanceData({ userId: '', status: '', date: '' });
      const res = await getAttendanceRecords(user._id);
      setAttendanceRecords(res.data);
    } catch (error) {
      console.error('Error submitting attendance:',  error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = (record) => {
    setIsEditing(true);
    setEditId(record._id);
    setAttendanceData({ userId: record.userId, status: record.status, date: record.date });
  };

  const onDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteAttendance(user._id, id);
      alert('Attendance deleted successfully');
      const res = await getAttendanceRecords(user._id);
      setAttendanceRecords(res.data);
    } catch (error) {
      console.error('Error deleting attendance:',  error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Attendance</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Student</label>
          <select
            name="userId"
            value={userId}
            onChange={onChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={status}
            onChange={onChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEditing ? 'Update Attendance' : 'Create Attendance'}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Attendance Records</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : attendanceRecords.length === 0 ? (
          <p>No attendance records found</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {attendanceRecords.map((record) => (
              <li key={record._id} className="py-4 flex justify-between items-center">
                <div className="flex-1 truncate">
                  <div className="font-semibold">{record.userId} - {record.status}</div>
                  <div className="text-sm text-gray-500">{record.date}</div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => onEdit(record)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(record._id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageAttendance;
