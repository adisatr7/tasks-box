import { db, storage } from "../firebase/index";
import { useMutation } from "react-query"
import { collection, doc, updateDoc } from "firebase/firestore";
import { User } from "../types"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


export default function useUpdateUser() {
  type Params = {
    user: User
    imageIsChanged: boolean
  }

  return useMutation({
    mutationFn: async ({ user, imageIsChanged }: Params) => {
      const userDataRef = doc(db, "users", user.id)
      // Jika image diubah, upload gambar ke cloud
      if (imageIsChanged) {
        const imageUrl = await uploadImageToCloud(user.imageUrl)
        user.imageUrl = imageUrl
      }

      return await updateDoc(userDataRef, user)
    },
    onError: (error: any) => {
      return Promise.reject(new Error(error.message))
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