import { UserCredential, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/index"
import { useMutation } from "react-query"
import { Alert } from "react-native"
import { FirebaseError } from "firebase/app"


export default function useLogin() {
  return useMutation<UserCredential, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential
      } catch (error) {
        throw new FirebaseError(error.code, error.message)
      }
    },
    onError: (error) => {
      if (error.message === "Firebase: Error (auth/invalid-email).")
        Alert.alert("Akun tidak ditemukan", "Silahkan coba lagi!")
      else
        Alert.alert("Error", error.message)
    }
  })
}