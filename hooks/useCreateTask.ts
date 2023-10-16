import { useMutation } from "react-query"
import { db } from "../firebase"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { Task } from "../types"
import { FirebaseError } from "firebase/app"
import { Alert } from "react-native"


export default function useCreateTask() {
  const ref = collection(db, "tasks")

  return useMutation({
    mutationFn: async (task: Task) => {
      return await addDoc(ref, task)
    },
    onError: (error: FirebaseError) => {
      Alert.alert("Terjadi error saat membuat task baru", error.message)
      return Promise.reject(new FirebaseError(error.code, error.message))
    }
  })
}