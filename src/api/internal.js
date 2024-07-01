import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json",
    },
});

export const signup = async (data) => {
    let response;

    try {
        response = await api.post('/register', data);
    }
    catch (error) {
        return error;
    }
    return response;
};

export const login = async (data) => {
    let response;

    try {
        response = await api.post('/login', data);
       
    }
    catch (error) {
        return error;
    }
    return response;
};

export const signout = async () => {
    let response;

    try {
        response = await api.post('/logout')
    }
    catch (error) {
        return error;
    }
    return response;
};

export const refreshAccessToken = async (refreshToken) => {
    let response;

    try {
        response = await api.post('/refresh', { refreshToken });
    }
    catch (error) {
        return error;
    }
    return response.data;
  };

export const getUserProfile = async (token, id) => {
    let response;

    try {
        response = await api.get(`/profile`, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const updateUserProfile = async (token, data) => {
    let response;

    try {
        response = await api.put(`/update-profile`, data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

// Attendance
export const markAttendance = async (token, data) => {
    let response;

    try {
        response = await api.post(`/mark`, data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const getAttendanceRecords = async (token) => {
    let response;

    try {
        response = await api.get(`/all-attendance`, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

// Leave
export const requestLeave = async (token, data) => {
    let response;

    try {
        response = await api.post(`/submit-leave`, data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const getLeaveRequests = async (token) => {
    let response;

    try {
        response = await api.get(`/leave-requests`, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

// Admin
export const getAllStudents = async (token) => {
    let response;

    try {
        response = await api.get(`/students`, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const manageAttendance = async (token, data) => {
    let response;

    try {
        response = await api.post(`/students-attendance/manage`, data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const updateAttendance = async (token, data) => {
    let response;

    try {
        response = await api.put('/students-attendance/update', data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const createAttendance = async (token, data) => {
    let response;

    try {
        response = await api.post('/students-attendance/create', data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const deleteAttendance = async (token, id) => {
    let response;

    try {
        response = await api.delete(`/students-attendance/${id}`, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};
export const manageLeaveRequest = async (token, data) => {
    let response;

    try {
        response = await api.put(`/leave`, data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const generateReport = async (token, userId) => {
    let response;

    try {
        response = await api.post(`/report/${userId}`, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

export const setGradingCriteria = async (token, data) => {
    let response;

    try {
        response = await api.post(`/grading`, data, {
            headers: { 'x-auth-token': token },
        });
    }
    catch (error) {
        return error;
    }
    return response;
};

api.interceptors.response.use(
    (config) => config,
    async (error) => {
      const originalReq = error.config;
      const errorMessage = error.response && error.response.data && error.response.data.message;
  
      if (
        errorMessage === 'Unauthorized' &&
              (error.response.status === 401 || error.response.status === 500) &&
              originalReq &&
              !originalReq._isRetry
      ) {
        originalReq._isRetry = true;
  
         try {
            await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
              withCredentials: true,
            });
    
            return api.request(originalReq);
        }
        catch (error) {
          return error;
        }
      }
      throw error;
    }
  );
