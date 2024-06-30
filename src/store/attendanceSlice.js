import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
};

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceRecords: (state, action) => {
      state.records = action.payload;
    },
  },
});

export const { setAttendanceRecords } = attendanceSlice.actions;

export default attendanceSlice.reducer;
