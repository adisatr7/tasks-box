import { ImageBackground, SafeAreaView, View } from "react-native"
import { styles } from "../../styles"
import image from "../../assets/backgrounds/main.jpg"
import { StatusBar } from "expo-status-bar"


type MainLayoutProps = {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ImageBackground source={image} blurRadius={5} className="h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.mainOverlay}`}/>
      <SafeAreaView className="z-10 flex flex-col h-screen m-[18px] gap-y-[16px]">
        {children}
      </SafeAreaView>

      <StatusBar style="light" />
    </ImageBackground>
  )
}