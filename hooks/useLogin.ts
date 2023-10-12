import { FirebaseError } from "firebase/app"
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth"
import { Alert } from "react-native"
import { useMutation } from "react-query"
import { auth, db } from "../firebase/index"
import { collection, doc, getDoc } from "firebase/firestore"
import { User } from "../types"


export default function useLogin() {
  return useMutation<User, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)

        const docRef = doc(db, "users", userCredentials.user.uid)
        const userData = await getDoc(docRef)

        const user: User = {
          id: userData.id,
          email: userData.get("email"),
          firstName: userData.get("firstName"),
          lastName: userData.get("lastName"),
          position: userData.get("position"),
          imageUrl: userData.get("imageUrl"),
          level: userData.get("level"),
          exp: userData.get("exp"),
        }
        
        return user
      }
      catch (error) {
        throw new FirebaseError(error.code, error.message)
      }
    },
    onError: (error) => {
      if (error.message === "Firebase: Error (auth/invalid-email).")
        Alert.alert("Akun tidak ditemukan", "Silahkan coba lagi!")
      else if (error.message === "Firebase: Error (auth/invalid-login-credentials).")
        Alert.alert("Kata sandi salah", "Silahkan coba lagi!")
      else
        Alert.alert("Error", error.message)
    }
  })
}