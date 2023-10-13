import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db, storage } from "../firebase/index"
import { useMutation } from "react-query"
import { FirebaseError } from "firebase/app"
import { Alert } from "react-native"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { User } from "../types"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


export default function useRegister() {
  const dbRef = collection(db, "users")

  return useMutation<User, Error, { userData: User; passwordInput: string }>({
    mutationFn: async ({ userData, passwordInput }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, passwordInput)

        userData.id = userCredential.user.uid
        userData.imageUrl = await uploadImageToCloud(userData.imageUrl)
          .catch(() => "-1")

        await setDoc(doc(dbRef, userData.id), userData)

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

        return Promise.resolve(user)
      } catch (error) {
        Promise.reject(new FirebaseError(error.code, error.message))
      }
    },
    onError: (error: FirebaseError) => {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        Alert.alert("Email tidak valid", "Silahkan coba lagi!")
        return Promise.reject(new FirebaseError(error.code, "Email tidak valid"))
      }
      else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        Alert.alert("Password sudah dipakai", "Silahkan gunakan email lain!")
        return Promise.reject(new FirebaseError(error.code, "Password sudah dipakai"))
      }
      else if (error.message === "Firebase: Error (auth/weak-password).") {
        Alert.alert("Password terlalu lemah", "Silahkan coba lagi!")
        return Promise.reject(new FirebaseError(error.code, "Password terlalu lemah"))
      }
      else {
        Alert.alert("Error", error.message)
        return Promise.reject(new FirebaseError(error.code, error.message))
      }
    }
  })
}

/**
   * Handle upload gambar ke cloud
   */
async function uploadImageToCloud(imageUrl: string): Promise<string> {
  // Jika input kosong, reject promise
  if (imageUrl === "") {
    return Promise.reject("-1")
  }

  // Persiapkan file yang akan diupload
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  const file = imageUrl.substring(imageUrl.lastIndexOf("/") + 1)
  const time = new Date().getTime()

  // Upload gambar ke cloud
  const uploadDirRef = ref(storage, `images/user/${file}-${time}.jpg`)
  await uploadBytes(uploadDirRef, blob)

  // Set state image url ke url gambar yang sudah diupload
  return getDownloadURL(uploadDirRef)
    .then((downloadUrl) => {
      return downloadUrl
    })
    .catch((err) => {
      alert(err)
      return Promise.reject("-1")
    })
}