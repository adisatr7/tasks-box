import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { authSlice } from "./slices/authSlice"
import { formSlice } from "./slices/formSlice"
import { layoutSlice } from "./slices/layoutSlice"


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    form: formSlice.reducer,
    layout: layoutSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector