import { InvolvedUser, Task } from "../types"


/**
 * Mengecek apakah task sudah selesai atau belum.
 *
 * @param task Task yang akan dicek
 * @returns true jika task sudah selesai, false jika belum
 */
export default function checkIfTaskIsCompleted(task: Task): boolean {
  task.involved.forEach((user: InvolvedUser) => {
    if (!user.isCompleted) {
      return false
    }
  })
  return true
}