import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice';
import attendance from "./attendanceSlice";
const store = configureStore({
    reducer: {user, attendance}
});

export default store;