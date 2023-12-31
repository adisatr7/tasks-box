import { ImageBackground, SafeAreaView, StatusBar, View } from "react-native"
import { StatusBar as ExpoStatusBar } from "expo-status-bar"
import { styles } from "../../styles"
import image from "../../assets/backgrounds/login.jpg"
import LoadingOverlay from "./LoadingOverlay"


type OnboardingLayoutProps = {
  children: React.ReactNode
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <ImageBackground
      source={image}
      blurRadius={4}
      className="h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.loginOverlay}`} />
      <ExpoStatusBar style="light"/>
      <SafeAreaView
        style={{ top: StatusBar.currentHeight }}
        className="z-10 flex flex-col flex-1 m-[18px] justify-center">
        {children}
      </SafeAreaView>
      <LoadingOverlay/>
    </ImageBackground>
  )
}