import { FirebaseError } from "firebase/app"
import { useQuery } from "react-query"
import { db } from "../firebase/index"
import { doc, getDoc } from "firebase/firestore"


export default function useAuth(userId: string) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const ref = doc(db, "users", userId)
        const userData = await getDoc(ref)
        return userData.data()
      } catch (error) {
        throw new FirebaseError(error.code, error.message)
      }
    }
  })
}
