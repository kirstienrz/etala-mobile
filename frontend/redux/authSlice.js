import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user: null,
    token: null,
    loading: true, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Sets the logged-in user and token
        setUser: (state, action) => {
            
            if (action.payload && action.payload.user && action.payload.token) {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
            } else {
                console.error("❌ Invalid payload structure:", action.payload);
                console.error("❌ Expected: { user: {...}, token: 'string' }");
                state.loading = false;
            }
        },

        updateUserInfo: (state, action) => {
            
            if (action.payload && action.payload.user) {
                // Keep the existing token, only update user info
                const existingToken = state.token;
                state.user = action.payload.user;
                state.token = existingToken; // Preserve existing token
            } else {
                console.error("❌ Invalid user data in updateUserInfo:", action.payload);
            }
        },

        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
        },

        finishLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { setUser, updateUserInfo, clearUser, finishLoading } = authSlice.actions;

/* ---------------------- ACTIONS ---------------------- */

// Save user + token to AsyncStorage after login
export const loginUser = (data) => async (dispatch) => {
    try {
        
        const payload = {
            token: data.token,
            user: data.user,
        };

        if (!payload.token || !payload.user) {
            console.error("❌ Invalid login data - missing token or user");
            return;
        }

        await AsyncStorage.setItem("userData", JSON.stringify(payload));

        dispatch(setUser(payload));
    } catch (error) {
        console.error("❌ Error saving user:", error);
    }
};

// ✅ New action specifically for updating profile
export const updateUserProfile = (userData, newToken = null) => async (dispatch, getState) => {
    try {
        
        const currentState = getState().auth;
        
        const payload = {
            user: userData,
            token: newToken || currentState.token, 
        };

        if (!payload.token || !payload.user) {
            console.error("❌ Invalid profile update data");
            return;
        }

        await AsyncStorage.setItem("userData", JSON.stringify(payload));
        
        const storedData = await AsyncStorage.getItem("userData");

        dispatch(setUser(payload));
        
    } catch (error) {
        console.error("❌ Error updating user profile:", error);
    }
};

// Logout and clear storage
export const logoutUser = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem("userData");
        dispatch(clearUser());
    } catch (error) {
        console.error("❌ Error logging out:", error);
    }
};

// Load user + token from AsyncStorage when app starts
export const loadUserFromStorage = () => async (dispatch) => {
    try {
        const storedData = await AsyncStorage.getItem("userData");
        
        if (storedData) {
            const parsed = JSON.parse(storedData);
            
            // ✅ Validate stored data structure
            if (parsed && parsed.user && parsed.token) {
                dispatch(setUser(parsed));
            } else {
                console.error("❌ Invalid stored data structure, clearing storage");
                await AsyncStorage.removeItem("userData");
                dispatch(finishLoading());
            }
        } else {
            dispatch(finishLoading());
        }
    } catch (error) {
        console.error("❌ Error loading user:", error);
        dispatch(finishLoading());
    }
};

export default authSlice.reducer;