import { Stack } from "expo-router"
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
        <Stack screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }}/>
      </QueryClientProvider>
    </Provider>
  )
}