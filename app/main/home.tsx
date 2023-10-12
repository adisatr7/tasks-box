import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SpringScrollView } from "react-native-spring-scrollview"
import image from "../../assets/backgrounds/main.jpg"
import CompletionIcon from "../../components/icons/CompletionIcon"
import { styles } from "../../styles"
import { Task } from "../../types"
import PlusIcon from "../../components/icons/PlusIcon"


export default function TasksList() {

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const [itemsToShow, setItemsToShow] = useState<Task[]>([
    {
      id: 1,
      title: "Membuat aplikasi mobile",
      description: "Membuat aplikasi mobile dengan menggunakan React Native",
      createdAt: new Date().toISOString(),
      madeBy: {
        id: 1,
        email: "x@y.z",
        firstName: "Helena",
        lastName: "Frost",
        exp: 0,
        level: 1,
        imageUrl: ""
      },
      isCompleted: false,
      involved: []
    }
  ])
  const tabs = [
    "Semua",
    "Prioritas",
    "Selesai"
  ]


  /**
   * Menghitung jumlah user yang sudah menyelesaikan task
   *
   * @param task Array yang ingin dihitung
   * @returns Jumlah task yang sudah diselesaikan oleh user
   */
  const countCompletedUsers = (task: Task): number => {
    let count = 0
    task.involved.forEach(user => {
      if (user.isCompleted)
        count++
    })
    return count
  }


  return (
    <ImageBackground source={image} blurRadius={5} className="h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.mainOverlay}`}/>
      <SafeAreaView className="z-10 flex flex-col h-screen m-[18px] gap-y-[16px]">

        {/* User Profile Header */}
        <TouchableOpacity
          activeOpacity={0.5}
          className="flex-row items-center w-fit">
          {/* Profile Picture */}
          <View className="rounded-full bg-gray-300 w-[48px] h-[48px] mr-[12px]">
            {/* <Image/> */}
          </View>

          {/* Greetings */}
          <View className="sticky flex-col w-fit">
            <Text className="text-bright-gray text-caption w-fit">
              Selamat datang,
            </Text>
            <Text className="text-white text-body w-fit">{"Helena Frost"}</Text>
          </View>
        </TouchableOpacity>

        {/* Page Title Label */}
        <Text className="text-white text-heading-1">
          Daftar Task Anda
        </Text>

        {/* Tabs */}
        <View className="flex flex-row w-full">
          {tabs.map((tabLabel, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => setSelectedTabIndex(index)}
              className={`flex-col items-center justify-center w-fit h-fit`}>
              <Text
                className={`text-white mr-[18px]
                ${selectedTabIndex === index
                    ? "font-bold text-body"
                    : "text-caption"}`}>
                {tabLabel}
              </Text>
              {selectedTabIndex === index &&
                <View className="w-[12px] h-[3px] rounded-full bg-bright-gray mr-[18px]"/>
              }
            </TouchableOpacity>
          ))}
        </View>
        <View className="w-full h-[1px] rounded-full bg-bright-gray -top-[12px]" />

        {/* Tasks List */}
        <ScrollView>
          {itemsToShow.length > 0 && itemsToShow.map((task, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => {
                // TODO: Implement!
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
                    <View key={index} className="rounded-full bg-gray-300 w-[24px] h-[24px]">
                      <Image source={{ uri: user.imageUrl }}/>
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
                        : "-"
                      }
                    </Text>
                  </View>

                  {/* Completion */}
                  <View className="flex-row items-center justify-end">
                    <CompletionIcon/>
                    <Text className="text-white text-body ml-[6px]">
                      {countCompletedUsers(task)}/{task.involved.length}
                    </Text>
                  </View>

                </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* If task is empty */}
        {itemsToShow.length === 0 && (
          <View className={`flex items-center justify-center h-fit py-[18px] rounded-md ${styles.glass} ${styles.glassOutline}`}>
            <Text className="text-center text-white text-body">Tidak ada task.</Text>
          </View>
        )}

        {/* Floating action button */}
        <TouchableOpacity
          onPress={() => {
            // TODO: Implement
          }}
          className="rounded-full bg-primary w-[52px] h-[52px] justify-center items-center absolute bottom-1 right-0 shadow-md">
          <PlusIcon fill="white"/>
        </TouchableOpacity>

      </SafeAreaView>
      <StatusBar style="light" />
    </ImageBackground>
  )
}