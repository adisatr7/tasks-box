import { doc, updateDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { db } from "../firebase"
import { Task } from "../types"


export default function useUpdateTask() {
  return useMutation({
    mutationFn: async (task: Task) => {
      const ref = doc(db, "tasks", task.id)
      return await updateDoc(ref, task)
    },
    onError: (error: any) => {
      return Promise.reject(new Error(error.message))
    }
  })
}