import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    name: '',
    email: '',
    username: '',
    role: '',
    profilePicturePath: '',
    auth: false
}

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, name, email, username, role, profilePicturePath, auth} = action.payload;

            state._id = _id;
            state.name = name;
            state.email = email;
            state.username = username;
            state.role = role;
            state.profilePicturePath = profilePicturePath;
            state.auth = auth;

        },
        resetUser: (state) => {
            state._id = '';
            state.name = '';
            state.email = '';
            state.username = '';
            state.role = '';
            state.profilePicturePath = '';
            state.auth = false;
        },
    },
})

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;