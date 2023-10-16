import MainLayout from "../../components/layouts/MainLayout"
import { useAppDispatch, useAppSelector } from "../../redux"
import Header from "../../components/containers/Header"
import { Alert, Text, View } from "react-native"
import Entry from "../../components/inputs/Entry"
import { useEffect, useState } from "react"
import TimePicker from "../../components/inputs/TimePicker"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import AddTaskicon from "../../components/icons/AddTaskicon"
import useCreateTask from "../../hooks/useCreateTask"
import { router } from "expo-router"
import Switch from "../../components/inputs/Switch"
import { useQueryClient } from "react-query"
import { endLoading, startLoading } from "../../redux/slices/layoutSlice"
import LoadingOverlay from "../../components/layouts/LoadingOverlay"
import useUpdateTask from "../../hooks/useUpdateTask"

export default function FormScreen() {
  const [judulInput, setJudulInput] = useState<string>("")
  const [hasDeadline, setHasDeadline] = useState<boolean>(false)
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [descInput, setDescInput] = useState<string>("")

  /**
   * Hook untuk membuat task baru.
   */
  const createTaskMutation = useCreateTask()

  /**
   * Hook untuk mengupdate task.
   */
  const updateTaskMutation = useUpdateTask()

  /**
   * Hook untuk mengakses query client.
   */
  const queryClient = useQueryClient()

  /**
   * Hook untuk mengambil data user yang sedang login.
   */
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  /**
   * Hook untuk mengambil data mode form.
   */
  const mode = useAppSelector((state) => state.form.mode)

  /**
   * Hook untuk mengambil data task yang sedang dipilih.
   */
  const selectedTask = useAppSelector((state) => state.form.selectedTask)

  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

  // Jika mode form adalah edit, isi form dengan data task yang sedang dipilih
  useEffect(() => {
    dispatch(startLoading())
    setJudulInput(selectedTask?.title || "")
    setHasDeadline(!!selectedTask?.deadline)
    setDeadline(new Date(selectedTask?.deadline || ""))
    setDescInput(selectedTask?.description || "")
    setTimeout(() => {
      dispatch(endLoading())
    }, 10)
  }, [selectedTask])


  const getInputData = () => {
    return {
      title: judulInput,
      madeBy: currentUser,
      description: descInput,
      createdAt: new Date().toISOString(),
      deadline: hasDeadline ? deadline.toISOString() : "",
      updatedAt: "",
      involved: [
        {
          ...currentUser,
          isCompleted: false,
          completedAt: ""
        }
      ]
    }
  }


  /**
   * Fungsi untuk menghandle submit form.
   */
  const handleSubmit = () => {
    // Validasi input
    if (!judulInput) {
      alert("Judul task tidak boleh kosong!")
      return
    }

    dispatch(startLoading())

    // Lakukan request ke API untuk membuat task baru
    if (mode === "add")
      createTaskMutation.mutateAsync(getInputData())

    else
      updateTaskMutation.mutateAsync(getInputData())

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

      .finally(() => {
        dispatch(endLoading())
      })
  }


  return (
    <MainLayout>
      <Header position="left" title="Buat Task Baru" />

      {/* Forms */}
      <View className="flex-col gap-y-[8px] h-fit">
        <Entry
          label="Judul Task"
          placeholder="Masukkan judul task"
          value={judulInput}
          setValue={setJudulInput}
        />
        <View />

        <Switch
          value={hasDeadline}
          setValue={setHasDeadline}
          label="Deadline"
        />
        <View />

        {hasDeadline ? (
          <TimePicker value={deadline} setValue={setDeadline} />
        ) : (
          <View className="w-full h-[1px] rounded-full bg-bright-gray" />
        )}
        <View />

        <Entry
          multiline
          label="Deskripsi"
          placeholder="Tuliskan deskripsi task"
          value={descInput}
          setValue={setDescInput}
        />
        <View />
      </View>

      <View className="flex-1" />

      {/* Tombol Submit */}
      <PrimaryButton
        icon={AddTaskicon}
        onClick={handleSubmit}
        label="Tambah Task"
      />
    </MainLayout>
  )
}