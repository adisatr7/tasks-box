import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../styles"
import { Task } from "../../types"
import CompletionIcon from "../icons/CompletionIcon"
import { useAppDispatch } from "../../redux"
import { selectTask } from "../../redux/slices/formSlice"
import { router } from "expo-router"


type Props = {
  task: Task
}

export default function TaskCard({ task }: Props) {
  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

  /**
   * Menghitung jumlah user yang sudah menyelesaikan task
   *
   * @param task Array yang ingin dihitung
   * @returns Jumlah task yang sudah diselesaikan oleh user
   */
  const countCompletedUsers = (): number => {
    let count = 0
    task.involved.forEach((user) => {
      if (user.isCompleted)
        count++
    })
    return count
  }


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        dispatch(selectTask(task))
        router.push("/main/task")
      }}
      className={`p-[10px] flex flex-col w-full h-fit rounded-md ${styles.glass} ${styles.glassOutline}`}>
      <View className="flex-row justify-between w-full">
        {/* Task title */}
        <Text className="text-white text-heading-2 line-clamp-1">
          {task.title}
        </Text>

        {/* Pics of involved users */}
        <View className="flex-row items-center gap-x-[8px]">
          {task.involved.slice(0, 3).map((user, index) => (
            <View
              key={index}
              className="rounded-full bg-gray-300 w-[24px] h-[24px]">
              <Image
                source={{ uri: user.imageUrl ?? "" }}
                className="w-full h-full"
              />
            </View>
          ))}
        </View>
      </View>

      {/* 2nd row */}
      <View className="flex-row mt-[4px] items-end">
        {/* Created/edited at */}
        <View className="flex-col">
          <Text className="text-bright-gray text-caption">
            {task.updatedAt ? "Terakhir diubah:" : "Dibuat pada:"}
          </Text>
          <Text className="text-white text-body w-fit">
            {task.updatedAt
              ? new Date(task.updatedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
              : new Date(task.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
          </Text>
        </View>

        {/* Deadline */}
        <View className="flex-col mx-[24px] flex-1">
          <Text className="text-bright-gray text-caption">
            Deadline:
          </Text>
          <Text className="text-white text-body">
            {task.deadline
              ? new Date(task.deadline).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
              : "-"}
          </Text>
        </View>

        {/* Completion */}
        <View className="flex-row items-center justify-end">
          <CompletionIcon/>
          <Text className="text-white text-body ml-[6px]">
            {countCompletedUsers()}/{task.involved.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}