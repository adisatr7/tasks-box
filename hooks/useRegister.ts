import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/index"
import { useMutation } from "react-query"
import { FirebaseError } from "firebase/app"
import { Alert } from "react-native"
import { addDoc, collection } from "firebase/firestore"
import { User } from "../types"


export default function useRegister() {
  const dbRef = collection(db, "users")

  return useMutation<User, Error, { userData: User; passwordInput: string }>({
    mutationFn: async ({ userData, passwordInput }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, passwordInput)

        userData.id = userCredential.user.uid

        await addDoc(dbRef, userData)

        const user: User = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          position: userData.position,
          imageUrl: userData.imageUrl,
          level: userData.level,
          exp: userData.exp,
        }

        return user
      } catch (error) {
        throw new FirebaseError(error.code, error.message)
      }
    },
    onError: (error) => {
      if (error.message === "Firebase: Error (auth/invalid-email).")
        Alert.alert("Email tidak valid", "Silahkan coba lagi!")
      else if (error.message === "Firebase: Error (auth/email-already-in-use).")
        Alert.alert("Password sudah dipakai", "Silahkan gunakan email lain!")
      else if (error.message === "Firebase: Error (auth/weak-password).")
        Alert.alert("Password terlalu lemah", "Silahkan coba lagi!")
      else
      Alert.alert("Error", error.message)
    },
    // onSuccess: () => {}
  })
}