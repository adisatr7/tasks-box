import { Slot } from "expo-router"
import { View } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../redux"


export default function Layout() {
  /**
   * Query client untuk React Query.
   */
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View className="justify-center">
          <Slot/>
        </View>
      </QueryClientProvider>
    </Provider>
  )
}