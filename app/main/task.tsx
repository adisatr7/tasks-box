import MainLayout from "../../components/layouts/MainLayout"
import { useAppDispatch, useAppSelector } from "../../redux"
import Header from "../../components/containers/Header"
import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../styles"
import GlassCard from "../../components/containers/GlassCard"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import FinishTaskIcon from "../../components/icons/FinishTaskIcon"
import useUpdateTask from "../../hooks/useUpdateTask"
import { router } from "expo-router"
import { FirebaseError } from "firebase/app"
import { InvolvedUser, Task } from "../../types"
import { useQueryClient } from "react-query"
import checkIfTaskIsCompleted from "../../utils/checkIfTaskIsCompleted"
import { endLoading, startLoading } from "../../redux/slices/layoutSlice"
import SecondaryButton from "../../components/buttons/SecondaryButton"
import EditTaskIcon from "../../components/icons/EditTaskIcon"

export default function FormScreen() {
  /**
   * Hook untuk mengambil data task yang dipilih.
   */
  const selectedTask = useAppSelector((state) => state.form.selectedTask)

  /**
   * Hook untuk mengambil data user yang sedang login.
   */
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

  /**
   * Hook untuk mengambil data query client.
   */
  const queryClient = useQueryClient()

  /**
   * Hook untuk mengubah data task.
   */
  const updateTask = useUpdateTask()


  /**
   * Fungsi untuk mengubah format tanggal.
   *
   * @param date Tanggal dalam format ISO string.
   * @returns Tanggal dalam format lokal.
   */
  const convertDate = (date: string): string => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }


  /**
   * Fungsi untuk mengecek apakah user sedang terlibat di task ini.
   *
   * @returns True jika user sedang terlibat di task ini.
   */
  const currentUserIsInvolved = () => {
    selectedTask.involved.forEach((user) => {
      if (user.id === currentUser.id) {
        return true
      }
    })
    return false
  }


  /**
   * Fungsi untuk melibatkan user ke dalam task.
   */
  const joinTask = () => {
    dispatch(startLoading)

    const task: Task = { ...selectedTask }
    task.involved.push({
      ...currentUser,
      isCompleted: false,
      completedAt: ""
    })

    updateTask
      .mutateAsync(task)
      .then(() => {
        queryClient.invalidateQueries(["tasks"])
        Alert.alert("Berhasil", "Anda berhasil bergabung ke task ini.")
        router.replace("/main/home")
      })
      .catch((error: FirebaseError) => {
        Alert.alert("Gagal", error.message)
      })
      .finally(() => {
        dispatch(endLoading())
      })
  }

  /**
   * Fungsi untuk melibatkan user ke dalam task.
   */
  const handleJoinTask = () => {
    // Alert.prompt("Konfirmasi", "Anda yakin ingin bergabung ke task ini?", [
    //   { text: "Batal", style: "cancel" },
    //   { text: "Gabung", style: "default", onPress: joinTask }
    // ])

    joinTask()
  }


  /**
   * Fungsi untuk menghapus user dari task.
   */
  const abandonTask = () => {
    // Jika user adalah user terakhir, jagan ijinkan user keluar
    if (selectedTask.involved.length === 1) {
      return Alert.alert(
        "Kesalahan",
        "Anda tidak dapat keluar dari task ini karena anda adalah satu-satunya orang yang terlibat di task ini."
      )
    }

    dispatch(startLoading())

    const task: Task = { ...selectedTask }
    const updatedInvolved = task.involved.filter((user) => {
      return user.id !== currentUser.id
    })
    task.involved = updatedInvolved

    updateTask
      .mutateAsync(task)
      .then(() => {
        queryClient.invalidateQueries(["tasks"])
        Alert.alert("Berhasil", "Anda berhasil keluar dari task ini.")
        router.replace("/main/home")
      })
      .catch((error: FirebaseError) => {
        Alert.alert("Gagal", error.message)
      })
      .finally(() => {
        dispatch(endLoading())
      })
  }


  /**
   * Fungsi untuk menghapus user dari task.
   */
  const handleAbandonTask = () => {
    // Alert.prompt("Konfirmasi", "Anda yakin ingin keluar dari task ini?", [
    //   { text: "Batal", style: "cancel" },
    //   { text: "Keluar", style: "default", onPress: abandonTask }
    // ])

    abandonTask()
  }


  /**
   * Fungsi untuk menandai task sebagai selesai.
   */
  const setTaskToFinished = () => {
    dispatch(startLoading())

    // Cari index user yang sedang login.
    const userIndex = selectedTask.involved.findIndex((user) => {
      return user.id === currentUser.id
    })

    // Atur task menjadi selesai untuk user yang sedang login.
    let involvedUsers: InvolvedUser[] = []
    selectedTask.involved.forEach((user) => {
      involvedUsers.push({
        ...user,
        isCompleted: user.id === currentUser.id ? true : user.isCompleted,
        completedAt: user.id === currentUser.id ? new Date().toISOString() : user.completedAt
      })
    })

    let taskToBeUpdated: Task = {
      ...selectedTask,
      involved: involvedUsers
    }

    // Kirim data task yang sudah diubah ke server.
    updateTask
      .mutateAsync(taskToBeUpdated)
      .then(() => {
        queryClient.invalidateQueries(["tasks"])
        Alert.alert("Berhasil", "Task berhasil ditandai selesai.")
        router.replace("/main/home")
      })
      .catch((error: FirebaseError) => {
        Alert.alert("Gagal", error.message)
      })
      .finally(() => {
        dispatch(endLoading())
      })
  }

  /**
   * Fungsi untuk menandai task sebagai selesai.
   */
  const handleFinishTask = () => {
    // Alert.prompt("Konfirmasi", "Anda yakin ingin menyelesaikan task ini?", [
    //   { text: "Batal", style: "cancel" },
    //   { text: "Tandai selesai", style: "default", onPress: setTaskToFinished }
    // ])

    setTaskToFinished()
  }


  /**
   * Fungsi untuk mengedit task.
   */
  const handleEditTask = () => {

  }


  return (
    <MainLayout>
      <Header position="left" title={selectedTask.title} />

      <View className="h-[18px]" />

      {/* Info */}
      <GlassCard>
        <View className="flex-row">
          {/* Labels */}
          <View className="flex-col w-fit">
            <Text className={grayTextStyle}>Dibuat oleh</Text>
            <Text className={grayTextStyle}>Status</Text>
            <Text className={grayTextStyle}>
              {selectedTask.updatedAt ? "Terakhir diubah" : "Dibuat pada"}
            </Text>
          </View>

          {/* Colons */}
          <View className="flex-col w-fit mx-[8px]">
            <Text className={grayTextStyle}>:</Text>
            <Text className={grayTextStyle}>:</Text>
            <Text className={grayTextStyle}>:</Text>
          </View>

          {/* Values */}
          <View className="flex-col w-fit">
            <Text className={whiteTextStyle}>
              {selectedTask.involved[0].firstName}
              {selectedTask.involved[0].id === currentUser.id && " (Saya)"}
            </Text>
            <Text className={whiteTextStyle}>
              {checkIfTaskIsCompleted(selectedTask)
                ? "Selesai"
                : "Belum selesai"}
            </Text>
            <Text className={whiteTextStyle}>
              {selectedTask.updatedAt
                ? convertDate(selectedTask.updatedAt)
                : convertDate(selectedTask.createdAt)}
            </Text>
          </View>
        </View>

        {/* Task desc */}
        <View className="flex-col pb-[4px]">
          <Text className={grayTextStyle}>Deskripsi:</Text>
          <Text className={whiteTextStyle}>{selectedTask.description}</Text>
        </View>
      </GlassCard>

      <View className="h-[12px]" />

      <GlassCard>
        <View className="flex-row items-center gap-x-[8px] pb-[4px]">
          {/* Foto profil user-user terlibat */}
          <View className="flex-row items-center w-[36px]">
            {selectedTask.involved.slice(0, 3).map((user, index) => (
              <View
                key={index}
                className="rounded-full bg-gray-300 w-[24px] h-[24px]">
                <Image
                  source={{ uri: user.imageUrl ?? "" }}
                  className="w-full h-full rounded-full"
                />
              </View>
            ))}
          </View>

          {/* Berapa orang yang terlibat di task ini */}
          <Text className={whiteTextStyle}>
            {selectedTask.involved.length} orang
          </Text>
          <Text className={grayTextStyle}>terlibat task ini</Text>

          {/* Space kosong */}
          <View className="flex-1" />

          {/* Tombol */}
          {!checkIfTaskIsCompleted(selectedTask) && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (currentUserIsInvolved) {
                  handleAbandonTask()
                } else {
                  handleJoinTask()
                }
              }}>
              <Text className={`${whiteTextStyle} mr-[4px]`}>
                {currentUserIsInvolved ? "Keluar" : "Gabung"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </GlassCard>

      <View className="flex-1" />

      {!checkIfTaskIsCompleted(selectedTask) && currentUserIsInvolved && (
        <View className="flex flex-row items-center justify-between w-full">
          <SecondaryButton
            label="Edit"
            icon={EditTaskIcon}
            onClick={handleEditTask}
            style={{ flex: 2 }}
          />
          <View className="w-[8px]" />
          <PrimaryButton
            label="Tandai Selesai"
            icon={FinishTaskIcon}
            onClick={handleFinishTask}
            style={{ flex: 5 }}
          />
        </View>
      )}
    </MainLayout>
  )
}

const grayTextStyle = "text-dark-gray text-body"
const whiteTextStyle = "text-white text-body"
