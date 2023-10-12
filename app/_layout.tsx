import { Slot } from "expo-router"
import { View } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query";


export default function Layout() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <View className="justify-center">
        <Slot/>
      </View>
    </QueryClientProvider>
  )
}