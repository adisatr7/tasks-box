import { Task } from "../types";


/**
 * Mengecek apakah task sudah selesai atau belum.
 *
 * @param task Task yang akan dicek
 * @returns true jika task sudah selesai, false jika belum
 */
export default function checkIfTaskIsCompleted(task: Task): boolean {
  for (const user of task.involved) {
    if (!user.isCompleted || !user.completedAt) {
      return false
    }
  }
  return true
}