import MainLayout from "../../components/layouts/MainLayout"
import { useAppSelector } from "../../redux"
import Header from "../../components/containers/Header"
import { Text, View } from "react-native"
import Entry from "../../components/inputs/Entry"
import { useState } from "react"
import TimePicker from "../../components/inputs/TimePicker"


export default function FormScreen() {
  const mode = useAppSelector((state) => state.form.mode)
  const selectedTask = useAppSelector((state) => state.form.selectedTask)

  const [judulInput, setJudulInput] = useState<string>("")
  const [hasDeadline, setHasDeadline] = useState<boolean>(true)
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [descInput, setDescInput] = useState<string>("")

  return (
    <MainLayout>
      <Header
        position="left"
        title="Buat Task Baru"/>

      {/* <Text className="text-caption">Judul Task</Text> */}
      <View className="flex-col gap-y-[8px] h-fit">
        <Entry
          label="Judul Task"
          placeholder="Masukkan judul task"
          value={judulInput}
          setValue={setJudulInput}/>
        <View/>
        <TimePicker
          label="Deadline"
          value={deadline}
          setValue={setDeadline} />
        <View/>
        <Entry
          multiline
          label="Deskripsi"
          placeholder="Tuliskan deskripsi task"
          value={descInput}
          setValue={setDescInput}/>
        <View/>
      </View>
    </MainLayout>
  )
}