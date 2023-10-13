import MainLayout from "../../components/layouts/MainLayout"
import { useAppSelector } from "../../redux"
import Header from "../../components/containers/Header"
import { Alert, Text, View } from "react-native"
import Entry from "../../components/inputs/Entry"
import { useState } from "react"
import TimePicker from "../../components/inputs/TimePicker"
import LongButton from "../../components/buttons/LongButton"
import AddTaskicon from "../../components/icons/AddTaskicon"
import useCreateTask from "../../hooks/useCreateTask"
import { router } from "expo-router"
import Switch from "../../components/inputs/Switch"
import { useQueryClient } from "react-query"


export default function FormScreen() {
  // const mode = useAppSelector((state) => state.form.mode)
  // const selectedTask = useAppSelector((state) => state.form.selectedTask)

  const [judulInput, setJudulInput] = useState<string>("")
  const [hasDeadline, setHasDeadline] = useState<boolean>(false)
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [descInput, setDescInput] = useState<string>("")

  /**
   * Hook untuk membuat task baru.
   */
  const createTask = useCreateTask()

  /**
   * Hook untuk mengakses query client.
   */
  const queryClient = useQueryClient()

  /**
   * Hook untuk mengambil data user yang sedang login.
   */
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  /**
   * Fungsi untuk menghandle submit form.
   */
  const handleSubmit = () => {

    // Validasi input
    if (!judulInput) {
      alert("Judul task tidak boleh kosong!")
      return
    }

    // Lakukan request ke API untuk membuat task baru
    createTask.mutateAsync({
      taskData: {
        title: judulInput,
        madeBy: currentUser,
        description: descInput,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        deadline: hasDeadline ? deadline.toISOString() : "",
        completedAt: "",
        updatedAt: "",
        involved: [
          {
            ...currentUser,
            isCompleted: false,
            completedAt: ""
          }
        ]
    }})

    // Jika berhasil, kembali ke halaman sebelumnya
    .then(() => {
      Alert.alert("Berhasil", "Task berhasil dibuat!")
      queryClient.invalidateQueries(["tasks"])
      setTimeout(() => {
        router.back()
      }, 100)
    })

    // Jika gagal, tampilkan pesan error
    .catch((error) => {
      Alert.alert("Gagal", error.message)
    })
  }

  return (
    <MainLayout>
      <Header
        position="left"
        title="Buat Task Baru"/>

      {/* Forms */}
      <View className="flex-col gap-y-[8px] h-fit">
        <Entry
          label="Judul Task"
          placeholder="Masukkan judul task"
          value={judulInput}
          setValue={setJudulInput}/>
        <View/>

        <Switch
          value={hasDeadline}
          setValue={setHasDeadline}
          label="Deadline"/>
        <View/>

        {hasDeadline
          ? <TimePicker
              value={deadline}
              setValue={setDeadline}/>
          : <View className="w-full h-[1px] rounded-full bg-bright-gray"/>
        }
        <View/>

        <Entry
          multiline
          label="Deskripsi"
          placeholder="Tuliskan deskripsi task"
          value={descInput}
          setValue={setDescInput}/>
        <View/>
      </View>

      <View className="flex-1"/>

      {/* Tombol Submit */}
      <LongButton
        icon={AddTaskicon}
        onClick={handleSubmit}
        label="Tambah Task"/>
    </MainLayout>
  )
}