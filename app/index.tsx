import { Text, View } from "react-native";
import { Link, router } from "expo-router"
import { useEffect } from "react"


export default function App() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/onboarding/login")
    }, 100)
  }, [])

  return (
    <View className="items-center justify-center w-screen h-screen bg-black">
      {/* <Link href="/login">
        <Text className="text-heading-1">Loading...</Text>
      </Link> */}
    </View>
  )
}
