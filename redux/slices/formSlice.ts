import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Task } from "../../types"


/**
 * State dari form
 */
type FormState = {
  mode: "add" | "edit"
  selectedTask: Task | null
}

/**
 * State awal dari form
 */
const initialState: FormState = {
  mode: "add",
  selectedTask: null
}

/**
 * Form slice berisi state dan reducers seputar form
 */
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    /**
     * Mengatur mode form
     *
     * @param action Payload action yang berisi mode form
     */
    setFormMode: (state, action: PayloadAction<"add" | "edit">) => {
      state.mode = action.payload
    },

    /**
     * Mengatur item yang akan diedit
     *
     * @param action Payload action yang berisi item yang akan diedit
     */
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload
    },

    /**
     * Menghapus item yang akan diedit
     */
    clearSelection: (state) => {
      state.selectedTask = null
    }
  }
})

export default formSlice.reducer
export const {
  setFormMode,
  selectTask,
  clearSelection
} = formSlice.actions
