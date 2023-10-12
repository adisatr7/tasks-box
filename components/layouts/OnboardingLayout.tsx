import { ImageBackground, SafeAreaView, View } from "react-native"
import { styles } from "../../styles"
import image from "../../assets/backgrounds/login.jpg"


type OnboardingLayoutProps = {
  children: React.ReactNode
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <ImageBackground source={image} blurRadius={4} className="h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.loginOverlay}`}/>
      <SafeAreaView className="z-10 flex flex-col h-screen m-[18px] items-center justify-center">
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}