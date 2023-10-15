import { useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import PlusIcon from "../../components/icons/PlusIcon"
import MainLayout from "../../components/layouts/MainLayout"
import { styles } from "../../styles"
import { Task } from "../../types"
import { router } from "expo-router"
import { useAppSelector } from "../../redux"
import useTaskQuery from "../../hooks/useTasksQuery"
import { useDispatch } from "react-redux"
import TaskCard from "../../components/containers/TaskCard"
import checkIfTaskIsCompleted from "../../utils/checkIfTaskIsCompleted"


export default function HomeScreen() {

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const [itemsToShow, setItemsToShow] = useState<Task[]>([])

  /**
   * Hook untuk mengambil data task.
   */
  const taskQuery = useTaskQuery()

  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useDispatch()

  /**
   * Hook untuk mengambil data user yang sedang login.
   */
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  /**
   * Daftar tab yang ada.
   */
  const tabs = [
    "Semua",
    "Prioritas",
    "Selesai"
  ]


  useEffect(() => {
    taskQuery.refetch()

    // Jika data task sudah di-fetch
    if (taskQuery.isSuccess) {
      // Filter task yang sesuai dengan tab yang dipilih
      switch (selectedTabIndex) {
        case 0:
          setItemsToShow(taskQuery.data.filter(task => !checkIfTaskIsCompleted(task)))
          break
        case 1:
          setItemsToShow(taskQuery.data.filter((task) => !checkIfTaskIsCompleted(task) && task.deadline))
          break
        case 2:
          setItemsToShow(taskQuery.data.filter(task => checkIfTaskIsCompleted(task)))
          break
      }
    }
  }, [taskQuery.status, taskQuery.data, selectedTabIndex])


  return (
    <MainLayout>
      {/* User Profile Header */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          router.push(`/main/profile`)
        }}
        className="flex-row items-center w-fit">
        {/* Profile Picture */}
        <View className="rounded-full bg-gray-300 w-[48px] h-[48px] mr-[12px]">
          <Image
            source={{ uri: currentUser.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 1000,
              minHeight: 48,
              minWidth: 48
            }}
          />
        </View>

        {/* Greetings */}
        <View className="sticky flex-col w-fit">
          <Text className="text-bright-gray text-body w-fit">
            Selamat datang,
          </Text>
          <Text className="text-white text-heading-2 w-fit">
            {`${currentUser.firstName} ${currentUser.lastName}`}
          </Text>
        </View>

        <View className="flex-1" />

        {/* Tombol logout */}
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            dispatch(removeCurrentUser())
            router.replace("/onboarding/login")
          }}>
          <LogoutIcon fill="#FF352B" />
        </TouchableOpacity> */}
      </TouchableOpacity>

      {/* Page Title Label */}
      <Text className="text-white text-heading-1">Daftar Task Anda</Text>

      {/* Tabs */}
      <View className="flex flex-row w-full">
        {tabs.map((tabLabel, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => setSelectedTabIndex(index)}
            className={`flex-col items-center justify-center w-fit h-fit`}>
            <Text className={`text-white mr-[18px]
              ${selectedTabIndex === index
                  ? "font-bold text-body"
                  : "text-caption"
              }`}>
              {tabLabel}
            </Text>
            {selectedTabIndex === index && (
              <View className="w-[12px] h-[3px] rounded-full bg-bright-gray mr-[18px]"/>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View className="w-full h-[1px] rounded-full bg-bright-gray -top-[12px]"/>

      {/* Tasks List */}
      <ScrollView>
        {itemsToShow.length > 0 &&
          itemsToShow.map((task, index) => (
            <View key={index} className="pb-[8px]">
              <TaskCard task={task}/>
            </View>
          ))}
        {/* If task is empty */}
        {itemsToShow.length === 0 && (
          <View
            className={`flex items-center justify-center h-fit py-[18px] rounded-lg ${styles.glass} ${styles.glassOutline}`}>
            <Text className="text-center text-white text-body">
              Tidak ada task.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating action button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          router.push(`/main/form`)
        }}
        className="rounded-full bg-primary w-[52px] h-[52px] justify-center items-center absolute bottom-1 right-0 shadow-md">
        <PlusIcon fill="white" />
      </TouchableOpacity>
    </MainLayout>
  )
}