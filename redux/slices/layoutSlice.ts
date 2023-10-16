import { PayloadAction, createSlice } from "@reduxjs/toolkit"


/**
 * Auth states type definition
 */
export interface LayoutState {
  isLoading: boolean
}

/**
 * Auth initial state containing the current user and the list of registered users
 */
const initialState: LayoutState = {
  isLoading: false
}

/**
 * Auth slice containing the reducer and actions for the auth
 */
export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    /**
     * Set the current user.
     *
     * @param action The user object to be set as the current user.
     */
    startLoading: (state) => {
      state.isLoading = true
    },

    /**
     * Clear the current user and log out.
     */
    endLoading: (state) => {
      state.isLoading = false
    }
  }
})

export default layoutSlice.reducer
export const { startLoading, endLoading } = layoutSlice.actions
