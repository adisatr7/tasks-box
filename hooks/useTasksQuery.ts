import { collection, getDocs } from "firebase/firestore"
import { useQuery } from "react-query"
import { db } from "../firebase"
import { Task } from "../types"


export default function useTaskQuery() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      // Ambil data dari Firestore
      const ref = collection(db, "tasks")
      const querySnapshot = await getDocs(ref)

      // Ubah data Firestore ke bentuk array
      let tasks: Task[] = []
      querySnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id,
          title: doc.get("title"),
          madeBy: doc.get("madeBy"),
          description: doc.get("description"),
          createdAt: doc.get("createdAt"),
          deadline: doc.get("deadline"),
          updatedAt: doc.get("updatedAt"),
          involved: doc.get("involved")
        })
      })

      // Urutkan data berdasarkan tanggal dibuat
      tasks.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        if (isNaN(dateA.getTime())) {
          return -1
        }
        if (isNaN(dateB.getTime())) {
          return 1
        }
        return dateB.getTime() - dateA.getTime()
      })

      return Promise.resolve(tasks)
    },
    retry: 3,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60        // 5 menit
  })
}