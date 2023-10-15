import { ImageBackground, SafeAreaView, View } from "react-native";
import { styles } from "../../styles"
import image from "../../assets/backgrounds/main.jpg"
import { StatusBar as Status } from "react-native"


type MainLayoutProps = {
  blurAmount?: number
  children?: React.ReactNode
}

export default function MainLayout({ blurAmount=5, children }: MainLayoutProps) {
  return (
    <ImageBackground
      source={image}
      blurRadius={blurAmount}
      resizeMode="cover"
      className="top-0 h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.mainOverlay}`}/>
      <SafeAreaView
        style={{ top: Status.currentHeight }}
        className={`z-10 flex-col h-[98%] mx-[18px] pb-[18px] pt-[20px] gap-y-[16px]`}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}