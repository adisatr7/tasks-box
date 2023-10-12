import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../../types"


/**
 * Auth states type definition
 */
export interface AuthState {
  currentUser: User | null
}

/**
 * Auth initial state containing the current user and the list of registered users
 */
const initialState: AuthState = {
  currentUser: null
}

/**
 * Auth slice containing the reducer and actions for the auth
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set the current user.
     *
     * @param action The user object to be set as the current user.
     */
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },

    /**
     * Clear the current user and log out.
     */
    removeCurrentUser: (state) => {
      state.currentUser = null
    }
  }
})

export default authSlice.reducer
export const { setCurrentUser, removeCurrentUser } = authSlice.actions
